"use client";

import React, { useRef, useEffect, useState } from "react";

export default function SofaCanvas() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const totalFrames = 66;
  const frameRate = 30;
  const frameBaseName = "Render Comp_";

  const framePath = (index) =>
    `/frames/mainImage/desktop/${frameBaseName}${String(index).padStart(
      5,
      "0"
    )}.webp`;

  const images = useRef([]);
  const [loaded, setLoaded] = useState(false);
  const frameIndex = useRef(0);

  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  // Завантажуємо кадри
  useEffect(() => {
    let loadedCount = 0;
    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      img.src = framePath(i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalFrames) {
          setLoaded(true);
        }
      };
      images.current.push(img);
    }
  }, []);

  // Встановлюємо розміри канваса при монтуванні та ресайзі
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setCanvasSize({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Програємо анімацію після завантаження
  useEffect(() => {
    if (!loaded) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;

    const ctx = canvas.getContext("2d");

    let animationFrameId;
    let lastTimestamp = 0;
    const frameDuration = 1000 / frameRate;

    const render = (timestamp) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const delta = timestamp - lastTimestamp;

      if (delta > frameDuration) {
        const img = images.current[frameIndex.current];
        if (img) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          const scale = Math.min(
            canvas.width / img.width,
            canvas.height / img.height
          );
          const w = img.width * scale;
          const h = img.height * scale;
          ctx.drawImage(
            img,
            (canvas.width - w) / 2,
            (canvas.height - h) / 2,
            w,
            h
          );
        }

        frameIndex.current++;

        if (frameIndex.current >= totalFrames) {
          cancelAnimationFrame(animationFrameId);
          return;
        }

        lastTimestamp = timestamp;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => cancelAnimationFrame(animationFrameId);
  }, [loaded, canvasSize]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 1,
      }}
    >
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        style={{
          display: loaded ? "block" : "none",
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}
