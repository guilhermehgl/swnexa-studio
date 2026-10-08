"use client";
import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import {
  contactLimits,
  emptyContact,
  formatPhone,
  projectTypes,
  validateContact,
  whatsappLink,
  type ContactErrors,
  type ContactField,
} from "@/lib/contact";

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      style={{ flexShrink: 0 }}
    >
      <path d="M20.52 3.48A11.9 11.9 0 0 0 12.05 0C5.47 0 .12 5.35.12 11.93c0 2.1.55 4.15 1.6 5.96L.02 24l6.25-1.64a11.9 11.9 0 0 0 5.78 1.47h.01C18.63 23.83 24 18.48 24 11.91a11.85 11.85 0 0 0-3.48-8.43ZM12.05 21.82a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.71.97.99-3.62-.24-.38a9.88 9.88 0 0 1-1.52-5.27c0-5.47 4.45-9.92 9.93-9.92a9.85 9.85 0 0 1 7.02 2.91 9.86 9.86 0 0 1 2.91 7.02c0 5.47-4.45 9.92-9.97 9.88Zm5.44-7.42c-.3-.15-1.76-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.88-.78-1.48-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.53.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.03 1.01-1.03 2.48 0 1.46 1.06 2.87 1.21 3.07.15.2 2.09 3.19 5.06 4.47.7.3 1.25.48 1.68.62.7.22 1.34.19 1.84.11.56-.08 1.76-.72 2.01-1.41.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.34Z" />
    </svg>
  );
}

