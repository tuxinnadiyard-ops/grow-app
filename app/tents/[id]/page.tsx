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

type Environment = {
  temperature: number;
  humidity: number;
  vpd: number;
  soilMoisture: number;
  co2: number;
  lightsOn: boolean;
  updatedAt: string;
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

  const [
    environment,
    setEnvironment,
  ] = useState<Environment | null>(
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

  const [photoFile, setPhotoFile] =
    useState<File | null>(null);

  const [photoNote, setPhotoNote] =
    useState("");

  async function loadEnvironment() {
    const res =
      await fetch(
        `/api/environment/${tentId}`
      );

    const data =
      await res.json();

    setEnvironment(data);
  }

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
      loadEnvironment();
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

            {!environment ? (
              <p
                style={{
                  color:
                    "var(--text-muted)",
                }}
              >
                Loading environment...
              </p>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <Card>
                    🌡{" "}
                    {environment.temperature.toFixed(
                      1
                    )}
                    °C
                  </Card>

                  <Card>
                    💧 RH{" "}
                    {
                      environment.humidity
                    }
                    %
                  </Card>

                  <Card>
                    🍃 VPD{" "}
                    {environment.vpd.toFixed(
                      1
                    )}
                  </Card>

                  <Card>
                    🌱 Soil{" "}
                    {
                      environment.soilMoisture
                    }
                    %
                  </Card>

                  <Card>
                    🫧 CO₂{" "}
                    {environment.co2}
                  </Card>

                  <Card>
                    {environment.lightsOn
                      ? "💡 Lights ON"
                      : "🌙 Lights OFF"}
                  </Card>
                </div>

                <p
                  className="text-xs mt-4"
                  style={{
                    color:
                      "var(--text-muted)",
                  }}
                >
                  Updated{" "}
                  {new Date(
                    environment.updatedAt
                  ).toLocaleTimeString()}
                </p>
              </>
            )}
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
              Photos
            </h2>

            {!activeRun ? (
              <p>No active run</p>
            ) : (
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
                  placeholder="Optional photo note"
                  value={photoNote}
                  onChange={(e) =>
                    setPhotoNote(
                      e.target.value
                    )
                  }
                />

                <Button
                  onClick={uploadPhoto}
                >
                  Add Photo
                </Button>

                <div className="grid grid-cols-2 gap-3">
                  {activeRun.photos?.map(
                    (photo) => (
                      <Card
                        key={photo.id}
                      >
                        <img
                          src={photo.url}
                          alt="Grow photo"
                          className="rounded-xl mb-2 w-full object-cover"
                        />

                        <p className="text-xs"
                          style={{
                            color:"var(--text-muted)",
                          }}>
                          {new Date(photo.createdAt).toLocaleString()}
                        </p>

                        {photo.note && (
                          <p className="text-sm mt-2">
                            {photo.note}
                          </p>
                        )}
                      </Card>
                    )
                  )}
                </div>
              </div>
            )}
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
              Timeline Intelligence
            </h2>

            <div className="space-y-2">
              {tent.timeline?.length === 0 ? (
                <p
                  style={{
                    color:
                      "var(--text-muted)",
                  }}
                >
                  No timeline events
                </p>
              ) : (
                tent.timeline?.map(
                  (event) => (
                    <Card
                      key={
                        event.id
                      }
                    >
                      <div className="flex justify-between items-start gap-3">
                        <div>
                          <p className="font-medium text-sm">
                            {
                              event.title
                            }
                          </p>

                          {event.subtitle && (
                            <p
                              className="text-xs mt-1"
                              style={{
                                color:
                                  "var(--text-muted)",
                              }}
                            >
                              {
                                event.subtitle
                              }
                            </p>
                          )}
                        </div>

                        <p
                          className="text-xs"
                          style={{
                            color:
                              "var(--text-muted)",
                          }}
                        >
                          {new Date(
                            event.createdAt
                          ).toLocaleString()}
                        </p>
                      </div>
                    </Card>
                  )
                )
              )}
            </div>
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