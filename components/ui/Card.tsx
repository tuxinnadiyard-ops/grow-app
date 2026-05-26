type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Card({
  children,
  className = "",
}: Props) {
  return (
    <div
      className={`
        rounded-[var(--radius-card)]
        border
        p-5
        shadow-sm
        ${className}
      `}
      style={{
        background:
          "var(--card)",
        borderColor:
          "var(--border)",
      }}
    >
      {children}
    </div>
  );
}