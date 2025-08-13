"use client";
import React, { useEffect, useRef } from "react";
import { usePageTransition } from "../../hooks/usePageTransition";
import st from "./ProjectsPage.module.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";

const ProjectsPage = ({ projects, locale }) => {
  const animateTransition = usePageTransition();

  const sortedProjects = [...projects].sort((a, b) => {
    return new Date(a.createdAt) - new Date(b.createdAt); // від нових до старих
  });

  const cardsRef = useRef([]);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    const setupAnimation = (isMobile, isTablet, isLargeDesktop) => {
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        let fromVars = { opacity: 0, x: 0, rotateZ: 0, scale: 1 };

        if (isMobile || isTablet || isLargeDesktop) {
          const columns = isLargeDesktop ? 4 : 2;
          const col = index % columns;
          const isLeft = col < columns / 2;
          fromVars.x = isLeft ? -100 : 100;
          fromVars.rotateZ = isLeft ? -10 : 10;
        } else {
          const col = index % 3;
          fromVars.x = col === 0 ? -100 : col === 2 ? 100 : 0;
          fromVars.rotateZ = col === 0 ? -10 : col === 2 ? 10 : 0;
          fromVars.scale = col === 1 ? 0.7 : 1;
        }

        const toVars = {
          opacity: 1,
          x: 0,
          rotateZ: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
        };

        const animation = gsap.fromTo(card, fromVars, {
          ...toVars,
          paused: true,
        });

        ScrollTrigger.create({
          trigger: card,
          scroller: "[data-scroll-container]",
          start: "top 90%",
          end: "bottom 10%",
          onEnter: () => animation.play(),
          onLeave: () => animation.reverse(),
          onEnterBack: () => animation.play(),
          onLeaveBack: () => animation.reverse(),
        });
      });
    };

    // Register matchMedia for responsiveness
    mm.add(
      {
        isMobile: "(max-width: 767px)",
        isTablet: "(min-width: 768px) and (max-width: 1024px)",
        isDesktop: "(min-width: 1025px) and (max-width: 1919px)",
        isLargeDesktop: "(min-width: 1920px)",
      },
      (context) => {
        const { isMobile, isTablet, isLargeDesktop } = context.conditions;
        setupAnimation(isMobile, isTablet, isLargeDesktop);
      }
    );

    return () => mm.revert(); // Clean up animations
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
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "200px",
              overflow: "hidden",
              willChange: "transform, opacity, scale, rotate",
            }}
          >
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
