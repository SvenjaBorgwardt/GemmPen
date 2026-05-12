"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";

export function FlowLines({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [paths, setPaths] = useState<string[]>([]);

  useEffect(() => {
    function measure() {
      const el = ref.current;
      if (!el) return;
      const cards = el.querySelectorAll("[data-step]");
      if (cards.length < 4) return;

      const cr = el.getBoundingClientRect();
      const pos = Array.from(cards).map((card) => {
        const r = card.getBoundingClientRect();
        return {
          cx: r.left + r.width / 2 - cr.left,
          cy: r.top + r.height / 2 - cr.top,
          top: r.top - cr.top,
          bottom: r.bottom - cr.top,
          left: r.left - cr.left,
          right: r.right - cr.left,
        };
      });

      // Card 3 bottom-center --> down --> right to card 4 RIGHT side
      const c3bx = pos[2].cx;
      const c3by = pos[2].bottom + 4;
      const c4rx = pos[3].right + 4;
      const c4ry = pos[3].cy;
      const p1 = `M ${c3bx} ${c3by} L ${c3bx} ${c4ry} L ${c4rx} ${c4ry}`;

      // Card 4 LEFT side --> left --> up to card 1 bottom-center
      const c4lx = pos[3].left - 4;
      const c4ly = pos[3].cy;
      const c1bx = pos[0].cx;
      const c1by = pos[0].bottom + 4;
      const p2 = `M ${c4lx} ${c4ly} L ${c1bx} ${c4ly} L ${c1bx} ${c1by}`;

      setPaths([p1, p2]);
    }

    // Small delay to ensure layout is settled
    const timer = setTimeout(measure, 50);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      {children}
      {paths.length > 0 && (
        <svg
          className="hidden md:block"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            overflow: "visible",
          }}
          aria-hidden
        >
          <defs>
            <marker
              id="arrowDot"
              viewBox="0 0 6 6"
              refX="3"
              refY="3"
              markerWidth="6"
              markerHeight="6"
            >
              <circle cx="3" cy="3" r="2.5" fill="var(--accent-gold)" opacity="0.5" />
            </marker>
          </defs>
          <style>{`
            @keyframes flowDash {
              to { stroke-dashoffset: -20; }
            }
            .flow-line {
              animation: flowDash 1.8s linear infinite;
            }
          `}</style>
          {paths.map((d, i) => (
            <path
              key={i}
              className="flow-line"
              d={d}
              stroke="var(--accent-gold)"
              strokeWidth="1.5"
              strokeDasharray="6 4"
              fill="none"
              opacity="0.3"
              markerEnd="url(#arrowDot)"
              style={{ animationDelay: i === 1 ? "0.9s" : "0s" }}
            />
          ))}
        </svg>
      )}
    </div>
  );
}
