type Props = {
  open: boolean;
  strain: string;
  setStrain: (
    value: string
  ) => void;
  creatingRun: boolean;
  onClose: () => void;
  onStart: () => void;
};

export default function StartCultivationModal({
  open,
  strain,
  setStrain,
  creatingRun,
  onClose,
  onStart,
}: Props) {
  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="fixed inset-x-4 top-1/2 z-50 mx-auto w-full max-w-md -translate-y-1/2">
        <div className="card rounded-[32px] p-6 shadow-2xl">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-4xl">
              🌿
            </div>

            <h2 className="text-3xl font-semibold">
              Start cultivation
            </h2>
          </div>

          <div className="space-y-4">
            <input
              placeholder="Gelato"
              value={strain}
              onChange={(e) =>
                setStrain(
                  e.target.value
                )
              }
            />

            <div className="flex gap-3">
              <button
                className="btn-secondary flex-1"
                onClick={onClose}
              >
                Cancel
              </button>

              <button
                className="btn-primary flex-1"
                onClick={onStart}
                disabled={
                  creatingRun
                }
              >
                {creatingRun
                  ? "Starting..."
                  : "Start cultivation"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}