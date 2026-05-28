"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import AppShell from "@/components/layout/AppShell";
import Container from "@/components/ui/Container";

type Run = {
  id: string;
  strain: string;
  stage: string;
  startDate: string;
  isActive: boolean;
};

type Tent = {
  id: string;
  name: string;
  surfaceM2?: number;
  runs: Run[];
};

type Environment = {
  temperature: number;
  humidity: number;
  lightOn: boolean;
};

export default function DashboardPage() {
  const [tents, setTents] =
    useState<Tent[]>([]);

  const [
    environments,
    setEnvironments,
  ] = useState<
    Record<string, Environment>
  >({});

  async function loadData() {
    try {
      const res =
        await fetch(
          "/api/dashboard"
        );

      if (!res.ok) {
        throw new Error(
          "Failed to load dashboard"
        );
      }

      const data =
        await res.json();

      setTents(data);

      const envResults =
        await Promise.all(
          data.map(
            async (
              tent: Tent
            ) => {
              try {
                const envRes =
                  await fetch(
                    `/api/environment/${tent.id}`
                  );

                if (
                  !envRes.ok
                ) {
                  return null;
                }

                const env =
                  await envRes.json();

                return {
                  tentId:
                    tent.id,
                  environment:
                    env,
                };
              } catch {
                return null;
              }
            }
          )
        );

      const envMap: Record<
        string,
        Environment
      > = {};

      envResults.forEach(
        (result) => {
          if (result) {
            envMap[
              result.tentId
            ] =
              result.environment;
          }
        }
      );

      setEnvironments(envMap);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadData();

    const interval =
      setInterval(
        loadData,
        10000
      );

    return () =>
      clearInterval(interval);
  }, []);

  function getDayCount(
    startDate: string
  ) {
    const start =
      new Date(startDate);

    const now =
      new Date();

    const diff =
      now.getTime() -
      start.getTime();

    return (
      Math.floor(
        diff /
          (
            1000 *
            60 *
            60 *
            24
          )
      ) + 1
    );
  }

  function greeting() {
    const hour =
      new Date().getHours();

    if (hour < 12)
      return "Good morning";

    if (hour < 18)
      return "Good afternoon";

    return "Good evening";
  }

  return (
    <AppShell>
      <Container>
        <div className="space-y-8">
          {/* HERO */}
          <section className="card overflow-hidden">
            <div className="relative">
              <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-green-500/10 blur-[90px]" />

              <div className="relative">
                <p className="mb-3 text-sm uppercase tracking-[0.18em] text-[var(--primary)]">
                  Dashboard
                </p>

                <h1 className="text-4xl font-semibold tracking-tight">
                  {greeting()} 👋
                </h1>

                <p className="mt-3 max-w-xl text-[var(--text-muted)]">
                  Monitor your
                  grow spaces,
                  understand
                  plant health,
                  and act quickly.
                </p>
              </div>
            </div>
          </section>

          {/* TENTS */}
          <section className="space-y-5">
            <div>
              <h2 className="text-2xl font-semibold">
                Your grow spaces
              </h2>

              <p className="text-sm text-[var(--text-muted)]">
                Open a tent and
                continue your
                cultivation
                workflow
              </p>
            </div>

            {tents.length ===
            0 ? (
              <section className="card text-center">
                <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-4xl">
                  🌱
                </div>

                <h3 className="text-2xl font-semibold">
                  No grow spaces
                  yet
                </h3>

                <p className="mx-auto mt-3 max-w-sm text-[var(--text-muted)]">
                  Create your
                  first tent to
                  start tracking
                  cultivation,
                  observations
                  and progress.
                </p>

                <button className="btn-primary mt-6">
                  + Create Tent
                </button>
              </section>
            ) : (
              <div className="grid gap-5 xl:grid-cols-2">
                {tents.map(
                  (tent) => {
                    const activeRun =
                      tent.runs[0];

                    const environment =
                      environments[
                        tent.id
                      ];

                    return (
                      <Link
                        key={
                          tent.id
                        }
                        href={`/tents/${tent.id}`}
                        className="block"
                      >
                        <article className="card h-full transition hover:border-green-500/20">
                          <div className="flex h-full flex-col justify-between">
                            <div>
                              <div className="mb-5 flex items-start justify-between gap-4">
                                <div>
                                  <h3 className="text-2xl font-semibold">
                                    {
                                      tent.name
                                    }
                                  </h3>

                                  <p className="mt-2 text-sm text-[var(--text-muted)]">
                                    Tent
                                    {tent.surfaceM2
                                      ? ` · ${tent.surfaceM2}m²`
                                      : ""}
                                  </p>
                                </div>

                                <div className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">
                                  Workspace
                                </div>
                              </div>

                              {!activeRun ? (
                                <div className="rounded-[28px] border border-dashed border-[var(--border)] bg-[var(--surface)] p-5">
                                  <p className="font-medium">
                                    No active
                                    run
                                  </p>

                                  <p className="mt-2 text-sm text-[var(--text-muted)]">
                                    Start a
                                    cultivation
                                    cycle to
                                    begin
                                    tracking.
                                  </p>
                                </div>
                              ) : (
                                <>
                                  <div className="mb-5 flex flex-wrap gap-3">
                                    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3">
                                      <p className="text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">
                                        Stage
                                      </p>

                                      <p className="mt-1 font-semibold">
                                        {
                                          activeRun.stage
                                        }
                                      </p>
                                    </div>

                                    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3">
                                      <p className="text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">
                                        Day
                                      </p>

                                      <p className="mt-1 font-semibold">
                                        {getDayCount(
                                          activeRun.startDate
                                        )}
                                      </p>
                                    </div>

                                    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3">
                                      <p className="text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">
                                        Strain
                                      </p>

                                      <p className="mt-1 font-semibold">
                                        {
                                          activeRun.strain
                                        }
                                      </p>
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-3 gap-3">
                                    <div className="rounded-[24px] border border-[var(--border)] bg-[var(--surface)] p-4">
                                      <p className="text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">
                                        Temp
                                      </p>

                                      <p className="mt-2 text-2xl font-semibold">
                                        {environment
                                          ? `${environment.temperature}°C`
                                          : "--"}
                                      </p>
                                    </div>

                                    <div className="rounded-[24px] border border-[var(--border)] bg-[var(--surface)] p-4">
                                      <p className="text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">
                                        RH
                                      </p>

                                      <p className="mt-2 text-2xl font-semibold">
                                        {environment
                                          ? `${environment.humidity}%`
                                          : "--"}
                                      </p>
                                    </div>

                                    <div className="rounded-[24px] border border-[var(--border)] bg-[var(--surface)] p-4">
                                      <p className="text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">
                                        Lights
                                      </p>

                                      <p className="mt-2 text-lg font-semibold">
                                        {environment
                                          ? environment.lightOn
                                            ? "ON"
                                            : "OFF"
                                          : "--"}
                                      </p>
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>

                            <div className="mt-6">
                              <div className="btn-secondary flex items-center justify-center">
                                Open workspace
                                →
                              </div>
                            </div>
                          </div>
                        </article>
                      </Link>
                    );
                  }
                )}
              </div>
            )}
          </section>
        </div>
      </Container>
    </AppShell>
  );
}