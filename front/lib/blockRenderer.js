import MainScreen from "@/components/MainScreen/MainScreen";
import About from "@/components/About/About";
import Services from "@/components/Services/Services";
import Sections from "@/components/Sections/Sections";
import Roadmap from "@/components/Roadmap/Roadmap";
import Footer from "@/components/Footer/Footer";

const blockMap = {
  "blocks.main-screen": (block) => <MainScreen key={block.id} data={block} />,
  "blocks.about": (block) => <About key={block.id} data={block} />,
  "blocks.services": (block) => (
    <Sections key={block.id} data={block} services />
  ),
  "blocks.achievements": (block) => (
    <Sections key={block.id} data={block} achievements />
  ),
  "blocks.reviews": (block) => <Sections key={block.id} data={block} reviews />,
  "blocks.roadmap": (block) => <Roadmap key={block.id} data={block} />,
  "blocks.footer": (block) => <Footer key={block.id} data={block} />,

  // business
  "blocks.business-main-screen": (block) => (
    <MainScreen key={block.id} data={block} />
  ),
  "blocks.approaches": (block) => (
    <Sections key={block.id} data={block.section} approaches />
  ),
};

export function renderBlock(block) {
  const renderer = blockMap[block.__component];
  return renderer ? renderer(block) : null;
}
