import { fetchStrapi } from "@/lib/strapi";
import { projectsPopulate } from "@/lib/populates";
import ProjectsPage from "@/components/ProjectsPage/ProjectsPage";
import Button from "@/components/Button/Button";
import StrapiError from "@/components/StrapiError/StrapiError";
import st from "./projects.module.css";

export default async function Projects({ params }) {
  const { locale } = await params;
  const strapiData = await fetchStrapi(
    process.env.PROJECTS_URL,
    locale,
    projectsPopulate,
    true
  );

  if (!strapiData) {
    return <StrapiError locale={locale} />;
  }

  return (
    <>
      <Button title="Label" className={st.button} link />
      <ProjectsPage projects={strapiData} locale={locale} />
    </>
  );
}
