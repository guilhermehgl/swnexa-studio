import type { Metadata } from "next";
import { pageMetadata, siteUrl } from "@/lib/seo";
import { Instrument_Sans } from "next/font/google";
import "@/styles/globals.css";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
  variable: "--font-instrument-sans",
});
const title = "SWNexa Studio | Sites e Sistemas Sob Medida";
const description =
  "Criamos sites, experiências digitais e sistemas web personalizados para empresas que buscam tecnologia, design e qualidade.";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  ...pageMetadata(title, description, "/"),
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      {/* Extensões podem injetar atributos no body antes da hidratação (cz-shortcut-listen). */}
      <body className={instrumentSans.variable} suppressHydrationWarning>
        <a className="skip-link" href="#conteudo">
          Pular para o conteúdo
        </a>
        {children}
      </body>
    </html>
  );
}
