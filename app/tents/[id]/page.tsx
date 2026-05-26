"use client";

import {
  useEffect,
  useState,
} from "react";
import { useParams } from "next/navigation";

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
};

type Tent = {
  id: string;
  name: string;
  surfaceM2?: number;
  runs: Run[];
};

export default function TentPage() {
  const params =
    useParams();

  const tentId =
    params.id as string;

  const [tent, setTent] =
    useState<Tent | null>(
      null
    );

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

  const [taskTitle, setTaskTitle] =
    useState("");

  const [taskNote, setTaskNote] =
    useState("");

  const [
    taskDueDate,
    setTaskDueDate,
  ] = useState("");

  async function loadTent() {
    const res =
      await fetch(
        `/api/tents/${tentId}`
      );

    const data =
      await res.json();

    setTent(data);
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

  useEffect(() => {
    if (tentId) {
      loadTent();
    }
  }, [tentId]);

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
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-semibold">
              {tent.name}
            </h1>

            {activeRun && (
              <p
                style={{
                  color:
                    "var(--text-muted)",
                }}
              >
                {
                  activeRun.strain
                }
                {" · "}
                {
                  activeRun.stage
                }
              </p>
            )}
          </div>

          <Card>
            <h2 className="text-xl font-semibold mb-4">
              Quick Status
            </h2>

            <div className="grid grid-cols-3 gap-4">
              <Card>24°C</Card>
              <Card>RH 58%</Card>
              <Card>Lights ON</Card>
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-semibold mb-4">
              Quick Actions
            </h2>

            {!activeRun ? (
              <p>No active run</p>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={() =>
                    quickJournalEntry(
                      "WATERING"
                    )
                  }
                >
                  Watering
                </Button>

                <Button
                  variant="secondary"
                  onClick={() =>
                    quickJournalEntry(
                      "FEEDING"
                    )
                  }
                >
                  Feeding
                </Button>

                <Button
                  variant="secondary"
                  onClick={() =>
                    quickJournalEntry(
                      "NOTE"
                    )
                  }
                >
                  Note
                </Button>

                <Button
                  variant="danger"
                  onClick={() =>
                    quickJournalEntry(
                      "ISSUE"
                    )
                  }
                >
                  Issue
                </Button>
              </div>
            )}
          </Card>

          <Card>
            <h2 className="text-xl font-semibold mb-4">
              Daily Observation
            </h2>

            {!activeRun ? (
              <p>No active run</p>
            ) : (
              <div className="space-y-4">
                <select value={vigour} onChange={(e)=>setVigour(Number(e.target.value))}>
                  {[1,2,3,4,5].map(n=><option key={n} value={n}>{n}</option>)}
                </select>

                <select value={leafColor} onChange={(e)=>setLeafColor(Number(e.target.value))}>
                  {[1,2,3,4,5].map(n=><option key={n} value={n}>{n}</option>)}
                </select>

                <select value={stressLevel} onChange={(e)=>setStressLevel(Number(e.target.value))}>
                  {[1,2,3,4,5].map(n=><option key={n} value={n}>{n}</option>)}
                </select>

                <select value={growthSpeed} onChange={(e)=>setGrowthSpeed(Number(e.target.value))}>
                  {[1,2,3,4,5].map(n=><option key={n} value={n}>{n}</option>)}
                </select>

                <textarea
                  rows={3}
                  placeholder="Observation notes..."
                  value={note}
                  onChange={(e)=>
                    setNote(
                      e.target.value
                    )
                  }
                />

                <Button onClick={saveObservation}>
                  Save Observation
                </Button>
              </div>
            )}
          </Card>

          <Card>
            <h2 className="text-xl font-semibold mb-4">
              Last Observation
            </h2>

            {!activeRun ||
            activeRun.observations.length ===
              0 ? (
              <p>No observations yet</p>
            ) : (
              <>
                <p className="text-2xl font-semibold">
                  Health{" "}
                  {
                    activeRun
                      .observations[0]
                      .healthScore
                  }
                  /5
                </p>
              </>
            )}
          </Card>

          <Card>
            <h2 className="text-xl font-semibold mb-4">
              Recent Observations
            </h2>

            <div className="space-y-3">
              {activeRun?.observations.map(
                (
                  observation
                ) => (
                  <Card
                    key={
                      observation.id
                    }
                  >
                    Health{" "}
                    {
                      observation.healthScore
                    }
                    /5
                  </Card>
                )
              )}
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-semibold mb-4">
              Tasks
            </h2>

            {!activeRun ? (
              <p>No active run</p>
            ) : (
              <div className="space-y-5">
                <input
                  placeholder="Task title"
                  value={taskTitle}
                  onChange={(e)=>
                    setTaskTitle(
                      e.target.value
                    )
                  }
                />

                <textarea
                  placeholder="Optional note"
                  value={taskNote}
                  onChange={(e)=>
                    setTaskNote(
                      e.target.value
                    )
                  }
                />

                <input
                  type="date"
                  value={taskDueDate}
                  onChange={(e)=>
                    setTaskDueDate(
                      e.target.value
                    )
                  }
                />

                <Button onClick={createTask}>
                  Add Task
                </Button>

                {activeRun.tasks.map(
                  (task) => (
                    <Card
                      key={task.id}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p>
                            {
                              task.title
                            }
                          </p>
                        </div>

                        <Button
                          onClick={() =>
                            toggleTask(
                              task.id
                            )
                          }
                        >
                          {task.status ===
                          "DONE"
                            ? "Undo"
                            : "Done"}
                        </Button>
                      </div>
                    </Card>
                  )
                )}
              </div>
            )}
          </Card>

          <Card>
            <h2 className="text-xl font-semibold mb-4">
              Journal Timeline
            </h2>

            <div className="space-y-3">
              {activeRun?.journalEntries.map(
                (
                  entry
                ) => (
                  <Card
                    key={entry.id}
                  >
                    <p className="font-medium">
                      {entry.type}
                    </p>

                    <p className="text-sm">
                      {new Date(
                        entry.createdAt
                      ).toLocaleString()}
                    </p>

                    {entry.note && (
                      <p className="mt-2">
                        {
                          entry.note
                        }
                      </p>
                    )}
                  </Card>
                )
              )}
            </div>
          </Card>
        </div>
      </Container>
    </AppShell>
  );
}