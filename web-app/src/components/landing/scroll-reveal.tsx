"use client";

import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  as?: "div" | "section";
}

export function ScrollReveal({
  children,
  delay = 0,
  className = "",
  style,
  as: Tag = "div",
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          observer.unobserve(el);
        }
      },
      { threshold: 0.01, rootMargin: "0px 0px 80px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={className}
      style={{
        opacity: 0,
        transform: "translateY(16px)",
        transition: [
          `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
          `transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        ].join(", "),
        willChange: "opacity, transform",
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}
