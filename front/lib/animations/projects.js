import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Генерує fromVars для анімації картки проекту
 */
const getFromVars = (index, { isMobile, isTablet, isLargeDesktop }) => {
  let fromVars = { opacity: 0, x: 0, rotateZ: 0, scale: 1 };

  if (isMobile || isTablet || isLargeDesktop) {
    const columns = isLargeDesktop ? 4 : 2;
    const col = index % columns;
    const isLeft = col < columns / 2;
    fromVars.x = isLeft ? -100 : 100;
    fromVars.rotateZ = isLeft ? -10 : 10;
  } else {
    const col = index % 3;
    fromVars.x = col === 0 ? -100 : col === 2 ? 100 : 0;
    fromVars.rotateZ = col === 0 ? -10 : col === 2 ? 10 : 0;
    fromVars.scale = col === 1 ? 0.7 : 1;
  }

  return fromVars;
};

/**
 * Налаштовує анімації для карток проектів
 */
export const setupProjectsAnimation = (cards, conditions, scroller) => {
  const triggers = [];

  cards.forEach((card, index) => {
    if (!card) return;

    const fromVars = getFromVars(index, conditions);
    const toVars = {
      opacity: 1,
      x: 0,
      rotateZ: 0,
      scale: 1,
      duration: 1,
      ease: "power3.out",
    };

    const animation = gsap.fromTo(card, fromVars, { ...toVars, paused: true });

    const trigger = ScrollTrigger.create({
      trigger: card,
      scroller,
      start: "top 90%",
      end: "bottom 10%",
      onEnter: () => animation.play(),
      onLeave: () => animation.reverse(),
      onEnterBack: () => animation.play(),
      onLeaveBack: () => animation.reverse(),
    });

    triggers.push(trigger);
  });

  return triggers;
};
