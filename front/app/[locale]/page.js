import MainScreen from "@/components/MainScreen/MainScreen";
import About from "@/components/About/About";
import Roadmap from "@/components/Roadmap/Roadmap";
import Loader from "@/components/Loader/Loader";
import qs from "qs";
import { notFound } from "next/navigation";
import Services from "@/components/Services/Services";
import Footer from "@/components/Footer/Footer";
import BgPhone from "@/components/BgPhone/BgPhone";

async function getData(path, locale) {
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

    // Якщо сервер повернув помилку — не парсимо JSON
    if (!res.ok) {
      console.error(`Strapi error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data.data;
  } catch (err) {
    console.error("Fetch failed:", err.message);
  }
}

function blockRendered(block) {
  switch (block.__component) {
    case "blocks.main-screen":
      return <MainScreen key={block.id} data={block} />;
    case "blocks.about":
      return <About key={block.id} data={block} />;
    case "blocks.services":
      return <Services key={block.id} data={block} />;
    default:
      return <Loader />;
  }
}

export default async function Home({ params }) {
  const { locale } = await params;
  const strapiData = await getData(process.env.HOME_URL, locale);

  if (!strapiData) {
    notFound();
  }

  const { blocks } = strapiData;

  return (
    <main>
      {blocks.map((block) => blockRendered(block))}
      <BgPhone></BgPhone>
      <Roadmap />
      <Footer />
    </main>
  );
}
