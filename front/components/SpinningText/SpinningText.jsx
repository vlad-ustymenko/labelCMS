import React, { useEffect, useRef } from "react";
import SplitTextJS from "split-text-js";
import { gsap } from "gsap";
import styles from "./SpinningText.module.css";

const SpinningText = ({ textArray, className }) => {
  const spinningRef = useRef(null);
  const splitInstances = useRef([]);
  const tl = useRef();

  useEffect(() => {
    const container = spinningRef.current;
    if (!container) return;

    gsap.set(container, { opacity: 1 });

    const titles = container.querySelectorAll("p");

    tl.current = gsap.timeline({ repeat: -1 });

    titles.forEach((title) => {
      const split = new SplitTextJS(title);
      splitInstances.current.push(split);

      tl.current
        .from(
          split.chars,
          {
            opacity: 0,
            y: 20,
            rotateX: -90,
            stagger: 0.1,
            duration: 0.6,
          },
          "<0.1"
        )
        .to(
          split.chars,
          {
            opacity: 0,
            y: -20,
            rotateX: 90,
            stagger: 0.1,
            duration: 0.6,
          },
          "+=1"
        );
    });

    return () => {
      tl.current?.kill();
    };
  }, []);

  return (
    <div className={className} ref={spinningRef}>
      {textArray.map((text, index) => (
        <p key={index} className={styles.text}>
          {text}
        </p>
      ))}
    </div>
  );
};

export default SpinningText;
