import { MetadataRoute } from "next";
import formsDb from "@/src/data/forms-db.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://canadianforms.ca";
  const now = new Date();

  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/directory`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  for (const region of formsDb.regions) {
    for (const form of formsDb.forms) {
      routes.push({
        url: `${baseUrl}/${region}/${form}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  return routes;
}
