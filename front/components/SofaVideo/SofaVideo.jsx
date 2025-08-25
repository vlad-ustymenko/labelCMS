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
      {/* <video autoplay muted playsinline>
        <source
          src="video_1080p.webm"
          type="video/webm"
          media="(min-width: 1200px)"
        />
        <source
          src="video_720p.webm"
          type="video/webm"
          media="(min-width: 768px)"
        />
        <source
          src="video_480p.webm"
          type="video/webm"
          media="(max-width: 767px)"
        />

        <source
          src="video_1080p.mp4"
          type="video/mp4"
          media="(min-width: 1200px)"
        />
        <source
          src="video_720p.mp4"
          type="video/mp4"
          media="(min-width: 768px)"
        />
        <source
          src="video_480p.mp4"
          type="video/mp4"
          media="(max-width: 767px)"
        />
      </video> */}
    </div>
  );
}
