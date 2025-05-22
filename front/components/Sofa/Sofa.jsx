"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Sofa.module.css";

function Model({ isMobile }) {
  const gltf = useGLTF("/models/new.glb");
  const ref = useRef();
  gltf.scene.traverse((child) => {
    if (child.isMesh) {
      child.material.color.set("#333333");
      // child.material.roughness = 0.9;
    }
  });
  return (
    <primitive
      ref={ref}
      object={gltf.scene}
      position={[isMobile ? -1 : 0, isMobile ? -1 : 0, isMobile ? -3 : 0]}
    />
  );
}

gsap.registerPlugin(ScrollTrigger);

function CameraAnimation({ isMobile }) {
  const { camera } = useThree();

  const startPos = { x: 0, y: 1, z: 1.3 };
  const endPos = { x: 0.5, y: 1, z: 1.3 };

  useEffect(() => {
    // Встановити початкову позицію
    camera.position.set(startPos.x, startPos.y, startPos.z);

    // Початкова анімація
    gsap.to(camera.position, {
      x: endPos.x,
      y: endPos.y,
      z: endPos.z,
      duration: 2,
      ease: "power2.out",
    });

    gsap.to(camera.position, {
      z: isMobile ? 4 : 4,
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });
  }, [camera]);

  return null;
}

export default function Sofa() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
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
      className="ok"
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
