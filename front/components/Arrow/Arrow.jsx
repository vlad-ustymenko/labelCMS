import React from "react";

const Arrow = ({ direction, onClick, className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-chevron-left-icon lucide-chevron-${
        direction === "left" ? "left" : "right"
      } ${className}`}
      onClick={onClick}
    >
      {direction === "left" ? (
        <path d="m14 18-6-6 6-6" />
      ) : (
        <path d="m10 18 6-6-6-6" />
      )}
    </svg>
  );
};

export default Arrow;
