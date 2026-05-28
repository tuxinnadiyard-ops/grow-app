type MetricSetter = (
  value: number
) => void;

type Props = {
  activeRun: unknown;
  healthScore: number;
  setHealthScore: MetricSetter;
  vigour: number;
  setVigour: MetricSetter;
  leafColor: number;
  setLeafColor: MetricSetter;
  stressLevel: number;
  setStressLevel: MetricSetter;
  growthSpeed: number;
  setGrowthSpeed: MetricSetter;
  note: string;
  setNote: (
    value: string
  ) => void;
  onSave: () => void;
};

function ObservationMetric({
  label,
  value,
  setValue,
}: {
  label: string;
  value: number;
  setValue: MetricSetter;
}) {
  return (
    <div className="rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="font-medium">
          {label}
        </p>

        <div className="rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1 text-sm font-medium">
          {value}/5
        </div>
      </div>

      <div className="mb-4 flex gap-2">
        {[1, 2, 3, 4, 5].map(
          (score) => (
            <button
              key={score}
              type="button"
              onClick={() =>
                setValue(
                  score
                )
              }
              className={`h-12 flex-1 rounded-2xl transition ${
                score <= value
                  ? "bg-[var(--primary)] border border-green-500/20"
                  : "bg-[var(--card)] border border-[var(--border)]"
              }`}
            />
          )
        )}
      </div>

      <input
        type="range"
        min="1"
        max="5"
        value={value}
        onChange={(e) =>
          setValue(
            Number(
              e.target.value
            )
          )
        }
      />
    </div>
  );
}

export default function ObservationCard({
  activeRun,
  healthScore,
  setHealthScore,
  vigour,
  setVigour,
  leafColor,
  setLeafColor,
  stressLevel,
  setStressLevel,
  growthSpeed,
  setGrowthSpeed,
  note,
  setNote,
  onSave,
}: Props) {
  return (
    <section className="card space-y-6">
      <div>
        <h2 className="text-xl font-semibold">
          Daily Observation
        </h2>

        <p className="text-sm text-[var(--text-muted)]">
          Record plant health in
          under a minute
        </p>
      </div>

      {!activeRun ? (
        <p className="text-[var(--text-muted)]">
          No active run
        </p>
      ) : (
        <>
          <div className="space-y-5">
            <ObservationMetric
              label="Health Score"
              value={
                healthScore
              }
              setValue={
                setHealthScore
              }
            />

            <ObservationMetric
              label="Vigour"
              value={vigour}
              setValue={
                setVigour
              }
            />

            <ObservationMetric
              label="Leaf Color"
              value={
                leafColor
              }
              setValue={
                setLeafColor
              }
            />

            <ObservationMetric
              label="Stress Level"
              value={
                stressLevel
              }
              setValue={
                setStressLevel
              }
            />

            <ObservationMetric
              label="Growth Speed"
              value={
                growthSpeed
              }
              setValue={
                setGrowthSpeed
              }
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium">
              Daily note
            </label>

            <textarea
              rows={4}
              placeholder="Leaves look healthy..."
              value={note}
              onChange={(e) =>
                setNote(
                  e.target.value
                )
              }
            />
          </div>

          <button
            className="btn-primary w-full"
            onClick={onSave}
          >
            Save Observation
          </button>
        </>
      )}
    </section>
  );
}