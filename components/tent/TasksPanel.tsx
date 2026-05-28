type Task = {
  id: string;
  title: string;
  note?: string | null;
  dueDate?: string | null;
  status: string;
};

type Props = {
  activeRun: unknown;
  taskTitle: string;
  setTaskTitle: (
    value: string
  ) => void;
  taskNote: string;
  setTaskNote: (
    value: string
  ) => void;
  taskDueDate: string;
  setTaskDueDate: (
    value: string
  ) => void;
  createTask: () => void;
  tasks: Task[];
  toggleTask: (
    taskId: string
  ) => void;
};

export default function TasksPanel({
  activeRun,
  taskTitle,
  setTaskTitle,
  taskNote,
  setTaskNote,
  taskDueDate,
  setTaskDueDate,
  createTask,
  tasks,
  toggleTask,
}: Props) {
  return (
    <section className="card">
      <div className="mb-5">
        <h2 className="text-xl font-semibold">
          Tasks
        </h2>

        <p className="text-sm text-[var(--text-muted)]">
          Tent-local reminders
        </p>
      </div>

      {!activeRun ? null : (
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
            {tasks.length === 0 ? (
              <div className="rounded-[28px] border border-dashed border-[var(--border)] bg-[var(--surface)] p-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] text-3xl">
                  ✅
                </div>

                <h3 className="text-lg font-semibold">
                  No tasks scheduled
                </h3>
              </div>
            ) : (
              tasks.map((task) => (
                <div
                  key={task.id}
                  className="rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-5"
                >
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
                          {
                            task.note
                          }
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
              ))
            )}
          </div>
        </div>
      )}
    </section>
  );
}