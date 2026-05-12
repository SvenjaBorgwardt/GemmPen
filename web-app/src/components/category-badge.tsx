type CategoryBadgeProps = {
  label: string;
  bgColor?: string;
  textColor?: string;
  children?: React.ReactNode;
};

export function CategoryBadge({
  label,
  bgColor = "var(--badge-bg)",
  textColor = "var(--badge-text)",
  children,
}: CategoryBadgeProps) {
  return (
    <span
      className="inline-flex items-center"
      style={{
        fontSize: "0.6875rem",
        fontWeight: 500,
        padding: "0.1875rem 0.625rem",
        borderRadius: "12px",
        background: bgColor,
        color: textColor,
        gap: "0.3125rem",
      }}
    >
      {children ?? label}
    </span>
  );
}
