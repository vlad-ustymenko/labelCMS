"use client";
import React, { useEffect, useRef } from "react";
import { usePageTransition } from "../../hooks/usePageTransition";
import st from "./ProjectsPage.module.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setupProjectsAnimation } from "@/lib/animations/projects";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";

const ProjectsPage = ({ projects, locale }) => {
  const animateTransition = usePageTransition();
  const cardsRef = useRef([]);
  const triggersRef = useRef([]);

  const sortedProjects = [...projects].sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt) // залишаємо як у тебе
  );

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    mm.add(
      {
        isMobile: "(max-width: 767px)",
        isTablet: "(min-width: 768px) and (max-width: 1024px)",
        isDesktop: "(min-width: 1025px) and (max-width: 1919px)",
        isLargeDesktop: "(min-width: 1920px)",
      },
      (context) => {
        const { isMobile, isTablet, isLargeDesktop } = context.conditions;

        const scroller =
          typeof window !== "undefined" && window.innerWidth < 1025
            ? "body"
            : "[data-scroll-container]";

        // створюємо анімації
        triggersRef.current = setupProjectsAnimation(
          cardsRef.current,
          { isMobile, isTablet, isLargeDesktop },
          scroller
        );
      }
    );

    return () => {
      mm.revert();
      triggersRef.current.forEach((t) => t.kill());
      triggersRef.current = [];
    };
  }, []);

  return (
    <div className={st.wrapper}>
      {sortedProjects.map((project, i) => (
        <Link
          key={project.slug}
          href={`/projects/${project.slug}`}
          onClick={(e) => {
            e.preventDefault();
            window.history.replaceState({ customState: true }, "", "/projects");
            animateTransition(`/${locale}/projects/${project.slug}`);
          }}
          className={st.cardWrapper}
          ref={(el) => (cardsRef.current[i] = el)}
          style={{
            width: "100%",
            height: "fit-content",
          }}
        >
          <div className={st.imageWrapper}>
            <Image
              fill
              sizes="33vw"
              src={`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${project.mainImage.url}`}
              alt="qwd"
              style={{ objectFit: "cover" }}
              className={st.image}
            />
          </div>
          <div className={st.year}>{project.year}</div>
          <div className={st.title}>{project.title}</div>
          <div className={st.customer}>{project.customer}</div>
          <div className={st.description}>{project.description}</div>
        </Link>
      ))}
    </div>
  );
};

export default ProjectsPage;
