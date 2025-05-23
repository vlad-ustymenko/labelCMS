import MainScreen from "@/components/MainScreen/MainScreen";
import About from "@/components/About/About";
import Roadmap from "@/components/Roadmap/Roadmap";
import Loader from "@/components/Loader/Loader";
import qs from "qs";

async function getData(path, locale) {
  const baseUrl = "http://localhost:1337";

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
    default:
      return <Loader />;
  }
}

export default async function Home({ params }) {
  const { locale } = await params;
  const strapiData = await getData("/api/home-page", locale);

  const { blocks } = strapiData;

  if (!strapiData) {
    return (
      <div style={{ padding: "2rem", textAlign: "center", color: "crimson" }}>
        <h2>Не вдалося отримати дані 😢</h2>
        <p>
          Перевір, чи запущено Strapi на <code>localhost:1337</code>.
        </p>
      </div>
    );
  }

  return (
    <main>
      {blocks.map((block) => blockRendered(block))}
      <Roadmap />
      <div style={{ height: "300vh" }} />
    </main>
  );
}
