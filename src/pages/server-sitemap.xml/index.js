import { getServerSideSitemap } from "next-sitemap";

export const getServerSideProps = async (ctx) => {
  let phones = await fetch(
    "https://mobilepricebd.tech/api/home?page=1&limit=200"
  );

  phones = await phones.json();

  const newsSitemaps = phones?.latestPhones?.map((item) => ({
    loc: `https://mobilepricebd.tech/phone/${item.slug}`,
    lastmod: new Date().toISOString(),
  }));

  const fields = [...newsSitemaps];

  return getServerSideSitemap(ctx, fields);
};

export default function Site() {}
