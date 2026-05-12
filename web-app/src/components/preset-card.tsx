type PresetCardProps = {
  icon: string;
  name: string;
  description: string;
  selected?: boolean;
  onClick?: () => void;
};

export function PresetCard({
  icon,
  name,
  description,
  selected,
  onClick,
}: PresetCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-center cursor-pointer"
      style={{
        background: "var(--bg-card)",
        border: selected
          ? "0.5px solid var(--accent-gold)"
          : "0.5px solid var(--border-color)",
        boxShadow: selected ? "0 0 0 1.5px var(--accent-gold)" : "none",
        borderRadius: "var(--radius-card)",
        padding: "1.125rem 1rem",
        transition: "border-color 0.15s, box-shadow 0.15s",
        display: "block",
        width: "100%",
      }}
    >
      <span
        className="block"
        style={{
          fontSize: "1.5rem",
          marginBottom: "0.5rem",
          color: "var(--accent-gold)",
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontWeight: 600,
        }}
      >
        {icon}
      </span>
      <div
        style={{
          fontSize: "0.8125rem",
          fontWeight: 600,
          color: "var(--text-primary)",
          marginBottom: "0.25rem",
        }}
      >
        {name}
      </div>
      <div
        style={{
          fontSize: "0.6875rem",
          color: "var(--text-muted)",
          lineHeight: 1.4,
        }}
      >
        {description}
      </div>
    </button>
  );
}
