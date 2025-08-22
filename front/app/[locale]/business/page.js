import MainScreen from "@/components/MainScreen/MainScreen";
import About from "@/components/About/About";
import Roadmap from "@/components/Roadmap/Roadmap";
import Loader from "@/components/Loader/Loader";
import qs from "qs";
import { notFound } from "next/navigation";
import Services from "@/components/Services/Services";
import Footer from "@/components/Footer/Footer";
import BgPhone from "@/components/BgPhone/BgPhone";
import { headers } from "next/headers";
import Sections from "@/components/Sections/Sections";
import Menu from "@/components/Menu/Menu";

async function getData(path, locale) {
  const baseUrl = process.env.STRAPI_BASE_URL;

  const query = qs.stringify({
    locale,
    populate: {
      blocks: {
        on: {
          "blocks.business-main-screen": {
            populate: {
              spinningText: {
                fields: ["text"],
              },
              header: {
                populate: "*",
              },
            },
          },
          // "blocks.about": {
          //   populate: "*",
          // },
          "blocks.services": {
            populate: "*",
          },
          "blocks.approaches": {
            populate: {
              section: {
                populate: "*",
              },
            },
          },

          "blocks.menu": {
            populate: "*",
          },
          "blocks.modal": {
            populate: "*",
          },
          "blocks.footer": {
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
    return data.data;
  } catch (err) {
    console.error("Fetch failed:", err.message);
  }
}

function blockRendered(block) {
  switch (block.__component) {
    case "blocks.business-main-screen":
      return <MainScreen key={block.id} data={block} />;
    // case "blocks.about":
    //   return <About key={block.id} data={block} />;
    case "blocks.approaches":
      return <Sections key={block.id} data={block.section} approaches={true} />;
    case "blocks.services":
      return <Sections key={block.id} data={block} business={true} />;
    case "blocks.footer":
      return <Footer key={block.id} data={block} />;
  }
}

export default async function Business({ params }) {
  const { locale } = await params;
  const strapiData = await getData(process.env.BUSINESS_URL, locale);

  if (!strapiData) {
    notFound();
  }
  console.log(strapiData);
  const { blocks } = strapiData;

  const menuData = blocks.find((block) => block.__component === "blocks.menu");

  return (
    <>
      {" "}
      <main>
        {blocks
          .filter((block) => block.__component !== "blocks.menu")
          .map((block) => blockRendered(block))}
        {/* <Roadmap /> */}
        {/* <Footer /> */}
      </main>
      <Menu data={menuData}></Menu>
    </>
  );
}
