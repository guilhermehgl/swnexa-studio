import { createHash } from "node:crypto";
import { Resend } from "resend";
import { validateContact } from "@/lib/contact";

export const runtime = "nodejs";
const failure =
  "Não foi possível enviar agora. Tente novamente ou fale pelo WhatsApp.";

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin) {
    try {
      // Next.js may normalize request.url to localhost while Host retains
      // the address the visitor actually opened (including LAN addresses).
      const originUrl = new URL(origin);
      const publicHost =
        request.headers.get("host") ?? new URL(request.url).host;
      if (
        !["http:", "https:"].includes(originUrl.protocol) ||
        originUrl.host !== publicHost
      )
        return Response.json({ message: failure }, { status: 403 });
    } catch {
      return Response.json({ message: failure }, { status: 403 });
    }
  }
  if (!request.headers.get("content-type")?.includes("application/json"))
    return Response.json({ message: "Formato inválido." }, { status: 415 });
  let input: unknown;
  try {
    // Limit the actual stream, including requests without Content-Length.
    const reader = request.body?.getReader();
    if (!reader) throw new Error("Empty body");
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 24576) {
        await reader.cancel();
        return Response.json(
          { message: "A solicitação excede o tamanho permitido." },
          { status: 413 },
        );
      }
      chunks.push(value);
    }
    input = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return Response.json(
      { message: "Revise os dados da solicitação." },
      { status: 400 },
    );
  }
  const { values, errors } = validateContact(input);
  if (Object.keys(errors).length)
    return Response.json(
      { message: "Revise os campos indicados.", errors },
      { status: 422 },
    );
  const key = request.headers.get("idempotency-key");
  if (!key || !/^[a-zA-Z0-9-]{16,80}$/.test(key))
    return Response.json(
      { message: "Atualize a página e tente novamente." },
      { status: 400 },
    );
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from)
    return Response.json({ message: failure }, { status: 503 });
  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send(
      {
        from,
        to,
        replyTo: values.email,
        subject: `Nova solicitação — ${values.projectType}`,
        text: `Nova ideia para a SWNexa Studio\n\nNome: ${values.name}\nEmpresa: ${values.company || "Não informada"}\nE-mail: ${values.email}\nWhatsApp: ${values.phone || "Não informado"}\nTipo de projeto: ${values.projectType}\n\nSobre o projeto:\n${values.message}`,
      },
      {
        idempotencyKey: `contact/${key}/${createHash("sha256").update(JSON.stringify(values)).digest("hex")}`,
      },
    );
    if (error || !data?.id)
      return Response.json({ message: failure }, { status: 502 });
    return Response.json({ success: true });
  } catch {
    return Response.json({ message: failure }, { status: 502 });
  }
}
