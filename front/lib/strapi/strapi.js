// lib/strapi.js
import qs from "qs";

export async function fetchStrapi(path, locale, data, page) {
  const baseUrl = process.env.STRAPI_BASE_URL;
  const { fields, populate } = data;
  const query = page
    ? qs.stringify({ locale, fields, populate }, { encodeValuesOnly: false })
    : qs.stringify({ locale, populate: data });
  const url = new URL(path, baseUrl);
  url.search = query;

  try {
    const res = await fetch(url.href, { cache: "no-store" });
    if (!res.ok) {
      console.error(`Strapi error: ${res.status} ${res.statusText}`);
      return null;
    }
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.error("Fetch failed:", err.message);
    return null;
  }
}
