import { NextResponse } from "next/server";

export async function GET() {
  const content = `
User-agent: *
Disallow:

Sitemap: ${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml
`;

  return new NextResponse(content.trim(), {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