export function Contact() {
  const [values, setValues] = useState({ ...emptyContact });
  const [touched, setTouched] = useState<
    Partial<Record<ContactField, boolean>>
  >({});
  const [serverErrors, setServerErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [notice, setNotice] = useState("");
  const busy = useRef(false);
  const submissionKey = useRef<string | null>(null);
  const confirmation = useRef<HTMLDivElement>(null);
  const errors = { ...validateContact(values).errors, ...serverErrors };
  const valid = Object.keys(errors).length === 0;
  const whatsapp = whatsappLink();

  function update(field: ContactField, value: string) {
    setValues((previous) => ({ ...previous, [field]: value }));
    setServerErrors((previous) => {
      const next = { ...previous };
      delete next[field];
      return next;
    });
    if (status === "error") {
      setStatus("idle");
      setNotice("");
    }
  }
  function phoneChange(event: ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    const raw = input.value;
    // Preserve native deletion; normalize again on blur. Keep the caret near
    // the same digit when inserting in the middle of a formatted number.
    const deleting = (event.nativeEvent as InputEvent).inputType?.startsWith(
      "delete",
    );
    if (deleting) {
      update("phone", raw);
      return;
    }
    const digitCount = raw
      .slice(0, input.selectionStart ?? raw.length)
      .replace(/\D/g, "").length;
    const formatted = formatPhone(raw);
    update("phone", formatted);
    requestAnimationFrame(() => {
      let count = 0;
      let caret = 0;
      while (caret < formatted.length && count < digitCount) {
        if (/\d/.test(formatted[caret])) count++;
        caret++;
      }
      input.setSelectionRange(caret, caret);
    });
  }
  const fieldError = (field: ContactField) => touched[field] && errors[field];
  const accessibility = (field: ContactField) => ({
    "aria-invalid": Boolean(fieldError(field)),
    "aria-describedby": fieldError(field)
      ? `contact-${field}-error`
      : undefined,
    onBlur: () => {
      setTouched((previous) => ({ ...previous, [field]: true }));
      if (field === "phone") update("phone", formatPhone(values.phone));
    },
  });
  const errorText = (field: ContactField) =>
    fieldError(field) ? (
      <span className="contact-field-error" id={`contact-${field}-error`}>
        {fieldError(field)}
      </span>
    ) : null;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current) return;
    setTouched(
      Object.fromEntries(
        Object.keys(contactLimits).map((field) => [field, true]),
      ),
    );
    if (!valid) return;
    busy.current = true;
    setStatus("sending");
    setNotice("");
    submissionKey.current ??=
      globalThis.crypto?.randomUUID?.() ??
      `contact-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": submissionKey.current,
        },
        body: JSON.stringify(values),
        signal: AbortSignal.timeout(20000),
      });
      const result = await response.json();
      if (!response.ok || result.success !== true) {
        if (result.errors) {
          setServerErrors(result.errors);
          const field = Object.keys(result.errors)[0];
          if (field in contactLimits)
            document.getElementById(`contact-${field}`)?.focus();
        }
        throw new Error(
          result.message || "Não foi possível enviar agora. Tente novamente.",
        );
      }
      setStatus("success");
      requestAnimationFrame(() => confirmation.current?.focus());
    } catch (error) {
      setStatus("error");
      setNotice(
        error instanceof Error &&
          error.name !== "TimeoutError" &&
          error.name !== "TypeError"
          ? error.message
          : "Não foi possível confirmar o envio. Tente novamente ou fale pelo WhatsApp.",
      );
    } finally {
      busy.current = false;
    }
  }

  return (
    <section id="contato" className="shell section contact">
      <div>
        <span className="eyebrow">
          <span className="status-dot" /> VAMOS CRIAR ALGO JUNTOS
        </span>
        <h2>
          O que você
          <br />
          tem em mente<span className="accent">?</span>
        </h2>
        <p>
          Conte um pouco sobre sua ideia.
          <br />
          Uma boa conversa pode ser o começo
          <br />
          de um grande projeto.
        </p>
        {whatsapp && (
          <div className="contact-whatsapp">
            <span>Prefere uma conversa direta?</span>
            <a href={whatsapp} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon /> Falar pelo WhatsApp{" "}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        )}
      </div>
      {status === "success" ? (
        <div
          className="contact-confirmation"
          ref={confirmation}
          tabIndex={-1}
          aria-labelledby="contact-confirmation-title"
        >
          <span className="eyebrow">
            <span className="status-dot" /> IDEIA RECEBIDA
          </span>
          <h3 id="contact-confirmation-title">
            Recebemos sua ideia<span className="accent">.</span>
          </h3>
          <p>
            Vamos analisar as informações e entrar em contato pelos dados
            informados.
          </p>
          {whatsapp && (
            <>
              <p>Quer adiantar a conversa?</p>
              <a
                className="button button-dark"
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon /> Continuar pelo WhatsApp{" "}
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </>
          )}
          <button
            className="contact-reset"
            type="button"
            onClick={() => {
              setValues({ ...emptyContact });
              setTouched({});
              setServerErrors({});
              setStatus("idle");
              setNotice("");
              submissionKey.current = null;
              requestAnimationFrame(() =>
                document.getElementById("contact-name")?.focus(),
              );
            }}
          >
            Enviar outra solicitação
          </button>
        </div>
      ) : (
        <form noValidate onSubmit={submit} aria-busy={status === "sending"}>
          <fieldset className="contact-fields" disabled={status === "sending"}>
            <legend className="sr-only">Sua solicitação de projeto</legend>
            <div className="form-grid">
              <label htmlFor="contact-name">
                Nome *
                <input
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  placeholder="Como podemos chamar você?"
                  required
                  maxLength={contactLimits.name}
                  value={values.name}
                  onChange={(event) => update("name", event.target.value)}
                  {...accessibility("name")}
                />
                {errorText("name")}
              </label>
              <label htmlFor="contact-company">
                Empresa
                <input
                  id="contact-company"
                  name="company"
                  autoComplete="organization"
                  placeholder="Nome da sua empresa"
                  maxLength={contactLimits.company}
                  value={values.company}
                  onChange={(event) => update("company", event.target.value)}
                  {...accessibility("company")}
                />
                {errorText("company")}
              </label>
              <label htmlFor="contact-email">
                E-mail *
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="voce@empresa.com"
                  required
                  maxLength={contactLimits.email}
                  value={values.email}
                  onChange={(event) => update("email", event.target.value)}
                  {...accessibility("email")}
                />
                {errorText("email")}
              </label>
              <label htmlFor="contact-phone">
                WhatsApp
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel-national"
                  placeholder="(00) 00000-0000"
                  maxLength={18}
                  value={values.phone}
                  onChange={phoneChange}
                  {...accessibility("phone")}
                />
                {errorText("phone")}
              </label>
            </div>
            <label htmlFor="contact-projectType">
              Tipo de projeto *
              <select
                id="contact-projectType"
                name="projectType"
                value={values.projectType}
                onChange={(event) => update("projectType", event.target.value)}
                required
                {...accessibility("projectType")}
              >
                <option value="" disabled>
                  O que vamos construir?
                </option>
                {projectTypes.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
              {errorText("projectType")}
            </label>
            <label htmlFor="contact-message">
              Conte sobre o projeto *
              <textarea
                id="contact-message"
                name="message"
                placeholder="Sua ideia, seus objetivos, seu próximo passo..."
                rows={3}
                required
                maxLength={contactLimits.message}
                value={values.message}
                onChange={(event) => update("message", event.target.value)}
                {...accessibility("message")}
              />
              {errorText("message")}
            </label>
            <div className="form-submit">
              <span>* Campos obrigatórios</span>
              <button
                className="button button-dark"
                type="submit"
                disabled={!valid || status === "sending"}
              >
                {status === "sending" ? "Enviando..." : "Enviar solicitação"}
                <ArrowUpRight size={18} aria-hidden="true" />
              </button>
            </div>
          </fieldset>
          <p role="status" aria-live="polite" className="form-status">
            {notice}
          </p>
        </form>
      )}
    </section>
  );
}
