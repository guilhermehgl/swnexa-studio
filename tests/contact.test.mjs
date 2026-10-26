import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import ts from "typescript";
import vm from "node:vm";
import { createRequire } from "node:module";
const resolveDependency = createRequire(import.meta.url);

function load(file, dependencies = {}, env = {}) {
  const code = ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  const exports = {};
  vm.runInNewContext(code, {
    exports,
    require: (name) => dependencies[name] ?? resolveDependency(name),
    process: { env },
    Buffer,
    Request,
    Response,
    URL,
    console,
  });
  return exports;
}
const validation = load("src/lib/contact.ts");
const lead = {
  name: "Teste local",
  company: "Studio",
  email: "teste@example.com",
  phone: "(31) 98282-5341",
  projectType: "Site",
  message: "Quero um site.",
};
const configured = {
  RESEND_API_KEY: "test-local",
  CONTACT_TO_EMAIL: "studio@example.com",
  CONTACT_FROM_EMAIL: "studio@example.com",
};
function route(
  result = { data: { id: "test-email" }, error: null },
  env = configured,
) {
  const calls = [];
  class Resend {
    emails = {
      send: async (...args) => {
        calls.push(args);
        if (result instanceof Error) throw result;
        return result;
      },
    };
  }
  return {
    ...load(
      "src/app/api/contact/route.ts",
      { "@/lib/contact": validation, resend: { Resend } },
      env,
    ),
    calls,
  };
}
function request(body = lead, headers = {}) {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "idempotency-key": "local-test-request-123456",
      ...headers,
    },
    body: JSON.stringify(body),
  });
}
test("required fields, email, allowed types, lengths and malformed values", () => {
  assert.equal(Object.keys(validation.validateContact(lead).errors).length, 0);
  for (const field of ["name", "email", "projectType", "message"])
    assert.ok(
      validation.validateContact({ ...lead, [field]: " " }).errors[field],
    );
  for (const value of ["a@b", "a\nb@example.com", "invalid"])
    assert.ok(
      validation.validateContact({ ...lead, email: value }).errors.email,
    );
  assert.ok(
    validation.validateContact({ ...lead, projectType: "Inventado" }).errors
      .projectType,
  );
  assert.ok(
    validation.validateContact({ ...lead, message: "x".repeat(5001) }).errors
      .message,
  );
  assert.ok(validation.validateContact({ ...lead, name: 123 }).errors.name);
  assert.ok(validation.validateContact({ ...lead, phone: "123" }).errors.phone);
  assert.equal(
    Object.keys(
      validation.validateContact({ ...lead, phone: "", company: "" }).errors,
    ).length,
    0,
  );
});
test("Brazilian phone normalization, short edits and clearing", () => {
  assert.equal(validation.formatPhone("31982825341"), "(31) 98282-5341");
  assert.equal(validation.formatPhone("+55 31 98282-5341"), "(31) 98282-5341");
  assert.equal(validation.formatPhone("3133334444"), "(31) 3333-4444");
  assert.equal(validation.formatPhone("31"), "(31");
  assert.equal(validation.formatPhone(""), "");
});
test("server rejects invalid input before contacting Resend", async () => {
  const api = route();
  const response = await api.POST(request({ ...lead, email: "invalid" }));
  assert.equal(response.status, 422);
  assert.ok((await response.json()).errors.email);
  assert.equal(api.calls.length, 0);
});
test("invalid JSON, content type, foreign origin and oversized stream", async () => {
  const api = route();
  assert.equal(
    (
      await api.POST(
        new Request("http://localhost/api/contact", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: "{",
        }),
      )
    ).status,
    400,
  );
  assert.equal(
    (await api.POST(request(lead, { "content-type": "text/plain" }))).status,
    415,
  );
  assert.equal(
    (await api.POST(request(lead, { origin: "https://other.example" }))).status,
    403,
  );
  assert.equal(
    (await api.POST(request({ ...lead, message: "x".repeat(30000) }))).status,
    413,
  );
  assert.equal(api.calls.length, 0);
});
test("missing configuration and invalid idempotency key do not send", async () => {
  const api = route(undefined, {});
  assert.equal((await api.POST(request())).status, 503);
  assert.equal(
    (await api.POST(request(lead, { "idempotency-key": "" }))).status,
    400,
  );
  assert.equal(api.calls.length, 0);
});
test("LAN Host works with a normalized internal URL; foreign origins stay blocked", async () => {
  const api = route();
  assert.equal(
    (
      await api.POST(
        request(lead, {
          host: "192.168.41.148:3000",
          origin: "http://192.168.41.148:3000",
        }),
      )
    ).status,
    200,
  );
  assert.equal(
    (
      await api.POST(
        request(lead, {
          host: "192.168.41.148:3000",
          origin: "https://other.example",
        }),
      )
    ).status,
    403,
  );
  assert.equal((await api.POST(request(lead, { origin: "null" }))).status, 403);
  assert.equal(api.calls.length, 1);
});
test("successful send forwards all fields, Reply-To and stable retry key", async () => {
  const api = route();
  assert.equal((await api.POST(request())).status, 200);
  assert.equal((await api.POST(request())).status, 200);
  const [mail, options] = api.calls[0];
  assert.equal(mail.replyTo, lead.email);
  for (const value of Object.values(lead)) assert.ok(mail.text.includes(value));
  assert.equal(options.idempotencyKey, api.calls[1][1].idempotencyKey);
  await api.POST(request({ ...lead, message: "Outra ideia" }));
  assert.notEqual(options.idempotencyKey, api.calls[2][1].idempotencyKey);
});
test("provider rejection, exception and missing acceptance ID return error", async () => {
  for (const result of [
    { error: { message: "private provider details" }, data: null },
    new Error("private secret"),
    { data: {}, error: null },
  ]) {
    const response = await route(result).POST(request());
    assert.equal(response.status, 502);
    assert.equal((await response.text()).includes("private"), false);
  }
});

test("honeypot rejects filled and malformed traps without contacting Resend", async () => {
  const api = route();
  for (const website of ["https://spam.example", " ", 123, null, {}, []]) {
    assert.equal((await api.POST(request({ ...lead, website }))).status, 422);
  }
  assert.equal(api.calls.length, 0);
  assert.equal((await api.POST(request({ ...lead, website: "" }))).status, 200);
  assert.equal(api.calls.length, 1);
});
