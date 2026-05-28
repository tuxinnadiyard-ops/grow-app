import usePreferences from "@/hooks/usePreferences";

type Entry = {
  id: string;
  type: string;
  createdAt: string;
  note?: string | null;
};

type Props = {
  entries?: Entry[];
};

export default function Timeline({
  entries = [],
}: Props) {
  const { formatDate } = usePreferences();

  return (
    <section className="card">
      <div className="mb-5">
        <h2 className="text-xl font-semibold">
          Journal Timeline
        </h2>

        <p className="text-sm text-[var(--text-muted)]">
          Recent grow activity
        </p>
      </div>

      <div className="space-y-4">
        {entries.length === 0 ? (
          <div className="rounded-[28px] border border-dashed border-[var(--border)] bg-[var(--surface)] p-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] text-3xl">
              📝
            </div>

            <h3 className="text-lg font-semibold">
              No activity yet
            </h3>

            <p className="mx-auto mt-3 max-w-sm text-sm text-[var(--text-muted)]">
              Use quick actions above
              to log watering,
              feeding, notes or
              cultivation events.
            </p>
          </div>
        ) : (
          entries.map((entry) => {
            const icon =
              entry.type ===
              "WATERING"
                ? "💧"
                : entry.type ===
                    "FEEDING"
                  ? "🌱"
                  : entry.type ===
                      "ISSUE"
                    ? "⚠️"
                    : "📝";

            return (
              <div
                key={entry.id}
                className="rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-5 transition hover:border-green-500/20"
              >
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--card)] text-xl">
                    {icon}
                  </div>

                  <div>
                    <p className="font-semibold">
                      {entry.type
                        .toLowerCase()
                        .replace(
                          "_",
                          " "
                        )}
                    </p>

                    <p className="mt-1 text-xs text-[var(--text-muted)]">
                      {formatDate(entry.createdAt)}
                    </p>

                    {entry.note && (
                      <p className="mt-3 text-sm text-[var(--text-muted)]">
                        {
                          entry.note
                        }
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}