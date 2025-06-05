import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = process.env.STRAPI_BASE_URL;

  const query = qs.stringify({
    locale,
    populate: {
      blocks: {
        on: {
          "blocks.main-screen": {
            populate: {
              image: {
                fields: ["url"],
              },
              button: {
                fields: ["title", "href"],
              },
              spinningText: {
                fields: ["text"],
              },
            },
          },
          "blocks.about": {
            populate: "*",
          },
          "blocks.services": {
            populate: "*",
          },
        },
      },
    },
  });

  const url = new URL(path, baseUrl);
  url.search = query;

  try {
    const res = await fetch(url.href, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(`Strapi error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return NextResponse.json(data.data); //data.data;
  } catch (err) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
