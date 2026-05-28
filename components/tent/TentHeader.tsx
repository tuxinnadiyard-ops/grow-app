type Props = {
  tentName: string;
  activeRun?: {
    strain: string;
    stage: string;
  } | null;
  dayCount: number;
  onDashboard: () => void;
};

export default function TentHeader({
  tentName,
  activeRun,
  dayCount,
  onDashboard,
}: Props) {
  return (
    <section className="card overflow-hidden">
      <div className="relative">
        <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-green-500/10 blur-[80px]" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">
                Tent workspace
              </span>

              {activeRun && (
                <span className="rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-300">
                  Active run
                </span>
              )}
            </div>

            <h1 className="text-4xl font-semibold tracking-tight">
              {tentName}
            </h1>

            {activeRun ? (
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">
                    Stage
                  </p>

                  <p className="mt-1 font-semibold">
                    {activeRun.stage}
                  </p>
                </div>

                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">
                    Day
                  </p>

                  <p className="mt-1 font-semibold">
                    {dayCount}
                  </p>
                </div>

                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">
                    Strain
                  </p>

                  <p className="mt-1 font-semibold">
                    {activeRun.strain}
                  </p>
                </div>
              </div>
            ) : (
              <p className="mt-3 text-[var(--text-muted)]">
                No active run
              </p>
            )}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              className="btn-secondary"
              onClick={onDashboard}
            >
              ← Dashboard
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}