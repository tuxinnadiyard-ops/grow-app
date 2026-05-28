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
import { useToast } from "@/components/layout/AppShell";
import TentHeader from "@/components/tent/TentHeader";
import QuickStatus from "@/components/tent/QuickStatus";
import QuickActions from "@/components/tent/QuickActions";
import ObservationCard from "@/components/tent/ObservationCard";
import Timeline from "@/components/tent/Timeline";
import StartCultivationModal from "@/components/tent/StartCultivationModal";
import PhotosPanel from "@/components/tent/PhotosPanel";
import TasksPanel from "@/components/tent/TasksPanel";

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

export default function TentPage() {

  const { showToast } =
    useToast();

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

      showToast(
        "Cultivation started"
      );

      await loadTent();
    } catch (error) {
      console.error(error);

      showToast(
        "Something went wrong",
        "error"
      );
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

    showToast(
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

    showToast("Task added");
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

    showToast(
      "Photo added"
    );
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

        showToast(
          "Something went wrong",
          "error"
        );
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

        showToast(
          "Something went wrong",
          "error"
        );
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
                {/* HEADER */}
                <TentHeader
                  tentName={tent.name}
                  activeRun={activeRun}
                  dayCount={dayCount}
                  onDashboard={() =>
                    router.push(
                      "/dashboard"
                    )
                  }
                />

                {/* QUICK STATUS */}
                <QuickStatus
                  environment={
                    environment
                  }
                />

                {/* QUICK ACTIONS */}
                <QuickActions
                  onWatering={() =>
                    quickJournalEntry(
                      "WATERING"
                    )
                  }
                  onFeeding={() =>
                    quickJournalEntry(
                      "FEEDING"
                    )
                  }
                  onNote={() =>
                    quickJournalEntry(
                      "NOTE"
                    )
                  }
                  onIssue={() =>
                    quickJournalEntry(
                      "ISSUE"
                    )
                  }
                />

                {/* DAILY OBSERVATION */}
                <ObservationCard
                  activeRun={activeRun}
                  healthScore={
                    healthScore
                  }
                  setHealthScore={
                    setHealthScore
                  }
                  vigour={vigour}
                  setVigour={
                    setVigour
                  }
                  leafColor={
                    leafColor
                  }
                  setLeafColor={
                    setLeafColor
                  }
                  stressLevel={
                    stressLevel
                  }
                  setStressLevel={
                    setStressLevel
                  }
                  growthSpeed={
                    growthSpeed
                  }
                  setGrowthSpeed={
                    setGrowthSpeed
                  }
                  note={note}
                  setNote={setNote}
                  onSave={
                    saveObservation
                  }
                />

                {/* JOURNAL */}
                <Timeline
                  entries={
                    activeRun
                      ?.journalEntries ?? []
                  }
                />

                {/* TASKS + PHOTOS */}
                <div className="grid gap-6 lg:grid-cols-2">
                  <TasksPanel
                    activeRun={activeRun}
                    taskTitle={taskTitle}
                    setTaskTitle={
                      setTaskTitle
                    }
                    taskNote={taskNote}
                    setTaskNote={
                      setTaskNote
                    }
                    taskDueDate={
                      taskDueDate
                    }
                    setTaskDueDate={
                      setTaskDueDate
                    }
                    createTask={
                      createTask
                    }
                    tasks={
                      activeRun?.tasks ??
                      []
                    }
                    toggleTask={
                      toggleTask
                    }
                  />

                  <PhotosPanel
                    activeRun={activeRun}
                    photoNote={
                      photoNote
                    }
                    setPhotoNote={
                      setPhotoNote
                    }
                    setPhotoFile={
                      setPhotoFile
                    }
                    uploadPhoto={
                      uploadPhoto
                    }
                    photos={
                      activeRun?.photos ??
                      []
                    }
                  />
                </div>
              </div>
            );
          })()
        )}

        <StartCultivationModal
          open={startRunOpen}
          strain={strain}
          setStrain={setStrain}
          creatingRun={
            creatingRun
          }
          onClose={() =>
            setStartRunOpen(
              false
            )
          }
          onStart={
            startCultivation
          }
        />

      </Container>
    </AppShell>
  );
}