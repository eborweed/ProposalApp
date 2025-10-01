import { useRef } from "react";

/**
 * Simple mobile-friendly photo drop-in.
 * - Tap to choose a photo (camera or gallery)
 * - Sends a blob URL to parent via onChoose(url)
 */
export default function PhotoDropIn({ onChoose }) {
  const inputRef = useRef(null);

  const onFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    onChoose?.(url);
  };

  return (
    <div className="photo-dropin">
      <button
        className="photo-btn"
        onClick={() => inputRef.current?.click()}
        aria-label="Add a photo"
      >
        Add a photo 📷
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={onFile}
        style={{ display: "none" }}
      />
    </div>
  );
}
