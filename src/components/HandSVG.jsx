function HandSVG({ style }) {
  return (
    <svg
      style={style}
      width="60"
      height="60"
      viewBox="0 0 24 24"
      fill="peachpuff"
      stroke="black"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 11V5a2 2 0 0 1 4 0v6" />
      <path d="M13 11V3a2 2 0 0 1 4 0v8" />
      <path d="M17 11V6a2 2 0 0 1 4 0v5c0 7-4 9-8 9H9c-4 0-8-2-8-9V9a2 2 0 0 1 4 0v2" />
    </svg>
  );
}

export default HandSVG;
