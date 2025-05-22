"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import st from "./Roadmap.module.css";

gsap.registerPlugin(ScrollTrigger);

const Roadmap = () => {
  const pathRef = useRef(null);
  const svgRef = useRef(null);
  const textRefs = useRef([]);
  const circleRefs = useRef([]);
  const firstImageRef = useRef(null);
  const secondImageRef = useRef(null);

  const [isVertical, setIsVertical] = useState(false);

  const labels = [
    "Дзвінок",
    "Зустріч i консультація",
    "Заключення договору",
    "Виїзд дизайнера на об'єкт",
    "Розробка дизайн-проєкту",
    "Реалізація та здача",
    "Фініш",
  ];

  const progressPoints = [0.085, 0.25, 0.42, 0.58, 0.75, 0.92];

  useEffect(() => {
    const handleResize = () => {
      setIsVertical(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const path = pathRef.current;
    const svg = svgRef.current;
    const labelsEl = textRefs.current;
    const circlesEl = circleRefs.current;

    const totalLength = path.getTotalLength();

    gsap.set(path, {
      strokeDasharray: totalLength,
      strokeDashoffset: totalLength,
    });

    circlesEl.forEach((circle) => {
      gsap.set(circle, {
        opacity: 0,
        scale: 0,
      });
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".roadmap-trigger",
        scroller: "[data-scroll-container]",
        start: "top center",
        end: "bottom bottom",
        scrub: true,
      },
    });

    tl.to(path, {
      strokeDashoffset: 0,
      ease: "none",
    });

    ScrollTrigger.create({
      trigger: ".roadmap-trigger", // батьківський контейнер
      scroller: "[data-scroll-container]",
      start: "top top",
      end: "bottom bottom", // або конкретне значення як "bottom top"
      pin: `.${st.roadmapHorizontal}`,
      scrub: true,
      anticipatePin: 1,
    });

    ScrollTrigger.create({
      trigger: ".roadmap-trigger",
      scroller: "[data-scroll-container]",
      start: "top center",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;

        circlesEl.forEach((circle, i) => {
          const threshold = progressPoints[i];

          if (progress >= threshold) {
            gsap.to(circle, { opacity: 1, duration: 0.4, scale: 1 });
            gsap.to(labelsEl[i], { opacity: 1, y: 0, duration: 0.4 });
          } else {
            gsap.to(circle, { opacity: 0, duration: 0.3, scale: 0 });
            gsap.to(labelsEl[i], { opacity: 0, y: 20, duration: 0.3 });
          }
        });
      },
    });

    const updatePositions = () => {
      progressPoints.forEach((pointValue, i) => {
        const pos = path.getPointAtLength(pointValue * totalLength);
        const circle = circlesEl[i];
        if (circle) {
          circle.setAttribute("cx", Math.ceil(pos.x));
          circle.setAttribute("cy", Math.ceil(pos.y));
        }
      });
    };

    gsap.to(firstImageRef.current, {
      x: "30vw",
      rotate: 20,
      ease: "none",
      scrollTrigger: {
        trigger: ".first-image-trigger", // або окремий контейнер
        scroller: "[data-scroll-container]",
        start: "top 80%",
        end: "bottom center",
        scrub: true,
      },
    });
    gsap.to(secondImageRef.current, {
      x: "-30vw",
      rotate: -20,
      ease: "none",
      scrollTrigger: {
        trigger: ".second-image-trigger", // або окремий контейнер
        scroller: "[data-scroll-container]",
        start: "top 80%",
        end: "bottom center",
        scrub: true,
      },
    });

    updatePositions();
    ScrollTrigger.refresh();

    window.addEventListener("resize", updatePositions);
    return () => {
      window.removeEventListener("resize", updatePositions);
    };
  }, [isVertical]);

  return (
    <div className={`${st.roadmapWrapper} roadmap-trigger`}>
      <div
        className={`${st.firstImageWrapper}  first-image-trigger`}
        data-scroll
        data-scroll-speed="-2"
      >
        <Image
          src="/1.png"
          alt="roadmap"
          width={1000}
          height={1000}
          className={`${st.firstImage}`}
          ref={firstImageRef}
        />
      </div>

      <div className={`${st.secondImageWrapper}  second-image-trigger`}>
        <Image
          src="/3.png"
          alt="roadmap"
          width={1000}
          height={1000}
          className={`${st.secondImage}`}
          ref={secondImageRef}
        />
      </div>

      <div className={st.roadmapHorizontal}>
        <h2 className={st.roadmapTitle}>Етапи взаємодії</h2>

        <svg
          ref={svgRef}
          className={st.roadmapSvg}
          viewBox={isVertical ? "0 0 200 1000" : "0 0 1000 200"}
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            ref={pathRef}
            d={
              isVertical
                ? "M 100 10 Q -150 90, 100 170 Q 380 250, 100 330 Q -150 410, 100 490 Q 380 570, 100 650 Q -150 730, 100 810 Q 380 890, 100 970"
                : "M 10 100 Q 90 0, 170 100 Q 250 200, 330 100 Q 410 0, 490 100 Q 570 200, 650 100 Q 730 0, 810 100 Q 890 200, 970 100"
            }
            stroke="white"
            strokeWidth={isVertical ? "10" : "6"}
            fill="none"
          />
          {progressPoints.map((_, i) => (
            <circle
              key={i}
              ref={(el) => (circleRefs.current[i] = el)}
              r="12"
              fill="var(--accent)"
            />
          ))}
        </svg>

        <div className={st.labelsHorizontal}>
          {labels.map((title, i) => (
            <div
              key={i}
              ref={(el) => (textRefs.current[i] = el)}
              className={st.labelHorizontal}
              style={{
                position: "absolute",
                top: isVertical
                  ? `${11 + i * 14.5}%`
                  : i % 2 === 0
                  ? "30%"
                  : "68%",
                left: isVertical
                  ? i % 2 === 0
                    ? "20%"
                    : "65%"
                  : `${13 + i * 15}%`,
                opacity: 0,
                transform: "translate(-50%, 0)",
              }}
            >
              {title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
