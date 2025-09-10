import { fetchStrapi } from "@/lib/strapi";
import { projectPopulate } from "@/lib/populates";
import { notFound } from "next/navigation";
import ProjectPage from "@/components/ProjectPage/ProjectPage";
import StrapiError from "@/components/StrapiError/StrapiError";
import st from "./page.module.css";

export default async function Page({ params }) {
  const { locale, slug } = await params;

  const strapiData = await fetchStrapi(
    process.env.PROJECTS_URL,
    locale,
    projectPopulate,
    true
  );

  if (!strapiData) {
    return <StrapiError locale={locale} />;
  }

  const project = strapiData.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className={st.main}>
      <ProjectPage project={project} />
    </main>
  );
}
