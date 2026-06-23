import type { MetadataRoute } from 'next'
import formsDb from '@/src/data/forms-db.json'

const regions = formsDb.regions;
const industries = formsDb.industries;
const forms = formsDb.forms;
const TOTAL_URLS = regions.length * industries.length * forms.length;
const CHUNK_SIZE = 10000;

export async function generateSitemaps() {
  const numSitemaps = Math.ceil(TOTAL_URLS / CHUNK_SIZE);
  return Array.from({ length: numSitemaps }, (_, i) => ({ id: i }));
}

export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
  const start = id * CHUNK_SIZE;
  const end = Math.min(start + CHUNK_SIZE, TOTAL_URLS);

  // Generate the flat list of all possible routes
  const allRoutes: string[] = [];
  for (const r of regions) {
    for (const i of industries) {
      for (const f of forms) {
        allRoutes.push(`/${r}/${i}/${f}`);
      }
    }
  }

  const chunkedRoutes = allRoutes.slice(start, end);

  return chunkedRoutes.map(route => ({
    url: `https://canadianforms.ca${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));
}
