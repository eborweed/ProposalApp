import { useEffect } from "react";
import confetti from "canvas-confetti";

function HeartsConfetti() {
  useEffect(() => {
    confetti({
      particleCount: 200,
      spread: 120,
      shapes: ["heart"],
      origin: { y: 0.6 },
    });
  }, []);

  return null;
}

export default HeartsConfetti;
