type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?:
    | "primary"
    | "secondary"
    | "danger";
};

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
}: Props) {
  const background =
    variant === "primary"
      ? "var(--primary)"
      : variant ===
          "danger"
        ? "var(--danger)"
        : "var(--secondary)";

  return (
    <button
      type={type}
      onClick={onClick}
      className="
        w-full
        sm:w-auto
        rounded-2xl
        px-5
        py-3
        font-medium
        transition
      "
      style={{
        background,
        color: "#0f1412",
      }}
    >
      {children}
    </button>
  );
}