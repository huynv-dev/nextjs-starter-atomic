import { useState } from "react";

export function useGuestCounter(initial = 1, min = 1, max = 10) {
  const [count, setCount] = useState(initial);
  const increment = () => setCount((c) => Math.min(c + 1, max));
  const decrement = () => setCount((c) => Math.max(c - 1, min));
  const update = (value: number) => {
    const valid = Math.max(min, Math.min(max, value));
    setCount(valid);
  };

  return { count, increment, decrement, update };
}
