import usePreferences from "@/hooks/usePreferences";

type Props = {
  environment: {
    temperature: number;
    humidity: number;
    lightOn: boolean;
  } | null;
};

export default function QuickStatus({
  environment,
}: Props) {

    const {
        temperatureUnit,
        formatTemperature,
    } = usePreferences();

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">
          Quick Status
        </h2>

        <p className="text-sm text-[var(--text-muted)]">
          Understand the tent
          at a glance
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="card relative overflow-hidden">
          <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-blue-500/10 blur-[40px]" />

          <div className="relative">
            <p className="text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">
              Temperature
            </p>

            <div className="mt-4 flex items-end gap-2">
              <p className="text-4xl font-semibold">
                {environment
                  ? formatTemperature(environment.temperature)
                  : "--"}
              </p>

              <span className="pb-1 text-[var(--text-muted)]">
                {temperatureUnit}
              </span>
            </div>
          </div>
        </div>

        <div className="card relative overflow-hidden">
          <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-cyan-500/10 blur-[40px]" />

          <div className="relative">
            <p className="text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">
              Humidity
            </p>

            <div className="mt-4 flex items-end gap-2">
              <p className="text-4xl font-semibold">
                {environment
                  ? environment.humidity
                  : "--"}
              </p>

              <span className="pb-1 text-[var(--text-muted)]">
                %
              </span>
            </div>
          </div>
        </div>

        <div className="card relative overflow-hidden">
          <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-yellow-500/10 blur-[40px]" />

          <div className="relative">
            <p className="text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">
              Lighting
            </p>

            <div className="mt-4 flex items-center gap-3">
              <div
                className={`h-3 w-3 rounded-full ${
                  environment?.lightOn
                    ? "bg-green-400"
                    : "bg-neutral-500"
                }`}
              />

              <p className="text-3xl font-semibold">
                {environment
                  ? environment.lightOn
                    ? "ON"
                    : "OFF"
                  : "--"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}