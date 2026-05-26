"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import AppShell from "@/components/layout/AppShell";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

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
      /**
       * Dashboard data
       */
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

      /**
       * Fake monitoring
       */
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
          if (
            result
          ) {
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

  return (
    <AppShell>
      <Container>
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-semibold">
              Dashboard
            </h1>

            <p
              className="mt-2 text-sm"
              style={{
                color:
                  "var(--text-muted)",
              }}
            >
              Quick overview of
              your grow tents
            </p>
          </div>

          {tents.length ===
          0 ? (
            <Card>
              <p
                style={{
                  color:
                    "var(--text-muted)",
                }}
              >
                No tents found
              </p>
            </Card>
          ) : (
            <div className="grid gap-5 lg:grid-cols-2">
              {tents.map(
                (tent) => {
                  const activeRun =
                    tent.runs[0];

                  const environment =
                    environments[
                      tent.id
                    ];

                  return (
                    <Card
                      key={
                        tent.id
                      }
                      className="space-y-5"
                    >
                      <div>
                        <h2 className="text-2xl font-semibold">
                          {
                            tent.name
                          }
                        </h2>

                        <p
                          className="text-sm"
                          style={{
                            color:
                              "var(--text-muted)",
                          }}
                        >
                          Tent •{" "}
                          {
                            tent.surfaceM2
                          }
                          m²
                        </p>
                      </div>

                      {!activeRun ? (
                        <p
                          style={{
                            color:
                              "var(--text-muted)",
                          }}
                        >
                          No active run
                        </p>
                      ) : (
                        <>
                          <div>
                            <p className="font-medium text-lg">
                              {
                                activeRun.strain
                              }
                            </p>

                            <p
                              className="text-sm"
                              style={{
                                color:
                                  "var(--text-muted)",
                              }}
                            >
                              {
                                activeRun.stage
                              }
                              {" · Day "}
                              {getDayCount(
                                activeRun.startDate
                              )}
                            </p>
                          </div>

                          <div className="grid grid-cols-3 gap-3">
                            <Card>
                              {environment
                                ? `${environment.temperature}°C`
                                : "--"}
                            </Card>

                            <Card>
                              {environment
                                ? `RH ${environment.humidity}%`
                                : "--"}
                            </Card>

                            <Card>
                              {environment
                                ? environment.lightOn
                                  ? "Lights ON"
                                  : "Lights OFF"
                                : "--"}
                            </Card>
                          </div>
                        </>
                      )}

                      <Link
                        href={`/tents/${tent.id}`}
                      >
                        <Button>
                          Open Tent
                        </Button>
                      </Link>
                    </Card>
                  );
                }
              )}
            </div>
          )}
        </div>
      </Container>
    </AppShell>
  );
}