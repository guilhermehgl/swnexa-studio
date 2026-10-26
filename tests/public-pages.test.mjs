import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";

function load(path, dependencies = {}) {
  const source = fs.readFileSync(path, "utf8");
  const code = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      jsx: ts.JsxEmit.ReactJSX,
    },
  }).outputText;
  const exports = {};
  vm.runInNewContext(code, {
    exports,
    URL,
    require: (name) => dependencies[name] ?? {},
  });
  return exports;
}
const projects = load("src/data/projects.ts").conceptProjects;
const seo = load("src/lib/seo.ts");

test("all available concepts have a page, conceptual identity and their own canonical", () => {
  assert.deepEqual(
    Array.from(projects, (p) => p.slug),
    ["atelier", "amora", "orbit", "volt"],
  );
  assert.equal(new Set(projects.map((p) => p.route)).size, 4);
  for (const project of projects) {
    assert.equal(project.status, "available");
    assert.ok(project.category && project.name);
    const path = "src/app" + project.route + "/page.tsx";
    const page = load(path, { "@/lib/seo": seo });
    assert.equal(typeof page.default, "function");
    assert.equal(
      page.metadata.alternates.canonical,
      seo.siteUrl + project.route,
    );
    assert.match(page.metadata.description, /conceitual/i);
    assert.ok(page.metadata.title.includes(project.name));
    assert.equal(
      page.metadata.openGraph.url,
      page.metadata.alternates.canonical,
    );
    assert.equal(page.metadata.twitter.title, page.metadata.title);
    assert.ok(page.metadata.openGraph.images.length);
  }
});

test("sitemap contains exactly the public routes and robots references it", () => {
  const dependencies = {
    "@/lib/seo": seo,
    "@/data/projects": { conceptProjects: projects },
  };
  const urls = Array.from(
    load("src/app/sitemap.ts", dependencies).default(),
    (item) => item.url,
  );
  assert.deepEqual(urls, [
    seo.siteUrl + "/",
    ...projects.map((p) => seo.siteUrl + p.route),
  ]);
  assert.equal(new Set(urls).size, 5);
  const robots = load("src/app/robots.ts", dependencies).default();
  assert.equal(robots.sitemap, seo.siteUrl + "/sitemap.xml");
  assert.equal(robots.rules.allow, "/");
  assert.equal(robots.rules.disallow, "/api/");
});

function componentSources(path, seen = new Set()) {
  if (seen.has(path)) return "";
  seen.add(path);
  const source = fs.readFileSync(path, "utf8");
  const imports = Array.from(
    source.matchAll(new RegExp('from "(@/[^"]+)"', "g")),
    (match) => match[1].replace("@/", "src/"),
  );
  return (
    source +
    imports
      .flatMap((base) =>
        [base + ".tsx", base + ".ts"]
          .filter((file) => fs.existsSync(file))
          .map((file) => componentSources(file, seen)),
      )
      .join("\n")
  );
}

test("literal navigation anchors resolve in each concept component tree", () => {
  for (const project of projects) {
    const source = componentSources("src/app" + project.route + "/page.tsx");
    const ids = new Set(
      Array.from(source.matchAll(/id="([^"]+)"/g), (match) => match[1]),
    );
    for (const [, target] of source.matchAll(/href="#([^"]+)"/g))
      assert.ok(ids.has(target), project.slug + ": #" + target);
  }
});
