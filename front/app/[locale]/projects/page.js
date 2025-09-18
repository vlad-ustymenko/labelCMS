import { fetchStrapi } from "@/lib/strapi/strapi";
import { projectsPopulate } from "@/lib/strapi/populates";
import { homePopulate } from "@/lib/strapi/populates";
import ProjectsPage from "@/components/ProjectsPage/ProjectsPage";
import Button from "@/components/Button/Button";
import StrapiError from "@/components/StrapiError/StrapiError";
import HeaderProjects from "@/components/HeaderProjects/HeaderProjects";
import Menu from "@/components/Menu/Menu";
import st from "./projects.module.css";

export default async function Projects({ params }) {
  const { locale } = await params;
  const strapiData = await fetchStrapi(
    process.env.PROJECTS_URL,
    locale,
    projectsPopulate,
    true
  );

  const homeData = await fetchStrapi(
    process.env.HOME_URL,
    locale,
    homePopulate
  );

  const { blocks } = homeData;

  if (!strapiData) {
    return <StrapiError locale={locale} />;
  }

  const menuData = blocks.find((b) => b.__component === "blocks.menu");

  return (
    <>
      <HeaderProjects />
      <ProjectsPage projects={strapiData} locale={locale} />
      <Menu data={menuData} />
    </>
  );
}
