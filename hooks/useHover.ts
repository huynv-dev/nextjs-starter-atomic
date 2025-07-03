import { useState } from "react";

// Hook để xử lý hover state
export const useHover = () => {
  const [isHovered, setIsHovered] = useState(false);
  return {
    isHovered,
    bind: {
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
    },
  };
};