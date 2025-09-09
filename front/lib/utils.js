export const getHighlightedText = (title, highlight, highlightClass) => {
  if (!highlight || !title.includes(highlight)) return title;

  const parts = title.split(new RegExp(`(${highlight})`, "gi"));
  return parts.map((part, index) =>
    part.toLowerCase() === highlight.toLowerCase() ? (
      <span key={index} className={highlightClass}>
        {part}
      </span>
    ) : (
      part
    )
  );
};
