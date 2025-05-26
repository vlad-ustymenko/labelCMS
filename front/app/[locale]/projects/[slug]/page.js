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

  const project = strapiData.find((project) => project.slug === slug);

  if (!project) {
    notFound(); // <-- якщо проект не знайдено, викликаємо цю функцію
  }

  return (
    <main className={st.main}>
      <Carousel images={project.images} />
      {/* <Image src={project.url} alt={project.title} fill sizes="100%"></Image> */}
      <div className={st.container}>
        <div className={st.contentWrapper}>
          <header className={st.header}>
            <Button className={st.button} title="Label" isBack />
            <Button
              className={st.button}
              title="Назад"
              href="/projects"
              isBack
            />
          </header>
          <h1 className={st.title}>{project.title}</h1>
          <p>{project.content}</p>
          {project.paragraphs.map((paragraph) => (
            <Markdown
              key={paragraph.paragraphs}
              components={{
                ul: ({ children }) => <ul className={st.list}>{children}</ul>,
                li: ({ children }) => (
                  <li className={st.listItem}>{children}</li>
                ),
                p: ({ children }) => <p className={st.paragraph}>{children}</p>,
              }}
            >
              {paragraph.paragraphs}
            </Markdown>
          ))}
          <p>{project.year}</p>
          <p>{project.customer}</p>
        </div>
      </div>
    </main>
  );
};

export default Page;
