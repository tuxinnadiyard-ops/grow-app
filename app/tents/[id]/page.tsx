"use client";

import {
  useEffect,
  useState,
} from "react";
import {
  useParams,
  useRouter,
} from "next/navigation";

import AppShell from "@/components/layout/AppShell";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";


type JournalEntry = {
  id: string;
  type: string;
  note?: string;
  createdAt: string;
};

type Observation = {
  id: string;
  vigour: number;
  leafColor: number;
  stressLevel: number;
  growthSpeed: number;
  healthScore: number;
  stressDetected: boolean;
  anomalyDetected: boolean;
  note?: string;
  createdAt: string;
};

type Insight = {
  id: string;
  severity: "info" | "warning" | "positive";
  title: string;
  description?: string;
  createdAt: string;
};

type Photo = {
  id: string;
  url: string;
  note?: string;
  createdAt: string;
};

type Task = {
  id: string;
  title: string;
  note?: string;
  dueDate?: string;
  status: "TODO" | "DONE";
};

type Run = {
  id: string;
  strain: string;
  stage: string;
  startDate: string;
  isActive: boolean;
  journalEntries: JournalEntry[];
  observations: Observation[];
  tasks: Task[];
  photos: Photo[];
};

type TimelineEvent = {
  id: string;
  title: string;
  subtitle?: string;
  createdAt: string;
};

type Tent = {
  id: string;
  name: string;
  surfaceM2?: number;
  runs: Run[];
  timeline?: TimelineEvent[];
};

