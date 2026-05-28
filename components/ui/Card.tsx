/**
 * @deprecated
 *
 * Use:
 * className="card"
 *
 * Legacy compatibility only.
 */

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
      className={`card ${className}`}
    >
      {children}
    </div>
  );
}