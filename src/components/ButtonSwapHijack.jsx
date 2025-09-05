import { useEffect, useRef, useState } from "react";

/**
 * Renders two absolutely-positioned "ghost" buttons that animate
 * from their original positions to each other's positions along
 * a cute arcing path (quadratic Bézier).
 *
 * While this runs, the real buttons are hidden (visibility: hidden).
 * When finished, onDone() is called so the real buttons can be swapped.
 */
export default function ButtonSwapHijack({ yesRect, noRect, onDone }) {
  const [yesPos, setYesPos] = useState({
    x: yesRect.left,
    y: yesRect.top,
    w: yesRect.width,
    h: yesRect.height,
  });
  const [noPos, setNoPos] = useState({
    x: noRect.left,
    y: noRect.top,
    w: noRect.width,
    h: noRect.height,
  });

  const rafRef = useRef(null);

  useEffect(() => {
    // centers
    const p0Yes = {
      x: yesRect.left + yesRect.width / 2,
      y: yesRect.top + yesRect.height / 2,
    };
    const p2Yes = {
      x: noRect.left + noRect.width / 2,
      y: noRect.top + noRect.height / 2,
    };

    const p0No = {
      x: noRect.left + noRect.width / 2,
      y: noRect.top + noRect.height / 2,
    };
    const p2No = {
      x: yesRect.left + yesRect.width / 2,
      y: yesRect.top + yesRect.height / 2,
    };

    // control points to create a nice arc (one up, one down)
    const cpYes = {
      x: (p0Yes.x + p2Yes.x) / 2,
      y: Math.min(p0Yes.y, p2Yes.y) - 120,
    };
    const cpNo = {
      x: (p0No.x + p2No.x) / 2,
      y: Math.max(p0No.y, p2No.y) + 120,
    };

    const duration = 700; // ms
    const start = performance.now();

    const easeInOut = (t) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const bez = (t, P0, P1, P2) => {
      const u = 1 - t;
      const x = u * u * P0.x + 2 * u * t * P1.x + t * t * P2.x;
      const y = u * u * P0.y + 2 * u * t * P1.y + t * t * P2.y;
      return { x, y };
    };

    const step = (now) => {
      const raw = Math.min(1, (now - start) / duration);
      const t = easeInOut(raw);

      const yCurve = bez(t, p0Yes, cpYes, p2Yes);
      const nCurve = bez(t, p0No, cpNo, p2No);

      setYesPos((prev) => ({
        ...prev,
        x: yCurve.x - yesRect.width / 2,
        y: yCurve.y - yesRect.height / 2,
      }));
      setNoPos((prev) => ({
        ...prev,
        x: nCurve.x - noRect.width / 2,
        y: nCurve.y - noRect.height / 2,
      }));

      if (raw < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        onDone?.();
      }
    };

    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yesRect, noRect]);

  return (
    <>
      {/* click-blocking overlay during swap */}
      <div className="swap-overlay" />

      {/* “Ghost” Yes button */}
      <div
        className="btn-ghost yes-btn"
        style={{
          position: "fixed",
          left: yesPos.x,
          top: yesPos.y,
          width: yesPos.w,
          height: yesPos.h,
          zIndex: 10000,
          display: "grid",
          placeItems: "center",
          pointerEvents: "none",
        }}
      >
        Yes ☺️
      </div>

      {/* “Ghost” No button */}
      <div
        className="btn-ghost no-btn"
        style={{
          position: "fixed",
          left: noPos.x,
          top: noPos.y,
          width: noPos.w,
          height: noPos.h,
          zIndex: 10000,
          display: "grid",
          placeItems: "center",
          pointerEvents: "none",
        }}
      >
        No 🥺
      </div>
    </>
  );
}
