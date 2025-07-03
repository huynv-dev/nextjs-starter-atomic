import React from 'react';

export function VerifiedIcon({ className = "", size = 16, color = "white" }) {
  return (
    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        aria-label="Đã xác minh danh tính"
        role="img"
        focusable="false"
        style={{
          display: 'block',
          height: `${size}px`,
          width: `${size}px`,
          fill: color,
        }}
        className="drop-shadow-sm"
      >
        <path d="m16 .8.56.37C20.4 3.73 24.2 5 28 5h1v12.5C29 25.57 23.21 31 16 31S3 25.57 3 17.5V5h1c3.8 0 7.6-1.27 11.45-3.83L16 .8zm7 9.08-9.5 9.5-4.5-4.5L6.88 17l6.62 6.62L25.12 12 23 9.88z" />
      </svg>
    </div>
  );
}


export default function VerifiedIconWrapper() {
  return (
    <div className="w-8 h-8 bg-[#E41C5E] rounded-full absolute bottom-0 right-0 flex items-center justify-center">
      <VerifiedIcon size={12} />
    </div>
  );
}

