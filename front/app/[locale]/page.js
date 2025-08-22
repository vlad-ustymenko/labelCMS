import MainScreen from "@/components/MainScreen/MainScreen";
import About from "@/components/About/About";
import Roadmap from "@/components/Roadmap/Roadmap";
import Loader from "@/components/Loader/Loader";
import qs from "qs";
import { notFound } from "next/navigation";
import Sections from "@/components/Sections/Sections";
import Footer from "@/components/Footer/Footer";
import BgPhone from "@/components/BgPhone/BgPhone";
import Achievements from "@/components/Achievements/Achievements";
import Reviews from "@/components/Reviews/Reviews";
import TextScramble from "@/components/TextScrambler/TextScrambler";
import Modal from "@/components/Modal/Modal";
import Menu from "@/components/Menu/Menu";
async function getData(path, locale) {
  const baseUrl = process.env.STRAPI_BASE_URL;

  const query = qs.stringify({
    locale,
    populate: {
      blocks: {
        on: {
          "blocks.main-screen": {
            populate: {
              spinningText: {
                fields: ["text"],
              },
              header: {
                populate: "*",
              },
            },
          },
          "blocks.about": {
            populate: "*",
          },
          "blocks.services": {
            populate: "*",
          },
          "blocks.achievements": {
            populate: "*",
          },
          "blocks.reviews": {
            populate: "*",
          },
          "blocks.roadmap": {
            populate: "*",
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
      return;
    }

    const data = await res.json();
    return data.data;
  } catch (err) {
    console.error("Fetch failed:", err.message);
  }
}

// function blockRendered(block) {
//   switch (block.__component) {
//     case "blocks.main-screen":
//       return <MainScreen key={block.id} data={block} />;
//     case "blocks.about":
//       return <About key={block.id} data={block} />;
//     case "blocks.services":
//       return <Services key={block.id} data={block} />;
//     default:
//       return <Loader />;
//   }
// }

function blockRendered(block) {
  switch (block.__component) {
    case "blocks.main-screen":
      return <MainScreen key={block.id} data={block} />;
    case "blocks.about":
      return <Sections key={block.id} data={block} about={true} />;
    case "blocks.services":
      return <Sections key={block.id} data={block} services={true} />;
    case "blocks.achievements":
      return <Sections key={block.id} data={block} achievements={true} />;
    case "blocks.reviews":
      return <Sections key={block.id} data={block} reviews={true} />;
    case "blocks.roadmap":
      return <Roadmap key={block.id} data={block} />;
    case "blocks.footer":
      return <Footer key={block.id} data={block} />;
  }
}

export default async function Home({ params }) {
  const { locale } = await params;
  const strapiData = await getData(process.env.HOME_URL, locale);

  if (!strapiData) {
    notFound();
  }

  const { blocks } = strapiData;
  const menuData = blocks.find((block) => block.__component === "blocks.menu");
  const modalData = blocks.find(
    (block) => block.__component === "blocks.modal"
  );
  console.log(modalData);

  return (
    <>
      <main>
        {blocks.map((block) => blockRendered(block))}
        {/* <Footer /> */}
      </main>
      <Modal data={modalData}></Modal>
      <Menu data={menuData}></Menu>
    </>
  );
}
