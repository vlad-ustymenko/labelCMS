import { NextResponse } from "next/server";

const locales = ["en", "uk"];
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
const strapiBase = process.env.STRAPI_BASE_URL;

export async function GET() {
  const allSlugs = {};

  for (const locale of locales) {
    const res = await fetch(
      `${strapiBase}/api/projects?locale=${locale}&fields[0]=slug`,
      { cache: "no-store" }
    );

    const json = await res.json();
    allSlugs[locale] = json.data?.map((p) => p.slug) || [];
  }

  const lastmod = new Date().toISOString();
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
  xml += `        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

  // Статичні сторінки
  for (const path of ["", "projects"]) {
    for (const locale of locales) {
      const url = `${baseUrl}/${locale}/${path}`.replace(/\/+$/, "");

      xml += `  <url>\n`;
      xml += `    <loc>${url}</loc>\n`;
      xml += `    <lastmod>${lastmod}</lastmod>\n`;
      xml += `    <changefreq>monthly</changefreq>\n`;
      xml += `    <priority>1</priority>\n`;

      for (const altLocale of locales) {
        const altUrl = `${baseUrl}/${altLocale}/${path}`.replace(/\/+$/, "");
        xml += `    <xhtml:link rel="alternate" hreflang="${altLocale}" href="${altUrl}"/>\n`;
      }

      xml += `  </url>\n`;
    }
  }

  // Динамічні сторінки
  for (const locale of locales) {
    for (const slug of allSlugs[locale]) {
      const url = `${baseUrl}/${locale}/projects/${slug}`;

      xml += `  <url>\n`;
      xml += `    <loc>${url}</loc>\n`;
      xml += `    <lastmod>${lastmod}</lastmod>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.9</priority>\n`;

      for (const altLocale of locales) {
        const altSlug = allSlugs[altLocale].find((s) => s === slug);
        if (altSlug) {
          const altUrl = `${baseUrl}/${altLocale}/projects/${altSlug}`;
          xml += `    <xhtml:link rel="alternate" hreflang="${altLocale}" href="${altUrl}"/>\n`;
        }
      }

      xml += `  </url>\n`;
    }
  }

  xml += `</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
