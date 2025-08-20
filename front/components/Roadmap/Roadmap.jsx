"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import st from "./Roadmap.module.css";
import AnimateText from "../AnimateText/AnimateText";

gsap.registerPlugin(ScrollTrigger);

const Roadmap = ({ data }) => {
  const pathRef = useRef(null);
  const svgRef = useRef(null);
  const textRefs = useRef([]);
  const circleRefs = useRef([]);

  const sofaRef = useRef(null);
  const tableRef = useRef(null);
  const chair1Ref = useRef(null);
  const chair2Ref = useRef(null);

  const { title, list, highlightTitle } = data;

  const [isVertical, setIsVertical] = useState(false);

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
    const scroller = isVertical ? "body" : "[data-scroll-container]";

    const totalLength = path.getTotalLength();

    gsap.set(path, {
      strokeDasharray: totalLength,
      strokeDashoffset: totalLength,
    });

    circlesEl.forEach((circle) => {
      gsap.set(circle, {
        opacity: 0,
        // scale: 0,
      });
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".roadmap-trigger",
        scroller: scroller,
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
      scroller: scroller,
      start: "top top",
      end: "bottom bottom", // або конкретне значення як "bottom top"
      pin: `.${st.roadmapHorizontal}`,
      scrub: true,
      // anticipatePin: 1,
    });

    ScrollTrigger.create({
      trigger: ".roadmap-trigger",
      scroller: scroller,
      start: "top center",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;

        circlesEl.forEach((circle, i) => {
          const threshold = progressPoints[i];

          if (progress >= threshold) {
            gsap.to(circle, {
              opacity: 1,
              duration: 0.4,
              scale: 1,
              transformOrigin: "center center",
            });
            gsap.to(labelsEl[i], { opacity: 1, y: 0, duration: 0.4 });
          } else {
            gsap.to(circle, {
              opacity: 0,
              duration: 0.3,
              scale: 0,
              transformOrigin: "center center",
            });
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

    updatePositions();
    ScrollTrigger.refresh();

    if (
      !sofaRef.current ||
      !tableRef.current ||
      !chair1Ref.current ||
      !chair2Ref.current
    )
      return;

    const imagesTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".roadmap-trigger",
        scroller, // твій кастомний скрол, якщо Locomotive
        start: "top center",
        end: "80% center",
        scrub: true,
      },
    });

    imagesTl
      .fromTo(
        sofaRef.current,
        { y: "-10vh", opacity: 0 },
        { y: "0vh", opacity: 1, ease: "none" },
        0 // позиція на таймлайні
      )
      .fromTo(
        tableRef.current,
        { y: "10vh", opacity: 0 },
        { y: "0vh", opacity: 1, ease: "none" },
        0
      )
      .fromTo(
        chair1Ref.current,
        { x: "15vw", opacity: 0 },
        { x: "0vw", opacity: 1, ease: "none" },
        0
      )
      .fromTo(
        chair2Ref.current,
        { x: "-15vw", opacity: 0 },
        { x: "0vw", opacity: 1, ease: "none" },
        0
      );

    window.addEventListener("resize", updatePositions);
    return () => {
      window.removeEventListener("resize", updatePositions);
      tl.kill();
    };
  }, [isVertical]);

  return (
    <div className={`${st.roadmapWrapper} roadmap-trigger`}>
      <div className={st.roadmapHorizontal}>
        <div ref={sofaRef} className={st.imageWrapper}>
          <Image
            src="/sofa.png"
            alt="roadmap"
            sizes={isVertical ? "100vh" : "200vw"}
            fill
            className={st.image}
          />
        </div>
        <div ref={chair1Ref} className={st.imageWrapper}>
          <Image
            src="/chair1.png"
            alt="roadmap"
            sizes={isVertical ? "100vh" : "200vw"}
            fill
            className={st.image}
          />
        </div>
        <div ref={chair2Ref} className={st.imageWrapper}>
          <Image
            src="/chair2.png"
            alt="roadmap"
            sizes={isVertical ? "100vh" : "200vw"}
            fill
            className={st.image}
          />
        </div>

        <div ref={tableRef} className={st.imageWrapper}>
          <Image
            src="/table.png"
            alt="roadmap"
            sizes={isVertical ? "100vh" : "200vw"}
            fill
            className={st.image}
          />
        </div>
        <AnimateText
          stagger={0.1}
          duration={0.4}
          highlight={highlightTitle}
          className={st.roadmapTitle}
        >
          {title}
        </AnimateText>

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
          {list.map((item, i) => (
            <div
              key={i}
              ref={(el) => (textRefs.current[i] = el)}
              className={st.labelHorizontal}
              style={{
                position: "absolute",
                top: isVertical
                  ? `${12.5 + i * 14.5}%`
                  : i % 2 === 0
                  ? "30%"
                  : "68%",
                left: isVertical
                  ? i % 2 === 0
                    ? "40%"
                    : "20%"
                  : `${10 + i * 15}%`,
                opacity: 0,
              }}
            >
              {item.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
