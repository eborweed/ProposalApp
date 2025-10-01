import { useEffect, useRef, useState, useCallback } from "react";
import HeartsConfetti from "./HeartsConfetti";
import { sendEventEmail } from "../utils/email";

function YesPage() {
  const confettiRef = useRef(null);

  const [loveCount, setLoveCount] = useState(() => {
    const saved = Number(localStorage.getItem("loveCount") || 0);
    return Number.isNaN(saved) ? 0 : saved;
  });

  const [goal, setGoal] = useState(() => {
    const savedGoal = Number(localStorage.getItem("loveGoal") || 50);
    return Number.isNaN(savedGoal) ? 50 : savedGoal;
  });

  // Persist values
  useEffect(() => {
    localStorage.setItem("loveCount", String(loveCount));
  }, [loveCount]);
  useEffect(() => {
    localStorage.setItem("loveGoal", String(goal));
  }, [goal]);

  // Enter celebration
  useEffect(() => {
    try { navigator.vibrate?.([25, 50, 25]); } catch {}
    const t1 = setTimeout(() => confettiRef.current?.(), 600);
    const t2 = setTimeout(() => confettiRef.current?.(), 1400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const armConfetti = (fn) => { confettiRef.current = fn; };

  const pct = Math.min(100, Math.round((loveCount / goal) * 100));

  const incLove = useCallback(() => {
    setLoveCount((n) => {
      const next = n + 1;

      // If reached or exceeded the goal → bump the goal upward
      if (next >= goal) {
        setGoal((g) => g + 1);
        confettiRef.current?.();
      } else if (next % 5 === 0) {
        // smaller reward every 5 taps
        confettiRef.current?.();
      }

      try { navigator.vibrate?.(10); } catch {}
      return next;
    });
  }, [goal]);

  const emailUpdate = useCallback(() => {
    sendEventEmail({ event: "love-count-update", loveCount, goal, page: "yes" });
    try { navigator.vibrate?.(18); } catch {}
  
  alert("He has been notified 💌");
  }, [loveCount, goal]);

  return (
    <div className="yes-page">
      <HeartsConfetti onReady={armConfetti} />

      <div className="yes-wrap">
        <h1 className="yes-title">
          <span className="spark">YAY!!!</span> <span className="heart">she said</span> <span className="yes-word">YES</span>
        </h1>

        {/* GOAL DISPLAY */}
        <div className="goal-banner">
          <span className="goal-text">
            He loves you <strong>{goal}</strong> 💘
          </span>
          <span className="goal-chip">{pct}% there</span>
        </div>

        {/* PROGRESS BAR */}
        <div className="love-progress">
          <div className="love-bar">
            <div className="love-fill" style={{ width: `${pct}%` }} />
            <div className="love-marker" style={{ left: `${pct}%` }} aria-hidden>💗</div>
          </div>
          <div className="love-ticks">
            <span>0</span><span>{goal}</span>
          </div>
        </div>

        {/* COUNTER */}
        <div className="love-counter">
          <div className="love-count-display">
            <span className="love-count-number">{loveCount}</span>
            <span className="love-count-label">I love yous</span>
          </div>

          <div className="love-actions two">
            <button className="yes-btn big love-btn" onClick={incLove}>
              I love you this much 💗
            </button>
            <button className="yes-btn ghost big love-share" onClick={emailUpdate}>
              Tell him 💌
            </button>
          </div>
        </div>

        <div className="yes-actions solo">
          <a className="no-btn big soft" href="/" role="button">
            Back to start ↩︎
          </a>
        </div>
      </div>
    </div>
  );
}

export default YesPage;
