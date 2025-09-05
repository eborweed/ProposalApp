import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import ButtonSwapHijack from "./ButtonSwapHijack";

function Home() {
  const navigate = useNavigate();
  const [isSwapped, setIsSwapped] = useState(false);
  const [swapRects, setSwapRects] = useState(null); // { yesRect, noRect }
  const yesRef = useRef(null);
  const noRef = useRef(null);

  const handleYes = () => navigate("/yes");

  const handleNo = () => {
    const yesEl = yesRef.current;
    const noEl = noRef.current;
    if (!yesEl || !noEl) return;

    // get current positions/sizes
    const yesRect = yesEl.getBoundingClientRect();
    const noRect = noEl.getBoundingClientRect();

    // hide originals during animation
    yesEl.style.visibility = "hidden";
    noEl.style.visibility = "hidden";
    document.body.classList.add("swap-active");

    setSwapRects({ yesRect, noRect });
  };

  // after animation: actually swap, unhide originals
  const completeSwap = () => {
    setIsSwapped((s) => !s);
    // Unhide originals and clear overlay
    if (yesRef.current) yesRef.current.style.visibility = "";
    if (noRef.current) noRef.current.style.visibility = "";
    document.body.classList.remove("swap-active");
    setSwapRects(null);
  };

  // order the buttons based on isSwapped
  const buttons = (
    <>
      <button ref={yesRef} className="yes-btn" onClick={handleYes}>
        Yes ☺️
      </button>
      <button ref={noRef} className="no-btn" onClick={handleNo}>
        No 🥺
      </button>
    </>
  );

  const swappedButtons = (
    <>
      <button ref={noRef} className="no-btn" onClick={handleNo}>
        No 🥺
      </button>
      <button ref={yesRef} className="yes-btn" onClick={handleYes}>
        Yes ☺️
      </button>
    </>
  );

  return (
    <div className="home">
      <h1>May I be your boyfriend?</h1>

      <img
        src="https://media.giphy.com/media/MDJ9IbxxvDUQM/giphy.gif"
        alt="Cute Cat"
        className="center-gif"
      />

      <div className="buttons">{isSwapped ? swappedButtons : buttons}</div>

      {swapRects && (
        <ButtonSwapHijack
          yesRect={swapRects.yesRect}
          noRect={swapRects.noRect}
          onDone={completeSwap}
        />
      )}
    </div>
  );
}

export default Home;
