"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePageTransition } from "../../hooks/usePageTransition";
import { projects } from "@/DTO/projects";
import gsap from "gsap";
import st from "./projects.module.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Page = () => {
  const animateTransition = usePageTransition();
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
    <>
      <Link
        className={st.button}
        href="/"
        onClick={(e) => {
          e.preventDefault();
          // window.history.replaceState({ customState: true }, "", "/projects");
          animateTransition("/");
          setTimeout(() => {
            document.body.classList.remove("bodyHidden");
          }, 500);
        }}
      >
        Label
      </Link>

      <div className={st.wrapper}>
        {projects.map((project, i) => (
          <Link
            href={`/projects/${project.id}`}
            onClick={(e) => {
              e.preventDefault();
              window.history.replaceState(
                { customState: true },
                "",
                "/projects"
              );
              animateTransition(`/projects/${project.id}`);
            }}
            key={project.id + i}
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
                src={project.url}
                alt={project.title}
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
    </>
  );
};

export default Page;
