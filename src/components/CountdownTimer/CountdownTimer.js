import { useState, useEffect } from "react";

// Countdown timer which takes the start time and decrement it by 1 value and after each second.
const CountdownTimer = ({ time }) => {
  const diff =  time - Math.floor(new Date().getTime()/1000);
  
  const [timeLeft, setTimeLeft] = useState(diff);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(diff - 1 <= 0 ? "Times Up!" : diff - 1);
    }, 1000);
  
    return () => clearTimeout(timer);
  });
  
  return timeLeft;
}

export default CountdownTimer;
