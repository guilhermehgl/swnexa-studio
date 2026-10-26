import type { MetadataRoute } from "next";
import { conceptProjects } from "@/data/projects";
import { siteUrl } from "@/lib/seo";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl + "/" },
    ...conceptProjects
      .filter((project) => project.status === "available")
      .map((project) => ({ url: siteUrl + project.route })),
  ];
}
