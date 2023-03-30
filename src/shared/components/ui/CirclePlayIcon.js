import React from "react";
import "./CirclePlayIcon.css";

const CirclePlayIcon = ({className}) => {
  return (
    <div className={`circle ${className}`}>
      <svg
        width="8"
        height="10"
        viewBox="0 0 8 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        
      >
        <path
          d="M7.1875 4.67524C7.4375 4.81958 7.4375 5.18042 7.1875 5.32476L1.1875 8.78886C0.9375 8.9332 0.625001 8.75278 0.625001 8.4641L0.625001 1.5359C0.625001 1.24722 0.937501 1.0668 1.1875 1.21114L7.1875 4.67524Z"
          strokeWidth="1.25"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default CirclePlayIcon;
