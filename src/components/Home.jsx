import { useNavigate } from "react-router-dom";
import { useCallback, useRef, useState } from "react";
import FloatingYesButton from "./FloatingYesButton";
import PhotoDropIn from "./PhotoDropIn";

function Home() {
  const navigate = useNavigate();

  const [photoUrl, setPhotoUrl] = useState(null);
  const [yesButtons, setYesButtons] = useState([]); // [{id,x,y,scale,rotate}]
  const idRef = useRef(0);
  const playfieldRef = useRef(null);

  const handleYes = useCallback(() => {
    try { navigator.vibrate?.(20); } catch {}
    navigate("/yes");
  }, [navigate]);

  // add exactly ONE yes button per "No" tap
 const handleNo = useCallback(() => {
  try { navigator.vibrate?.([10, 20]); } catch {}

  const w = window.innerWidth;
  const h = window.innerHeight;

  const PAD = 8;
  const BW = 200; // visual min-width we set in CSS
  const BH = 56;  // approximate height of .big button

  const minX = PAD, minY = PAD;
  const maxX = Math.max(minX, w - BW - PAD);
  const maxY = Math.max(minY, h - BH - PAD);

  const id = ++idRef.current;
  const x = Math.floor(minX + Math.random() * (maxX - minX + 1));
  const y = Math.floor(minY + Math.random() * (maxY - minY + 1));
  const scale  = 0.98 + Math.random() * 0.08;   // ~same size as main
  const rotate = -12 + Math.random() * 24;      // slight tilt

  setYesButtons(prev => [...prev, { id, x, y, scale, rotate }]);
}, []);


  return (
    <div className="home mobile-full">
      <div className="playfield" ref={playfieldRef}>
        <div className="card">
          <h1 className="title">Will you be my <em>girlfriend?</em></h1>
          <p className="subnote">pretty please 🥺✨</p>

          {photoUrl ? (
            <img src={photoUrl} alt="cute" className="hero-photo" />
          ) : (
            <img
              src="https://media.giphy.com/media/MDJ9IbxxvDUQM/giphy.gif"
              alt="Cute Cat"
              className="hero-photo"
            />
          )}

        </div>

        {/* floating-layer lives INSIDE the playfield and never blocks taps except on buttons */}
  {/* put this near the end, before or after <div className="bottom-bar"> */}
<div className="floating-viewport-layer">
  {yesButtons.map(btn => (
    <FloatingYesButton
      key={btn.id}
      x={btn.x}
      y={btn.y}
      scale={btn.scale}
      rotate={btn.rotate}
      onClick={handleYes}
    />
  ))}
</div>
      </div>

      <div className="bottom-bar">
        <button className="yes-btn big" onClick={handleYes}>Yes 💕</button>
        <button className="no-btn big" onClick={() => { for (let i = 0; i < 3; i++) { handleNo(); } }}>No 😔</button>
      </div>
    </div>
  );
}

export default Home;
