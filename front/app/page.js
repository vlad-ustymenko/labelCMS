import MainScreen from "../components/MainScreen/MainScreen";
import About from "@/components/About/About";
import Roadmap from "@/components/Roadmap/Roadmap";

async function getData(path) {
  const baseUrl = "http://localhost:1337";
  try {
    const res = await fetch(`${baseUrl}${path}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export default async function Home() {
  const strapiData = await getData("/api/home-page");
  console.log(strapiData);
  return (
    <main>
      <MainScreen />
      <About data={strapiData} />
      <Roadmap />

      <div style={{ height: "300vh" }} />
    </main>
  );
}
