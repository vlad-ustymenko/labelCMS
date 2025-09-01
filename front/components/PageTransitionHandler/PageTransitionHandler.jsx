"use client";
import { useEffect, useRef, useMemo } from "react";
import { usePathname } from "next/navigation";
import { useSelectedLayoutSegments } from "next/navigation";
import { useRouter } from "next/navigation";
import { usePageTransition } from "../../hooks/usePageTransition";

const PageTransitionHandler = () => {
  const pathname = usePathname();
  const animateTransition = usePageTransition();
  const segments = useSelectedLayoutSegments();

  // Склеюємо query

  useEffect(() => {
    const handlePopState = () => {
      const currentPath = "/" + segments.join("/");
      console.log(currentPath);
      // animateTransition(currentPath);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [pathname]);
  // const router = useRouter();
  // const back = router.back;
  // const animateTransition = usePageTransition();

  // useEffect(() => {
  //   if (prevPath.current !== pathname) {
  //     animateTransition(pathname);
  //   }
  // }, [pathname]);

  // return null;
};

export default PageTransitionHandler;
