import { useEffect, useRef, useState, useCallback } from "react";
import HeartsConfetti from "./HeartsConfetti";
import { sendEventEmail } from "../utils/email";

function YesPage() {
  const confettiRef = useRef(null);

  // Allow goal override via URL (?goal=80), default 50
  const goal = (() => {
    try {
      const q = new URLSearchParams(window.location.search);
      const g = Number(q.get("goal"));
      return Number.isFinite(g) && g > 0 ? g : 50;
    } catch {
      return 50;
    }
  })();

  const [loveCount, setLoveCount] = useState(() => {
    const saved = Number(localStorage.getItem("loveCount") || 0);
    return Number.isNaN(saved) ? 0 : saved;
  });

  // Persist count
  useEffect(() => {
    localStorage.setItem("loveCount", String(loveCount));
  }, [loveCount]);

  // Haptics + celebratory waves on enter
  useEffect(() => {
    try { navigator.vibrate?.([25, 50, 25]); } catch {}
    const t1 = setTimeout(() => confettiRef.current?.(), 600);
    const t2 = setTimeout(() => confettiRef.current?.(), 1400);
    const t3 = setTimeout(() => confettiRef.current?.(), 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  // Wire up confetti controller
  const armConfetti = (fn) => { confettiRef.current = fn; };

  const pct = Math.min(100, Math.round((loveCount / goal) * 100));
  const reached = loveCount >= goal;

  const incLove = useCallback(() => {
    setLoveCount((n) => {
      const next = n + 1;
      try { navigator.vibrate?.(10); } catch {}
      // little rewards along the way
      if (next % 5 === 0 || next === goal) confettiRef.current?.();
      // auto-email the moment she hits the goal (once)
      if (next === goal) {
        sendEventEmail({ event: "love-goal-reached", loveCount: next, page: "yes" });
      }
      return next;
    });
  }, [goal]);

  const emailUpdate = useCallback(() => {
    sendEventEmail({ event: "love-count-update", loveCount, page: "yes" });
    try { navigator.vibrate?.(18); } catch {}
  }, [loveCount]);

  return (
    <div className="yes-page">
      <HeartsConfetti onReady={armConfetti} />

      <div className="yes-wrap">
        <div className="yes-burst-emoji" aria-hidden>💖✨🎉</div>

        <h1 className="yes-title">
          <span className="spark">YAY!!!</span> <span className="heart">she said</span> <span className="yes-word">YES</span>
        </h1>

        <p className="yes-sub">my heart is doing backflips rn 🥹💕</p>

        <div className="yes-card">
          <img
            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGRyMzFlZjRubms0YTEyd2d1ZWZjNDFka3I1ajlmajR6dWZ2ZnBpayZlcD12MV9naWZzX3NlYXJjaCZjdD1n/F6PFPjc3K0CPe/giphy.gif"
            alt="Cute Cat"
            className="yes-gif"
          />

          <div className="yes-note">
            <p className="bigline">Awww 🎉💗</p>
            <p className="body">
              YAYYYYY! Thank you for saying yes — you just made my whole universe brighter.
              I promise: endless laughs, snacks, and forehead kisses. ✨
            </p>
          </div>
        </div>

        {/* GOAL BANNER */}
        <div className="goal-banner" role="status" aria-live="polite">
          <span className="goal-text">
            He loves you <strong>{goal}</strong> 💘
          </span>
          <span className={`goal-chip ${reached ? "done" : ""}`}>
            {reached ? "Goal reached!" : `${pct}% there`}
          </span>
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

        {/* LOVE COUNTER */}
        <div className="love-counter">
          <div className="love-count-display" aria-live="polite">
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

        {/* Back link only (no share/extra-confetti) */}
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
