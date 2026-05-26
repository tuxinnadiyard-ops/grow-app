type Props = {
  children: React.ReactNode;
};

export default function Container({
  children,
}: Props) {
  return (
    <div
      className="
        mx-auto
        w-full
        max-w-5xl
        px-4
        py-6
      "
    >
      {children}
    </div>
  );
}