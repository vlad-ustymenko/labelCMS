// import { projects } from "@/DTO/projects";
import ProjectsPage from "@/components/ProjectsPage/ProjectsPage";
import qs from "qs";
import Button from "@/components/Button/Button";
import st from "./projects.module.css";

async function getData(path, locale) {
  const baseUrl = process.env.STRAPI_BASE_URL;

  const query = qs.stringify({
    locale,
    fields: ["title", "description", "slug", "year", "customer", "createdAt"],
    populate: {
      mainImage: {
        fields: ["url"],
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

const Page = async ({ params }) => {
  const { locale } = await params;
  const strapiData = await getData(process.env.PROJECTS_URL, locale);

  return (
    <>
      <Button title="Label" isBack className={st.button}></Button>
      <ProjectsPage projects={strapiData} locale={locale} />
    </>
  );
};

export default Page;
