"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function ScrollWrapper({ children }) {
  const [scrollReady, setScrollReady] = useState(false);
  const locoScrollRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const initScroll = async () => {
      gsap.registerPlugin(ScrollTrigger);

      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const scrollContainer = document.querySelector("[data-scroll-container]");
      if (!scrollContainer) return;

      const locoScroll = new LocomotiveScroll({
        el: scrollContainer,
        smooth: true,
        lerp: 0.08,
      });

      locoScrollRef.current = locoScroll;

      // ❗️Дочекайся першого "scroll" і тільки тоді активуй ScrollTrigger
      locoScroll.on("scroll", ScrollTrigger.update);

      // Дочекайся поки все промалюється
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
  }, []);

  useEffect(() => {
    if (scrollReady) {
      locoScrollRef.current?.update();
    }
  }, [scrollReady]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      locoScrollRef.current?.update();
      ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return <div data-scroll-container>{scrollReady ? children : null}</div>;
}
