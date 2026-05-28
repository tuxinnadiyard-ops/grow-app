type Props = {
  onWatering: () => void;
  onFeeding: () => void;
  onNote: () => void;
  onIssue: () => void;
};

export default function QuickActions({
  onWatering,
  onFeeding,
  onNote,
  onIssue,
}: Props) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">
          Quick Actions
        </h2>

        <p className="text-sm text-[var(--text-muted)]">
          Fast daily actions
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <button
          className="btn-primary"
          onClick={onWatering}
        >
          💧 Watering
        </button>

        <button
          className="btn-secondary"
          onClick={onFeeding}
        >
          🌱 Feeding
        </button>

        <button
          className="btn-secondary"
          onClick={onNote}
        >
          📝 Note
        </button>

        <button
          className="btn-secondary"
          onClick={onIssue}
        >
          ⚠️ Issue
        </button>
      </div>
    </section>
  );
}