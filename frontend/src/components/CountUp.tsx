import React, { useState, useEffect, useRef } from 'react';

interface CountUpProps {
  target: number;
  suffix?: string;
  duration?: number;
}

export const CountUp: React.FC<CountUpProps> = ({ target, suffix = "", duration = 2000 }) => {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let startTimestamp: number | null = null;
        const step = (timestamp: number) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          setVal(Math.floor(progress * target));
          if (progress < 1) {
            requestAnimationFrame(step);
          }
        };
        requestAnimationFrame(step);
        observer.disconnect();
      }
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
};
