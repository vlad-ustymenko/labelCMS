// hooks/useDevice.js
import { useEffect, useState } from "react";

const breakpoints = {
  mobile: 0,
  tablet: 768,
  laptop: 1024,
  desktop: 1440,
};

const getDevice = (width) => {
  if (width < breakpoints.tablet) return "mobile";
  if (width < breakpoints.laptop) return "tablet";
  if (width < breakpoints.desktop) return "laptop";
  return "desktop";
};

export function useDevice() {
  const [device, setDevice] = useState(
    typeof window !== "undefined" ? getDevice(window.innerWidth) : "desktop"
  );

  useEffect(() => {
    const handleResize = () => setDevice(getDevice(window.innerWidth));
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    device,
    isMobile: device === "mobile",
    isTablet: device === "tablet",
    isLaptop: device === "laptop",
    isDesktop: device === "desktop",
  };
}
