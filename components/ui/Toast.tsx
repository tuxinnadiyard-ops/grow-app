"use client";

type Props = {
  message: string;
  type?: "success" | "error";
};

export default function Toast({
  message,
  type = "success",
}: Props) {
  return (
    <div
      className={`
        fixed
        bottom-5
        right-5
        z-[999]
        animate-[fadeIn_.2s_ease]
        rounded-[24px]
        border
        px-5
        py-4
        shadow-2xl
        backdrop-blur
        transition
        ${
          type === "success"
            ? `
              border-green-500/20
              bg-green-500/10
              text-green-300
            `
            : `
              border-red-500/20
              bg-red-500/10
              text-red-300
            `
        }
      `}
    >
      <div className="flex items-center gap-3">
        <span className="text-lg">
          {type === "success"
            ? "✓"
            : "⚠"}
        </span>

        <p className="text-sm font-medium">
          {message}
        </p>
      </div>
    </div>
  );
}