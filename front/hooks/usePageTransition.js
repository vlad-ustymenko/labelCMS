import { useTransitionRouter } from "next-view-transitions";

export const usePageTransition = () => {
  const router = useTransitionRouter();

  const animateTransition = (url) => {
    window.history.replaceState({ customState: true }, "", url);

    router.push(url, {
      onTransitionReady: () => {
        document.documentElement.animate(
          [
            { opacity: 1, scale: 1, transform: "translateY(0)" },
            { opacity: 0.2, scale: 0.8, transform: "translateY(-200px)" },
          ],
          {
            duration: 800,
            easing: "cubic-bezier(0.76, 0, 0.24, 1)",
            fill: "forwards",
            pseudoElement: "::view-transition-old(root)",
          }
        );

        document.documentElement.animate(
          [{ transform: "translateY(100%)" }, { transform: "translateY(0)" }],
          {
            duration: 700,
            easing: "cubic-bezier(0.76, 0, 0.24, 1)",
            fill: "forwards",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      },
    });
  };

  return animateTransition;
};
