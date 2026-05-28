"use client";

import {
  useEffect,
  useState,
} from "react";

import AppShell from "@/components/layout/AppShell";
import Container from "@/components/ui/Container";

export default function SettingsPage() {
  const [
    temperatureUnit,
    setTemperatureUnit,
  ] = useState("C");

  const [
    timeFormat,
    setTimeFormat,
  ] = useState("24h");

  const [
    experimental,
    setExperimental,
  ] = useState(false);

  useEffect(() => {
    const temp =
      localStorage.getItem(
        "temperatureUnit"
      );

    const time =
      localStorage.getItem(
        "timeFormat"
      );

    const exp =
      localStorage.getItem(
        "experimental"
      );

    if (temp)
      setTemperatureUnit(
        temp
      );

    if (time)
      setTimeFormat(time);

    if (exp)
      setExperimental(
        exp === "true"
      );
  }, []);

  function saveSettings(
    key: string,
    value: string
  ) {
    localStorage.setItem(
      key,
      value
    );
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
                  Settings
                </p>

                <h1 className="text-4xl font-semibold tracking-tight">
                  Preferences
                </h1>

                <p className="mt-3 max-w-xl text-[var(--text-muted)]">
                  Personalize your
                  grow experience.
                </p>
              </div>
            </div>
          </section>

          {/* PROFILE */}
          <section className="card">
            <div className="mb-5">
              <h2 className="text-2xl font-semibold">
                Profile
              </h2>

              <p className="text-sm text-[var(--text-muted)]">
                Account basics
              </p>
            </div>

            <div className="rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-5">
              <p className="text-sm text-[var(--text-muted)]">
                Profile management
                coming soon.
              </p>
            </div>
          </section>

          {/* PREFERENCES */}
          <section className="card">
            <div className="mb-5">
              <h2 className="text-2xl font-semibold">
                Preferences
              </h2>

              <p className="text-sm text-[var(--text-muted)]">
                Customize your
                experience
              </p>
            </div>

            <div className="space-y-4">
              <div className="rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-5">
                <p className="font-medium">
                  Temperature unit
                </p>

                <div className="mt-4 flex gap-3">
                  <button
                    className={
                      temperatureUnit ===
                      "C"
                        ? "btn-primary"
                        : "btn-secondary"
                    }
                    onClick={() => {
                      setTemperatureUnit(
                        "C"
                      );

                      saveSettings(
                        "temperatureUnit",
                        "C"
                      );
                    }}
                  >
                    Celsius
                  </button>

                  <button
                    className={
                      temperatureUnit ===
                      "F"
                        ? "btn-primary"
                        : "btn-secondary"
                    }
                    onClick={() => {
                      setTemperatureUnit(
                        "F"
                      );

                      saveSettings(
                        "temperatureUnit",
                        "F"
                      );
                    }}
                  >
                    Fahrenheit
                  </button>
                </div>
              </div>

              <div className="rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-5">
                <p className="font-medium">
                  Time format
                </p>

                <div className="mt-4 flex gap-3">
                  <button
                    className={
                      timeFormat ===
                      "24h"
                        ? "btn-primary"
                        : "btn-secondary"
                    }
                    onClick={() => {
                      setTimeFormat(
                        "24h"
                      );

                      saveSettings(
                        "timeFormat",
                        "24h"
                      );
                    }}
                  >
                    24h
                  </button>

                  <button
                    className={
                      timeFormat ===
                      "12h"
                        ? "btn-primary"
                        : "btn-secondary"
                    }
                    onClick={() => {
                      setTimeFormat(
                        "12h"
                      );

                      saveSettings(
                        "timeFormat",
                        "12h"
                      );
                    }}
                  >
                    12h
                  </button>
                </div>
              </div>

              <div className="rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium">
                      Experimental
                      features
                    </p>

                    <p className="mt-1 text-sm text-[var(--text-muted)]">
                      Preview future
                      features
                    </p>
                  </div>

                  <button
                    className={
                      experimental
                        ? "btn-primary"
                        : "btn-secondary"
                    }
                    onClick={() => {
                      const next =
                        !experimental;

                      setExperimental(
                        next
                      );

                      saveSettings(
                        "experimental",
                        String(
                          next
                        )
                      );
                    }}
                  >
                    {experimental
                      ? "Enabled"
                      : "Disabled"}
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* ABOUT */}
          <section className="card">
            <div className="mb-5">
              <h2 className="text-2xl font-semibold">
                About
              </h2>

              <p className="text-sm text-[var(--text-muted)]">
                Project status
              </p>
            </div>

            <div className="rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-5">
              <p className="font-medium">
                Grow App Beta
              </p>

              <p className="mt-2 text-sm text-[var(--text-muted)]">
                Tent-centric
                cultivation
                platform.
              </p>
            </div>
          </section>
        </div>
      </Container>
    </AppShell>
  );
}