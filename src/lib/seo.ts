import type { Metadata } from "next";

export const siteUrl = "https://studio.swnexa.com";
export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  const url = new URL(path, siteUrl).href;
  const images = [
    {
      url: "/opengraph-image",
      width: 1200,
      height: 630,
      alt: "SWNexa Studio — design e tecnologia sob medida",
    },
  ];
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      images,
      type: "website",
      locale: "pt_BR",
      siteName: "SWNexa Studio",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
  };
}
