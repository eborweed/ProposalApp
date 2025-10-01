import { useEffect, useRef } from "react";
import HeartsConfetti from "./HeartsConfetti";

function YesPage() {
  const confettiRef = useRef(null);

  // Extra celebrations: haptics + timed confetti waves
  useEffect(() => {
    try { navigator.vibrate?.([25, 50, 25]); } catch {}
    // gentle “waves” of confetti after mount
    const t1 = setTimeout(() => confettiRef.current?.(), 600);
    const t2 = setTimeout(() => confettiRef.current?.(), 1400);
    const t3 = setTimeout(() => confettiRef.current?.(), 2200);
    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
    };
  }, []);

  // Hook: let YesPage request extra confetti bursts
  const armConfetti = (fn) => { confettiRef.current = fn; };

  const handleShare = async () => {
    // Share API (best on mobile), graceful fallback
    const shareData = {
      title: "OMG YOU SAID YES 💗",
      text: "I knew it :p",
      url: typeof window !== "undefined" ? window.location.href : ""
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard?.writeText(shareData.url || "");
        alert("Link copied! ✨");
      }
    } catch { /* user cancelled; no-op */ }
  };

  return (
    <div className="yes-page">
      {/* Confetti controller (exposes a function) */}
      <HeartsConfetti onReady={armConfetti} />

      <div className="yes-wrap">
        <div className="yes-burst-emoji" aria-hidden>💖✨🎉</div>

        <h1 className="yes-title">
          <span className="spark">OMG YOU SAID YES 💗</span> <span className="heart">I knew it :p</span> <span className="yes-word"></span>
        </h1>

        <p className="yes-sub">I love you 🥹💕</p>

        <div className="yes-card">
          <img
            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGRyMzFlZjRubms0YTEyd2d1ZWZjNDFka3I1ajlmajR6dWZ2ZnBpayZlcD12MV9naWZzX3NlYXJjaCZjdD1n/F6PFPjc3K0CPe/giphy.gif"
            alt="Cute Cat"
            className="yes-gif"
          />

          <div className="yes-note">
            <p className="bigline">Awww 🎉💗</p>
            <p className="body">
              YAYYYYY! We're gonna make it work, I promise! <br />
            </p>
          </div>
        </div>

        <div className="yes-actions">
          <button className="yes-btn big" onClick={() => confettiRef.current?.()}>
            More confetti! 
          </button>
          <a className="no-btn big soft" href="/" role="button">
            Back to start ↩︎
          </a>
        </div>
      </div>
    </div>
  );
}

export default YesPage;
