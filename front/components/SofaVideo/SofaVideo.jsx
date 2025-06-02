"use client";
import styles from "./SofaVideo.module.css";

export default function SofaCanvas() {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 1,
      }}
    >
      <video
        className={styles.video}
        autoPlay
        muted
        playsInline
        src="/video/Main.webm"
      />
    </div>
  );
}
