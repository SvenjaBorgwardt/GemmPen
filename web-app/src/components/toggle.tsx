"use client";

type ToggleProps = {
  on: boolean;
  onChange?: (next: boolean) => void;
  ariaLabel?: string;
};

export function Toggle({ on, onChange, ariaLabel }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={ariaLabel}
      onClick={() => onChange?.(!on)}
      className="relative shrink-0 cursor-pointer flex items-center justify-center"
      style={{
        width: "44px",
        height: "44px",
        border: "none",
        background: "transparent",
        padding: 0,
      }}
    >
      <span
        className="relative"
        style={{
          display: "block",
          width: "40px",
          height: "22px",
          borderRadius: "11px",
          background: on ? "var(--accent-gold)" : "#D6CFC4",
          transition: "background 150ms ease",
        }}
      >
        <span
          className="absolute"
          style={{
            width: "18px",
            height: "18px",
            borderRadius: "50%",
            background: "#fff",
            top: "2px",
            left: on ? "20px" : "2px",
            transition: "left 150ms ease",
            boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
          }}
        />
      </span>
    </button>
  );
}
