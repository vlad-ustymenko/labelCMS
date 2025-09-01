import { useTransitionRouter } from "next-view-transitions";

export const usePageTransition = () => {
  const router = useTransitionRouter();

  const animateTransition = (url) => {
    const animate = () => {
      document.documentElement.animate(
        [
          { opacity: 1, transform: "translateY(0) scale(1)" },
          { opacity: 0, transform: "translateY(-200px) scale(0.8)" },
        ],
        {
          duration: 800,
          easing: "cubic-bezier(0.76, 0, 0.24, 1)",
          fill: "forwards",
          pseudoElement: "::view-transition-old(root)",
        }
      );
      document.documentElement.animate(
        [
          { opacity: 0, transform: "translateY(100%) scale(0.5)" },
          { opacity: 1, transform: "translateY(0) scale(1)" },
        ],
        {
          duration: 700,
          easing: "cubic-bezier(0.76, 0, 0.24, 1)",
          fill: "forwards",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    };
    router.push(url, { onTransitionReady: animate });
  };

  return animateTransition;
};
