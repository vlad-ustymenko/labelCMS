import { useState, useEffect } from "react";

function isAppleDevice() {
  if (typeof navigator === "undefined") return false;

  const ua = navigator.userAgent || "";
  const platform = navigator.platform || "";

  const isIOS = /iPhone|iPad|iPod/i.test(ua);
  const isMac = /MacIntel/.test(platform) && navigator.maxTouchPoints > 1;

  return isIOS || isMac;
}

function canPlayWebmAlpha() {
  if (typeof document === "undefined") return false;
  const video = document.createElement("video");
  return video.canPlayType("video/webm") !== "";
}

export function useWebmSupport() {
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    const apple = isAppleDevice();
    const webm = canPlayWebmAlpha();
    setIsSupported(!apple && webm);
  }, []);

  return isSupported;
}
