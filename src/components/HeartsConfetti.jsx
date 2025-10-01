import { useEffect } from "react";
import confetti from "canvas-confetti";

/**
 * Renders nothing; fires an initial heart-confetti burst on mount,
 * and calls onReady(fn) with a function you can call for more bursts.
 */
export default function HeartsConfetti({ onReady }) {
  useEffect(() => {
    const shoot = () => {
      confetti({
        particleCount: 160,
        spread: 110,
        scalar: 1.2,
        ticks: 200,
        shapes: ["heart"],
        origin: { y: 0.55 }
      });
    };
    // initial pop
    shoot();
    // expose controller
    onReady?.(shoot);
  }, [onReady]);

  return null;
}