function ObservationMetric({
  label,
  value,
  setValue,
}: {
  label: string;
  value: number;
  setValue: (
    value: number
  ) => void;
}) {
  return (
    <div className="rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="font-medium">
            {label}
          </p>
        </div>

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
              className={`
                h-12
                flex-1
                rounded-2xl
                transition
                ${
                  score <= value
                    ? "bg-[var(--primary)] border border-green-500/20"
                    : "bg-[var(--card)] border border-[var(--border)]"
                }
              `}
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

export default function TentPage() {
  const params =
    useParams();

  const router =
    useRouter();

  const tentId =
    params.id as string;

  const [tent, setTent] =
    useState<Tent | null>(
      null
    );

  const [healthScore, setHealthScore] = useState(3);
  
  const [vigour, setVigour] =
    useState(3);

  const [
    leafColor,
    setLeafColor,
  ] = useState(3);

  const [
    stressLevel,
    setStressLevel,
  ] = useState(2);

  const [
    growthSpeed,
    setGrowthSpeed,
  ] = useState(3);

  const [note, setNote] =
    useState("");

   const [
    feedbackMessage,
    setFeedbackMessage,
  ] = useState("");

  const [taskTitle, setTaskTitle] =
    useState("");

  const [taskNote, setTaskNote] =
    useState("");

  const [
    taskDueDate,
    setTaskDueDate,
  ] = useState("");

  const [photoFile, setPhotoFile] =
    useState<File | null>(null);

  const [photoNote, setPhotoNote] =
    useState("");

  const [insights, setInsights] =
    useState<Insight[]>([]);

  const [environment, setEnvironment] =
    useState<{
      temperature: number;
      humidity: number;
      lightOn: boolean;
    } | null>(null);

    const [snapshots, setSnapshots] =
      useState<
        {
          id: string;
          temperature: number;
          humidity: number;
          lightOn: boolean;
          timestamp: string;
        }[]
      >([]);

    const [
      startRunOpen,
      setStartRunOpen,
    ] = useState(false);

    const [strain, setStrain] =
      useState("");

    const [
      creatingRun,
      setCreatingRun,
    ] = useState(false);


  async function startCultivation() {
    if (!strain.trim()) {
      return;
    }

    try {
      setCreatingRun(true);

      const res =
        await fetch(
          "/api/runs",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              tentId: tent?.id,
              strain,
            }),
          }
        );

      if (!res.ok) {
        throw new Error(
          "Failed to create run"
        );
      }

      setStrain("");

      setStartRunOpen(
        false
      );

      setFeedbackMessage(
        "✓ Cultivation started"
      );

      setTimeout(() => {
        setFeedbackMessage(
          ""
        );
      }, 2500);

      await loadTent();
    } catch (error) {
      console.error(error);
    } finally {
      setCreatingRun(false);
    }
  }

  async function loadTent() {
    const res =
      await fetch(
        `/api/tents/${tentId}`
      );

    const data =
      await res.json();

    setTent(data);

    const insightsRes =
      await fetch(
        `/api/insights/${tentId}`
      );

    const insightsData =
      await insightsRes.json();

    setInsights(insightsData);
  }

  async function quickJournalEntry(
    type:
      | "WATERING"
      | "FEEDING"
      | "NOTE"
      | "ISSUE"
  ) {
    const activeRun =
      tent?.runs.find(
        (r) => r.isActive
      );

    if (!activeRun) {
      return;
    }

    const res =
      await fetch(
        "/api/journal",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body:
            JSON.stringify({
              runId:
                activeRun.id,
              type,
              note:
                `${type} entry`,
            }),
        }
      );

    const data =
      await res.json();

    if (!res.ok) {
      alert(
        data.error ??
          "Failed to add entry"
      );
      return;
    }

    await loadTent();
  }

  async function saveObservation() {
    const activeRun =
      tent?.runs.find(
        (r) => r.isActive
      );

    if (!activeRun) {
      alert(
        "No active run"
      );
      return;
    }

    const res =
      await fetch(
        "/api/observations",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body:
            JSON.stringify({
              runId:
                activeRun.id,
              healthScore,
              vigour,
              leafColor,
              stressLevel,
              growthSpeed,
              note,
            }),
        }
      );

    const data =
      await res.json();

    if (!res.ok) {
      alert(
        data.error ??
          "Failed to save observation"
      );
      return;
    }

    setNote("");

    await loadTent();

    setFeedbackMessage(
      "✓ Observation saved"
    );

    setTimeout(() => {
      setFeedbackMessage("");
    }, 2500);

    alert(
      "Observation saved"
    );
  }

  async function createTask() {
    const activeRun =
      tent?.runs.find(
        (r) => r.isActive
      );

    if (!activeRun) {
      return;
    }

    if (!taskTitle.trim()) {
      alert(
        "Task title required"
      );
      return;
    }

    const res =
      await fetch(
        "/api/tasks",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body:
            JSON.stringify({
              runId:
                activeRun.id,
              title:
                taskTitle,
              note:
                taskNote,
              dueDate:
                taskDueDate ||
                null,
            }),
        }
      );

    const data =
      await res.json();

    if (!res.ok) {
      alert(
        data.error ??
          "Failed to create task"
      );
      return;
    }

    setTaskTitle("");
    setTaskNote("");
    setTaskDueDate("");

    await loadTent();

    setFeedbackMessage(
      "✓ Task added"
    );

    setTimeout(() => {
      setFeedbackMessage("");
    }, 2500);
  }

  async function uploadPhoto() {
    const activeRun =
      tent?.runs.find(
        (r) => r.isActive
      );

    if (!activeRun || !photoFile) {
      alert("Select a photo");
      return;
    }

    const formData = new FormData();
    formData.append("runId", activeRun.id);
    formData.append("note", photoNote);
    formData.append("photo", photoFile);

    const res = await fetch("/api/photos", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error ?? "Upload failed");
      return;
    }

    setPhotoFile(null);
    setPhotoNote("");
    await loadTent();

    setFeedbackMessage(
      "✓ Photo added"
    );

    setTimeout(() => {
      setFeedbackMessage("");
    }, 2500);
  }

  async function toggleTask(
    taskId: string
  ) {
    const res =
      await fetch(
        "/api/tasks/toggle",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body:
            JSON.stringify({
              taskId,
            }),
        }
      );

    const data =
      await res.json();

    if (!res.ok) {
      alert(
        data.error ??
          "Failed to toggle task"
      );
      return;
    }

    await loadTent();
  }

  async function changeStage(
    stage: string
  ) {
    const activeRun =
      tent?.runs.find(
        (r) => r.isActive
      );

    if (!activeRun) {
      alert(
        "No active run"
      );
      return;
    }

    const res =
      await fetch(
        "/api/runs/stage",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body:
            JSON.stringify({
              runId:
                activeRun.id,
              stage,
            }),
        }
      );

    const data =
      await res.json();

    if (!res.ok) {
      alert(
        data.error ??
          "Failed to change stage"
      );
      return;
    }

    await loadTent();
  }

  useEffect(() => {
    if (tentId) {
      loadTent();
    }
  }, [tentId]);


  useEffect(() => {
    if (!tent) {
      return;
    }

    async function loadEnvironment() {
      try {
        const response =
          await fetch(
            `/api/environment/${params.id}`
          );

        if (!response.ok) {
          throw new Error(
            "Failed to load environment"
          );
        }

        const data =
          await response.json();

        setEnvironment(data);


      } catch (error) {
        console.error(error);
      }
    }

    async function loadSnapshots() {
      try {
        const runId =
          tent?.runs?.find(
            (run) =>
              run.isActive
          )?.id;

        if (!runId) {
          return;
        }

        const response =
          await fetch(
            `/api/snapshots?runId=${runId}`
          );

        if (!response.ok) {
          throw new Error(
            "Failed to load snapshots"
          );
        }

        const data =
          await response.json();

        setSnapshots(
          data.slice(0, 10)
        );
      } catch (error) {
        console.error(error);
      }
    }

    loadEnvironment();
    loadSnapshots();

    const interval =
      setInterval(() => {
        loadEnvironment();
        loadSnapshots();
      }, 10000);

    return () =>
      clearInterval(interval);
  }, [params.id, tent]);


  function formatRelativeTime(
    timestamp: string
  ) {
    const diffMs =
      Date.now() -
      new Date(
        timestamp
      ).getTime();

    const diffMinutes =
      Math.floor(
        diffMs / 60000
      );

    if (diffMinutes < 1) {
      return "Now";
    }

    if (diffMinutes === 1) {
      return "1 min ago";
    }

    if (diffMinutes < 60) {
      return `${diffMinutes} min ago`;
    }

    const hours =
      Math.floor(
        diffMinutes / 60
      );

    if (hours === 1) {
      return "1 hour ago";
    }

    return `${hours} hours ago`;
  }

  function getTrend(
    current: number,
    previous?: number
  ) {
    if (
      previous === undefined
    ) {
      return "→";
    }

    if (
      current >
      previous
    ) {
      return "↑";
    }

    if (
      current <
      previous
    ) {
      return "↓";
    }

    return "→";
  }

  function getStatusBadge(
    snapshot: {
      temperature: number;
      humidity: number;
    }
  ) {
    if (
      snapshot.temperature >
      29
    ) {
      return "Hot";
    }

    if (
      snapshot.humidity >
      70
    ) {
      return "Humid";
    }

    if (
      snapshot.humidity <
      40
    ) {
      return "Dry";
    }

    return "Stable";
  }


  if (!tent) {
    return (
      <AppShell>
        <Container>
          Loading...
        </Container>
      </AppShell>
    );
  }

  const activeRun =
    tent.runs.find(
      (r) => r.isActive
    );

  return (
    <AppShell>
      <Container>
        {!tent ? (
          <div className="flex min-h-[40vh] items-center justify-center">
            <p className="text-[var(--text-muted)]">
              Loading tent...
            </p>
          </div>
        ) : (
          (() => {
            const activeRun =
              tent.runs.find(
                (r) => r.isActive
              );

            const dayCount =
              activeRun
                ? Math.floor(
                    (Date.now() -
                      new Date(
                        activeRun.startDate
                      ).getTime()) /
                      (
                        1000 *
                        60 *
                        60 *
                        24
                      )
                  ) + 1
                : 0;

            return (
              <div className="space-y-8">
                {feedbackMessage && (
                  <div className="sticky top-4 z-40 flex justify-center">
                    <div className="rounded-full border border-green-500/20 bg-green-500/10 px-5 py-3 text-sm text-green-300 shadow-xl backdrop-blur">
                      {feedbackMessage}
                    </div>
                  </div>
                )}
                {/* HEADER */}
                <section className="card overflow-hidden">
                  <div className="relative">
                    {/* glow */}
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
                          {tent.name}
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
                          <div className="rounded-[28px] border border-dashed border-[var(--border)] bg-[var(--surface)] p-8">
                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] text-3xl">
                              🌱
                            </div>

                            <h3 className="text-xl font-semibold">
                              Start your first run
                            </h3>

                            <p className="mt-3 max-w-md text-[var(--text-muted)]">
                              Track observations,
                              photos, tasks and
                              cultivation progress
                              from seed to harvest.
                            </p>

                            <button
                              className="btn-primary mt-6"
                              onClick={() =>
                                setStartRunOpen(true)
                              }
                            >
                              Start cultivation
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-3 sm:flex-row">
                        <button
                          className="btn-secondary"
                          onClick={() =>
                            router.push(
                              "/dashboard"
                            )
                          }
                        >
                          ← Dashboard
                        </button>

                        <button className="btn-primary">
                          Manage run
                        </button>
                      </div>
                    </div>
                  </div>
                </section>

                {/* QUICK STATUS */}
                <section className="space-y-4">
                  <div>
                    <h2 className="text-xl font-semibold">
                      Quick Status
                    </h2>

                    <p className="text-sm text-[var(--text-muted)]">
                      Understand the tent at
                      a glance
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
                              ? environment.temperature
                              : "--"}
                          </p>

                          <span className="pb-1 text-[var(--text-muted)]">
                            °C
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

                {/* QUICK ACTIONS */}
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
                      onClick={() =>
                        quickJournalEntry(
                          "WATERING"
                        )
                      }
                    >
                      💧 Watering
                    </button>

                    <button
                      className="btn-secondary"
                      onClick={() =>
                        quickJournalEntry(
                          "FEEDING"
                        )
                      }
                    >
                      🌱 Feeding
                    </button>

                    <button
                      className="btn-secondary"
                      onClick={() =>
                        quickJournalEntry(
                          "NOTE"
                        )
                      }
                    >
                      📝 Note
                    </button>

                    <button
                      className="btn-secondary"
                      onClick={() =>
                        quickJournalEntry(
                          "ISSUE"
                        )
                      }
                    >
                      ⚠️ Issue
                    </button>
                  </div>
                </section>

                {/* DAILY OBSERVATION */}
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
                          placeholder="Leaves look healthy, watering adjusted, humidity stable..."
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
                        onClick={
                          saveObservation
                        }
                      >
                        Save Observation
                      </button>
                    </>
                  )}
                </section>

                {/* JOURNAL */}
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
                    {!activeRun
                      ?.journalEntries
                      ?.length ? (
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
                      activeRun.journalEntries.map(
                        (entry) => {
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
                              <div className="flex items-start justify-between gap-4">
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
                                      {new Date(
                                        entry.createdAt
                                      ).toLocaleString()}
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
                            </div>
                          );
                        }
                      )
                    )}
                  </div>
                </section>

                {/* TASKS + PHOTOS */}
                <div className="grid gap-6 lg:grid-cols-2">
                  <section className="card">
                    <div className="mb-5">
                      <h2 className="text-xl font-semibold">
                        Tasks
                      </h2>

                      <p className="text-sm text-[var(--text-muted)]">
                        Tent-local reminders
                      </p>
                    </div>

                    <div className="space-y-4">
                      <input
                        placeholder="Task title"
                        value={taskTitle}
                        onChange={(e) =>
                          setTaskTitle(
                            e.target.value
                          )
                        }
                      />

                      <textarea
                        placeholder="Optional note"
                        value={taskNote}
                        onChange={(e) =>
                          setTaskNote(
                            e.target.value
                          )
                        }
                      />

                      <input
                        type="date"
                        value={taskDueDate}
                        onChange={(e) =>
                          setTaskDueDate(
                            e.target.value
                          )
                        }
                      />

                      <button
                        className="btn-primary w-full"
                        onClick={createTask}
                      >
                        Add Task
                      </button>

                      <div className="space-y-3">
                        {activeRun?.tasks
                          ?.length === 0 ? (
                          <div className="rounded-[28px] border border-dashed border-[var(--border)] bg-[var(--surface)] p-8 text-center">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] text-3xl">
                              ✅
                            </div>

                            <h3 className="text-lg font-semibold">
                              No tasks scheduled
                            </h3>

                            <p className="mx-auto mt-3 max-w-sm text-sm text-[var(--text-muted)]">
                              Add reminders for
                              watering, nutrients,
                              pruning or other grow
                              tasks.
                            </p>
                          </div>
                        ) : (
                          activeRun?.tasks.map(
                          (task) => (
                            <div
                              key={task.id}
                              className="rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-5"
                            >
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex gap-4">
                                  <button
                                    className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                                      task.status ===
                                      "DONE"
                                        ? "border-green-400 bg-green-400 text-black"
                                        : "border-[var(--border)]"
                                    }`}
                                    onClick={() =>
                                      toggleTask(
                                        task.id
                                      )
                                    }
                                  >
                                    {task.status ===
                                    "DONE"
                                      ? "✓"
                                      : ""}
                                  </button>

                                  <div>
                                    <p
                                      className={`font-medium ${
                                        task.status ===
                                        "DONE"
                                          ? "line-through opacity-60"
                                          : ""
                                      }`}
                                    >
                                      {task.title}
                                    </p>

                                    {task.note && (
                                      <p className="mt-2 text-sm text-[var(--text-muted)]">
                                        {task.note}
                                      </p>
                                    )}

                                    {task.dueDate && (
                                      <p className="mt-3 text-xs text-[var(--text-muted)]">
                                        Due{" "}
                                        {new Date(
                                          task.dueDate
                                        ).toLocaleDateString()}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        ))}
                      </div>
                    </div>
                  </section>

                  <section className="card">
                    <div className="mb-5">
                      <h2 className="text-xl font-semibold">
                        Photos
                      </h2>

                      <p className="text-sm text-[var(--text-muted)]">
                        Visual grow history
                      </p>
                    </div>

                    <div className="space-y-4">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          setPhotoFile(
                            e.target.files?.[0] ??
                              null
                          )
                        }
                      />

                      <textarea
                        rows={2}
                        placeholder="Photo note"
                        value={photoNote}
                        onChange={(e) =>
                          setPhotoNote(
                            e.target.value
                          )
                        }
                      />

                      <button
                        className="btn-primary w-full"
                        onClick={uploadPhoto}
                      >
                        Add Photo
                      </button>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {activeRun?.photos
                          ?.length === 0 ? (
                          <div className="rounded-[28px] border border-dashed border-[var(--border)] bg-[var(--surface)] p-8 text-center">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] text-3xl">
                              📷
                            </div>

                            <h3 className="text-lg font-semibold">
                              No photos yet
                            </h3>

                            <p className="mx-auto mt-3 max-w-sm text-sm text-[var(--text-muted)]">
                              Document growth over
                              time and build a visual
                              cultivation history.
                            </p>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {activeRun?.photos?.map(
                              (photo) => (
                                <div
                                  key={photo.id}
                                  className="overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--surface)]"
                                >
                                  <img
                                    src={photo.url}
                                    alt="Grow"
                                    className="aspect-square w-full object-cover"
                                  />

                                  <div className="p-4">
                                    <p className="text-xs text-[var(--text-muted)]">
                                      {new Date(
                                        photo.createdAt
                                      ).toLocaleString()}
                                    </p>

                                    {photo.note && (
                                      <p className="mt-3 text-sm">
                                        {photo.note}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            );
          })()
        )}

        {startRunOpen && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={() =>
              setStartRunOpen(
                false
              )
            }
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

                <p className="mt-2 text-sm text-[var(--text-muted)]">
                  Begin tracking
                  your grow cycle
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Strain
                  </label>

                  <input
                    placeholder="Gelato"
                    value={strain}
                    onChange={(e) =>
                      setStrain(
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    className="btn-secondary flex-1"
                    onClick={() =>
                      setStartRunOpen(
                        false
                      )
                    }
                  >
                    Cancel
                  </button>

                  <button
                    className="btn-primary flex-1"
                    onClick={
                      startCultivation
                    }
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
      )}

      </Container>
    </AppShell>
  );
}