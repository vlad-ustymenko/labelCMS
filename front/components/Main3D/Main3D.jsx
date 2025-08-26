"use client";

import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useThree } from "@react-three/fiber";
import { useRef } from "react";
import { useGLTF } from "@react-three/drei";

gsap.registerPlugin(ScrollTrigger);

function Model({ isMobile }) {
  const gltf = useGLTF("/models/new.glb");
  const ref = useRef();

  gltf.scene.traverse((child) => {
    if (child.isMesh) {
      child.material.color.set("#333333");
    }
  });

  return (
    <primitive
      ref={ref}
      object={gltf.scene}
      position={[isMobile ? 0 : 0, isMobile ? -0.5 : 0, isMobile ? -1 : 0]}
    />
  );
}

function CameraAnimation({ isMobile }) {
  const { camera } = useThree();
  const startPos = { x: 0, y: 1, z: 1.3 };
  const endPos = { x: 0.5, y: 1, z: 1.3 };

  useEffect(() => {
    camera.position.set(startPos.x, startPos.y, startPos.z);

    gsap.to(camera.position, {
      x: endPos.x,
      y: endPos.y,
      z: endPos.z,
      duration: 2,
      ease: "power2.out",
    });

    gsap.to(camera.position, {
      z: isMobile ? 10 : 4,
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        scroller: isMobile ? "body" : "[data-scroll-container]",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });
  }, [camera, isMobile]);

  return null;
}

export default function Main3D() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // доступний тільки на клієнті
    setIsMobile(window.innerWidth < 768);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: "0",
        left: "0",
        zIndex: "1",
      }}
    >
      <Canvas camera={{ position: [0.5, 1, 1.3], fov: 50 }}>
        <CameraAnimation isMobile={isMobile} />
        <ambientLight intensity={0.3} />
        <directionalLight position={[1, 2, 3]} intensity={0.2} />
        <OrbitControls enableZoom={false} enableRotate={false} />
        <Environment preset="city" />
        <Model isMobile={isMobile} />
      </Canvas>
    </div>
  );
}
