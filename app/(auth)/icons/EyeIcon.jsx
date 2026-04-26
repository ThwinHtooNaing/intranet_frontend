import React from "react";

export default function EyeIcon({ size = 18, color = "currentColor" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill={color}
      viewBox="0 0 24 24"
    >
      <path d="M12 4.5C7.8 4.5 3.69 7.67 2 12c1.69 4.33 5.8 7.5 10 7.5s8.31-3.17 10-7.5c-1.69-4.33-5.8-7.5-10-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
    </svg>
  );
}
