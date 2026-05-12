type Variant = "review" | "table" | "pdf";

type ScoreBarProps = {
  score: number;
  maxScore: number;
  color: string;
  variant?: Variant;
  potentialPercent?: number;
};

export function ScoreBar({
  score,
  maxScore,
  color,
  variant = "table",
  potentialPercent,
}: ScoreBarProps) {
  const percent = Math.max(0, Math.min(100, (score / maxScore) * 100));

  if (variant === "review") {
    return (
      <div
        className="relative"
        style={{
          width: "120px",
          height: "6px",
          background: "var(--score-bar-bg)",
          borderRadius: "3px",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${percent}%`,
            background: color,
            borderRadius: "3px",
          }}
        />
        <div
          className="absolute"
          style={{
            top: "-4px",
            left: `calc(${percent}% - 7px)`,
            width: "14px",
            height: "14px",
            borderRadius: "50%",
            background: color,
            border: "2px solid #fff",
            boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
            cursor: "default",
          }}
        />
      </div>
    );
  }

  if (variant === "pdf") {
    return (
      <div
        className="relative w-full"
        style={{
          height: "5px",
          background: "var(--score-bar-bg)",
          borderRadius: "3px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${percent}%`,
            background: color,
            borderRadius: "3px",
          }}
        />
        {potentialPercent !== undefined && potentialPercent > 0 && (
          <div
            className="absolute top-0"
            style={{
              left: `${percent}%`,
              width: `${potentialPercent}%`,
              height: "100%",
              background: `repeating-linear-gradient(90deg, ${color}40 0px, ${color}40 3px, transparent 3px, transparent 6px)`,
              borderRadius: "3px",
            }}
          />
        )}
      </div>
    );
  }

  return (
    <div
      className="w-full"
      style={{
        height: "5px",
        background: "var(--score-bar-bg)",
        borderRadius: "3px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${percent}%`,
          background: color,
          borderRadius: "3px",
        }}
      />
    </div>
  );
}
