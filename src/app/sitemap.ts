import type { MetadataRoute } from 'next';

import { env } from '@/infra/env';
import { allowedPaths } from '@/shared/utils/allowed-paths';

export default function sitemap(): MetadataRoute.Sitemap {
  return allowedPaths.map((path) => ({
    url: `${env.HOST}${path.path}`,
    lastModified: new Date(),
    changeFrequency: path.frequency,
    priority: path.priority,
  })) as MetadataRoute.Sitemap;
}
