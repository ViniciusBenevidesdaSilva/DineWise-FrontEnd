import type { MetadataRoute } from 'next';

import { env } from '@/infra/env';
import { allowedPaths } from '@/shared/utils/allowed-paths';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: allowedPaths.map((path) => path.path),
        disallow: '*',
      },
    ],
    sitemap: `${env.HOST}/sitemap.xml`,
  };
}
