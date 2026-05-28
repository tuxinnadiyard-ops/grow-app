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

type Run = {
  id: string;
  strain: string;
  breeder: string | null;
  medium: string | null;
  potSize: string | null;
  nutrientLine:
    | string
    | null;
  phenotypeNotes:
    | string
    | null;
  stage: string;
  startDate: string;
  endDate:
    | string
    | null;
  isActive: boolean;
  tent: {
    id: string;
    name: string;
  };
};

export default function RunPage() {
  const params =
    useParams();

  const router =
    useRouter();

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [run, setRun] =
    useState<Run | null>(
      null
    );

  const [form, setForm] =
    useState({
      strain: "",
      breeder: "",
      medium: "",
      potSize: "",
      nutrientLine:
        "",
      phenotypeNotes:
        "",
    });

  useEffect(() => {
    async function loadRun() {
      try {
        const response =
          await fetch(
            `/api/runs/${params.id}`
          );

        if (
          !response.ok
        ) {
          throw new Error(
            "Failed to load run"
          );
        }

        const data =
          await response.json();

        setRun(data);

        setForm({
          strain:
            data.strain ??
            "",
          breeder:
            data.breeder ??
            "",
          medium:
            data.medium ??
            "",
          potSize:
            data.potSize ??
            "",
          nutrientLine:
            data.nutrientLine ??
            "",
          phenotypeNotes:
            data.phenotypeNotes ??
            "",
        });
      } catch (
        error
      ) {
        console.error(
          error
        );
      } finally {
        setLoading(
          false
        );
      }
    }

    loadRun();
  }, [params.id]);

  async function saveRun() {
    try {
      setSaving(true);

      const response =
        await fetch(
          `/api/runs/${params.id}`,
          {
            method:
              "PATCH",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
            JSON.stringify({
                strain:
                form.strain,
            }),
          }
        );

      if (
        !response.ok
      ) {
        const data =
          await response.json();

        throw new Error(
          data.error ??
            "Failed to save run"
        );
      }

      alert(
        "Run updated"
      );
    } catch (
      error
    ) {
      console.error(
        error
      );

      alert(
        error instanceof
          Error
          ? error.message
          : "Failed to save run"
      );
    } finally {
      setSaving(false);
    }
  }

  async function finishRun() {
    const confirmed =
      window.confirm(
        "Finish this run?"
      );

    if (!confirmed) {
      return;
    }

    try {
      setSaving(true);

      const response =
        await fetch(
          `/api/runs/${params.id}`,
          {
            method:
              "PATCH",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
            JSON.stringify({
                strain:
                form.strain,
                finishRun:
                true,
            }),
          }
        );

      if (
        !response.ok
      ) {
        const data =
          await response.json();

        throw new Error(
          data.error ??
            "Failed to finish run"
        );
      }

      alert(
        "Run finished"
      );

      router.push(
        `/tents/${run?.tent.id}`
      );
    } catch (
      error
    ) {
      console.error(
        error
      );

      alert(
        error instanceof
          Error
          ? error.message
          : "Failed to finish run"
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <AppShell>
      <Container className="space-y-6 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold">
              Run Details
            </h1>

            {run && (
              <p
                style={{
                  color:
                    "var(--text-muted)",
                }}
              >
                {
                  run.tent
                    .name
                }
                {" · "}
                {
                  run.stage
                }
              </p>
            )}
          </div>

          <Button
            variant="secondary"
            onClick={() =>
              router.push(
                `/tents/${run?.tent.id}`
              )
            }
          >
            Back to Tent
          </Button>
        </div>

        {loading && (
          <p>
            Loading...
          </p>
        )}

        {!loading &&
          run && (
            <Card className="space-y-4">
              <h2 className="text-xl font-semibold">
                Run Metadata
              </h2>

              <InputField
                label="Strain"
                value={
                  form.strain
                }
                onChange={(
                  value
                ) =>
                  setForm({
                    ...form,
                    strain:
                      value,
                  })
                }
              />

              <InputField
                label="Breeder"
                value={
                  form.breeder
                }
                onChange={(
                  value
                ) =>
                  setForm({
                    ...form,
                    breeder:
                      value,
                  })
                }
              />

              <InputField
                label="Medium"
                value={
                  form.medium
                }
                onChange={(
                  value
                ) =>
                  setForm({
                    ...form,
                    medium:
                      value,
                  })
                }
              />

              <InputField
                label="Pot Size"
                value={
                  form.potSize
                }
                onChange={(
                  value
                ) =>
                  setForm({
                    ...form,
                    potSize:
                      value,
                  })
                }
              />

              <InputField
                label="Nutrient Line"
                value={
                  form.nutrientLine
                }
                onChange={(
                  value
                ) =>
                  setForm({
                    ...form,
                    nutrientLine:
                      value,
                  })
                }
              />

              <div>
                <label className="block text-sm mb-2">
                  Phenotype
                  Notes
                </label>

                <textarea
                  value={
                    form.phenotypeNotes
                  }
                  onChange={(
                    e
                  ) =>
                    setForm({
                      ...form,
                      phenotypeNotes:
                        e.target
                          .value,
                    })
                  }
                  className="w-full rounded-xl border p-3"
                  style={{
                    borderColor:
                      "var(--border)",
                    background:
                      "var(--surface)",
                  }}
                  rows={4}
                />
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={
                    saveRun
                  }
                  disabled={
                    saving
                  }
                >
                  {saving
                    ? "Saving..."
                    : "Save Run"}
                </Button>

                <Button
                  variant="secondary"
                  onClick={
                    finishRun
                  }
                  disabled={
                    saving
                  }
                >
                  Finish Run
                </Button>
              </div>
            </Card>
          )}
      </Container>
    </AppShell>
  );
}

function InputField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (
    value: string
  ) => void;
}) {
  return (
    <div>
      <label className="block text-sm mb-2">
        {label}
      </label>

      <input
        value={value}
        onChange={(e) =>
          onChange(
            e.target.value
          )
        }
        className="w-full rounded-xl border p-3"
        style={{
          borderColor:
            "var(--border)",
          background:
            "var(--surface)",
        }}
      />
    </div>
  );
}