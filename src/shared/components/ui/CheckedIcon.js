import React from "react";
import "./CheckedIcon.css"

const CheckedIcon = ({ className }) => {
  return (
    <div className={`checked-icon ${className}`}>
      <svg
        width="18"
        height="13"
        viewBox="0 0 18 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M1 6.65803L6.22832 12L17 1"
          // stroke="#00D096"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default CheckedIcon;
