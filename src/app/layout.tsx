import type { Metadata } from "next";
import "@/styles/globals.css";
const title = "SWNexa Studio | Sites e Sistemas Sob Medida";
const description =
  "Criamos sites, experiências digitais e sistemas web personalizados para empresas que buscam tecnologia, design e qualidade.";
export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    locale: "pt_BR",
    type: "website",
    siteName: "SWNexa Studio",
  },
  twitter: { card: "summary", title, description },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <a className="skip-link" href="#conteudo">
          Pular para o conteúdo
        </a>
        {children}
      </body>
    </html>
  );
}
