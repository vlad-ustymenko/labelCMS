"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function ScrollWrapper({ children }) {
  const [scrollReady, setScrollReady] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const locoScrollRef = useRef(null);
  const pathname = usePathname();

  // Перевіряємо ширину екрану
  useEffect(() => {
    const checkSize = () => {
      setIsDesktop(window.innerWidth > 1024);
    };

    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  useEffect(() => {
    if (!isDesktop) return; // якщо < 1024px — не запускаємо

    const initScroll = async () => {
      gsap.registerPlugin(ScrollTrigger);

      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const scrollContainer = document.querySelector("[data-scroll-container]");
      if (!scrollContainer) return;

      const locoScroll = new LocomotiveScroll({
        el: scrollContainer,
        smooth: true,
        lerp: 0.08,
        scrollbarClass: "c-scrollbar",
      });

      locoScrollRef.current = locoScroll;

      locoScroll.on("scroll", ScrollTrigger.update);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          ScrollTrigger.scrollerProxy(scrollContainer, {
            scrollTop(value) {
              if (arguments.length) {
                locoScroll.scrollTo(value, { duration: 0, disableLerp: true });
              } else {
                return locoScroll.scroll.instance.scroll.y;
              }
            },
            getBoundingClientRect() {
              return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight,
              };
            },
            pinType: scrollContainer.style.transform ? "transform" : "fixed",
          });

          ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
          ScrollTrigger.refresh();

          setScrollReady(true);
        });
      });
    };

    initScroll();

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      locoScrollRef.current?.destroy();
    };
  }, [isDesktop]);

  useEffect(() => {
    if (isDesktop && scrollReady) {
      locoScrollRef.current?.update();
    }
  }, [scrollReady, isDesktop]);

  useEffect(() => {
    if (!isDesktop) return;

    const timeout = setTimeout(() => {
      locoScrollRef.current?.update();
      ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(timeout);
  }, [pathname, isDesktop]);

  if (!isDesktop) {
    // На мобільних просто віддаємо контент
    return <div data-scroll-container>{children}</div>;
  }

  return <div data-scroll-container>{scrollReady ? children : null}</div>;
}
