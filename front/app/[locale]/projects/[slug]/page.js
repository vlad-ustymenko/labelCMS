// "use client";
import React from "react";
// import { projects } from "@/DTO/projects";
import { notFound } from "next/navigation";
import { usePageTransition } from "../../../../hooks/usePageTransition";
import Button from "@/components/Button/Button";
import Markdown from "react-markdown";
import Link from "next/link";
import qs from "qs";
import Image from "next/image";
import st from "./page.module.css";
import Carousel from "@/components/Carousel/Carousel";
import ProjectPage from "@/components/ProjectPage/ProjectPage";

async function getData(path, locale) {
  const baseUrl = process.env.STRAPI_BASE_URL;

  const query = qs.stringify({
    locale,
    fields: ["title", "description", "slug", "year", "customer", "createdAt"],
    populate: {
      mainImage: {
        fields: ["url"],
      },
      images: {
        fields: ["url"],
      },
      paragraphs: {
        fields: ["paragraphs"],
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
  const { locale, slug } = await params;
  // const params = useParams();
  // const animateTransition = usePageTransition();
  // const id = params?.id;

  const strapiData = await getData(process.env.PROJECTS_URL, locale);

  if (!strapiData) {
    return (
      <div style={{ padding: "2rem", textAlign: "center", color: "crimson" }}>
        <h2>Не вдалося отримати дані 😢</h2>
        <p>
          Перевір, чи запущено Strapi, і чи доступний шлях{" "}
          <code>{process.env.HOME_URL}</code>.
        </p>
      </div>
    );
  }

  const project = strapiData.find((project) => project.slug === slug);

  if (!project) {
    notFound(); // <-- якщо проект не знайдено, викликаємо цю функцію
  }

  return (
    <main className={st.main}>
      <ProjectPage project={project} />
    </main>
  );
};

export default Page;
