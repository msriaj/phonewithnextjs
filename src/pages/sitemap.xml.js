import { API, DOMAIN } from "@/config";

async function generateSitemap() {
  const res = await fetch(API + '/brand');
  const brands = await res.json();

  const urls = [];

  for (const brand of brands) {
    // Fetch the phone list for the brand
    const res = await fetch(API + `/v2/brand/${brand.slug}`);
    const phones = await res.json();

    // Add the brand URL to the sitemap
    urls.push({
      url: `/brand/${brand.slug}`,
      lastmod: new Date().toISOString(),
    });

    // also add pages
    for (let i = 2; i <= phones.totalPage; i++) {
      urls.push({
        url: `/brand/${brand.slug}?page=${i}`,
        lastmod: new Date().toISOString(),
      });
    }

    // Add the phone URLs to the sitemap
    for (const phone of phones.phoneList) {
      urls.push({
        url: `/phone/${phone.slug}`,
        lastmod: new Date().toISOString(),
      });
    }

  }

  return urls;
}

export default function Sitemap() {
  // This component doesn't render anything, so it returns null
  return null;
}

export async function getServerSideProps() {
  const urls = await generateSitemap();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls.map((url) => `
        <url>
          <loc>${DOMAIN}${url.url}</loc>
          <lastmod>${url.lastmod}</lastmod>
        </url>
      `).join('')}
    </urlset>
  `;

  return {
    props: {
      xml
    },
  };
}
