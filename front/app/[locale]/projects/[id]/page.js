"use client";
import React from "react";
import { projects } from "@/DTO/projects";
import { useParams } from "next/navigation";
import { usePageTransition } from "../../../../hooks/usePageTransition";
import Link from "next/link";
import Image from "next/image";
import st from "./page.module.css";
import Carousel from "@/components/Carousel/Carousel";

const Page = () => {
  const params = useParams();
  const animateTransition = usePageTransition();
  const id = params?.id;

  const project = projects.find((card) => card.id === Number(id));

  if (!project) return <div>Project not found</div>;

  return (
    <main className={st.main}>
      <Carousel />
      {/* <Image src={project.url} alt={project.title} fill sizes="100%"></Image> */}
      <div className={st.container}>
        <div className={st.contentWrapper}>
          <header className={st.header}>
            <Link
              className={st.button}
              href="/"
              onClick={(e) => {
                e.preventDefault();
                window.history.replaceState(
                  { customState: true },
                  "",
                  "/projects"
                );
                animateTransition("/");
              }}
            >
              Label
            </Link>
            <Link
              className={st.button}
              href="/"
              onClick={(e) => {
                e.preventDefault();
                window.history.replaceState(
                  { customState: true },
                  "",
                  "/projects"
                );
                animateTransition("/projects");
              }}
            >
              Назад
            </Link>
          </header>
          <h1 className={st.title}>{project.title}</h1>
          <p>{project.content}</p>
          {project.paragraphs.map((paragraph) => (
            <p key={paragraph} className={st.paragraph}>
              {paragraph}
            </p>
          ))}
          <p>{project.year}</p>
          <p>{project.customer}</p>
        </div>
      </div>
    </main>
  );
};

export default Page;
