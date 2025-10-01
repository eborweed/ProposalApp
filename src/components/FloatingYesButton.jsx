import { useEffect, useRef } from "react";

/**
 * Floating YES button that is the same size and style
 * as the main home-page Yes button.
 */
export default function FloatingYesButton({ x, y, scale = 1, rotate = 0, onClick }) {
  const wrapRef = useRef(null);

  // pop-in animation
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    el.animate(
      [
        {
          transform: `translate(${x}px, ${y}px) scale(${scale * 0.8}) rotate(${rotate}deg)`,
          opacity: 0
        },
        {
          transform: `translate(${x}px, ${y}px) scale(${scale}) rotate(${rotate}deg)`,
          opacity: 1
        }
      ],
      { duration: 220, easing: "cubic-bezier(.2,.9,.25,1)", fill: "forwards" }
    );
  }, [x, y, scale, rotate]);

  return (
    <div
      ref={wrapRef}
      className="floating-yes-wrap"
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        transform: `translate(${x}px, ${y}px) scale(${scale}) rotate(${rotate}deg)`
      }}
    >
      <button
        className="yes-btn big floating-yes"
        onClick={onClick}
      >
        Yes 💕
      </button>
    </div>
  );
}
