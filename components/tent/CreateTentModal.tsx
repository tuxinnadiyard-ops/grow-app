type Props = {
  open: boolean;
  tentName: string;
  setTentName: (
    value: string
  ) => void;
  surfaceM2: string;
  setSurfaceM2: (
    value: string
  ) => void;
  creatingTent: boolean;
  onClose: () => void;
  onCreate: () => void;
};

export default function CreateTentModal({
  open,
  tentName,
  setTentName,
  surfaceM2,
  setSurfaceM2,
  creatingTent,
  onClose,
  onCreate,
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
              🌱
            </div>

            <h2 className="text-3xl font-semibold">
              Create grow space
            </h2>

            <p className="mt-2 text-sm text-[var(--text-muted)]">
              Add a new tent to
              your cultivation
              workspace
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Tent name
              </label>

              <input
                placeholder="Flower Tent"
                value={tentName}
                onChange={(e) =>
                  setTentName(
                    e.target.value
                  )
                }
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Surface (optional)
              </label>

              <input
                type="number"
                step="0.1"
                placeholder="1.2"
                value={surfaceM2}
                onChange={(e) =>
                  setSurfaceM2(
                    e.target.value
                  )
                }
              />
            </div>

            <div className="flex gap-3 pt-3">
              <button
                className="btn-secondary flex-1"
                onClick={onClose}
              >
                Cancel
              </button>

              <button
                className="btn-primary flex-1"
                onClick={onCreate}
                disabled={
                  creatingTent
                }
              >
                {creatingTent
                  ? "Creating..."
                  : "Create tent"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}