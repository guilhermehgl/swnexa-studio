export const projectTypes = [
  "Site",
  "Landing page",
  "Sistema web",
  "Portal / área do cliente",
  "Outro",
] as const;
export const contactLimits = {
  name: 120,
  company: 160,
  email: 254,
  phone: 16,
  projectType: 40,
  message: 5000,
};
export type ContactField = keyof typeof contactLimits;
export type ContactValues = Record<ContactField, string>;
export type ContactErrors = Partial<Record<ContactField, string>>;
export const emptyContact: ContactValues = {
  name: "",
  company: "",
  email: "",
  phone: "",
  projectType: "",
  message: "",
};

export function validateContact(input: unknown): {
  values: ContactValues;
  errors: ContactErrors;
} {
  const values = { ...emptyContact };
  const errors: ContactErrors = {};
  const record =
    input && typeof input === "object"
      ? (input as Record<string, unknown>)
      : {};
  for (const field of Object.keys(contactLimits) as ContactField[]) {
    const raw = record[field];
    if (raw !== undefined && typeof raw !== "string")
      errors[field] = "Valor inválido.";
    values[field] = typeof raw === "string" ? raw.trim() : "";
    if (typeof raw === "string" && raw.length > contactLimits[field])
      errors[field] = `Use até ${contactLimits[field]} caracteres.`;
  }
  if (!values.name) errors.name = "Informe seu nome.";
  if (
    !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(values.email) ||
    /[\r\n]/.test(values.email)
  )
    errors.email = "Informe um e-mail válido.";
  if (!projectTypes.some((type) => type === values.projectType))
    errors.projectType = "Escolha o tipo de projeto.";
  if (!values.message) errors.message = "Conte um pouco sobre o projeto.";
  if (
    values.phone &&
    (!/^[\d\s()-]+$/.test(values.phone) ||
      !/^\d{10,11}$/.test(values.phone.replace(/\D/g, "")))
  )
    errors.phone = "Informe o número com DDD.";
  return { values, errors };
}

export function formatPhone(value: string) {
  let digits = value.replace(/\D/g, "");
  if (digits.length > 11 && digits.startsWith("55")) digits = digits.slice(2);
  digits = digits.slice(0, 11);
  if (digits.length <= 2) return digits ? `(${digits}` : "";
  const local = digits.slice(2);
  const split = local.length > 8 ? 5 : 4;
  return `(${digits.slice(0, 2)}) ${local.slice(0, split)}${local.length > split ? `-${local.slice(split)}` : ""}`;
}

export function whatsappLink() {
  const number = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").replace(
    /\D/g,
    "",
  );
  return /^55\d{10,11}$/.test(number)
    ? `https://wa.me/${number}?text=${encodeURIComponent("Olá! Quero conversar sobre um projeto com a SWNexa Studio.")}`
    : null;
}
