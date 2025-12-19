import { siteUrl } from "@/lib/site";

export default function sitemap() {
  const now = new Date();
  return [
    {
      url: siteUrl,
      lastModified: now,
    },
    {
      url: `${siteUrl}/progress`,
      lastModified: now,
    },
  ];
}
