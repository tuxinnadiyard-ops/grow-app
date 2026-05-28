/**
 * @deprecated
 *
 * Use:
 * className="btn-primary"
 * className="btn-secondary"
 * className="btn-danger"
 *
 * Legacy compatibility only.
 */

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
  return (
    <button
      type={type}
      onClick={onClick}
      className={
        variant ===
        "secondary"
          ? "btn-secondary"
          : variant ===
              "danger"
            ? "btn-danger"
            : "btn-primary"
      }
    >
      {children}
    </button>
  );
}