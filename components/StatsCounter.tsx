'use client';

import { useEffect, useRef, useState } from 'react';

interface StatItem {
  value: number;
  label: string;
  suffix?: string;
}

interface StatsCounterProps {
  stats?: StatItem[];
  end?: number;
  prefix?: string;
  suffix?: string;
  speed?: string;
}

function CountUpNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated.current) {
        hasAnimated.current = true;
        const duration = 2000; // 2 seconds
        const steps = 60;
        const increment = value / steps;
        let current = 0;

        const interval = setInterval(() => {
          current += increment;
          if (current >= value) {
            setCount(value);
            clearInterval(interval);
          } else {
            setCount(Math.floor(current));
          }
        }, duration / steps);

        return () => clearInterval(interval);
      }
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-bold text-blue-600">
      {count.toLocaleString()}
      {suffix}
    </div>
  );
}

function SingleCounter({ end = 0, prefix = '', suffix = '', speed = 'medium-fast' }: { end?: number; prefix?: string; suffix?: string; speed?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated.current) {
        hasAnimated.current = true;
        const duration = speed === 'fast' ? 1000 : speed === 'medium-fast' ? 2000 : 3000;
        const steps = 60;
        const increment = end / steps;
        let current = 0;

        const interval = setInterval(() => {
          current += increment;
          if (current >= end) {
            setCount(end);
            clearInterval(interval);
          } else {
            setCount(Math.floor(current));
          }
        }, duration / steps);

        return () => clearInterval(interval);
      }
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [end, speed]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

export default function StatsCounter({ stats, end, prefix, suffix, speed }: StatsCounterProps) {
  // Single-counter mode (used in HomeClient hero value rows)
  if (end !== undefined) {
    return <SingleCounter end={end} prefix={prefix} suffix={suffix} speed={speed} />;
  }

  // Grid mode with stats array
  if (!stats || !Array.isArray(stats)) {
    return null;
  }

  return (
    <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
      {stats.map((stat, idx) => (
        <div key={idx} className="text-center">
          <CountUpNumber value={stat.value} suffix={stat.suffix} />
          <p className="text-gray-600 mt-2 text-sm md:text-base font-semibold">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}
