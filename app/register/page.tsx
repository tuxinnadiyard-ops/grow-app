"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password,
    setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [message,
    setMessage] =
    useState("");

  const [success,
    setSuccess] =
    useState(false);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setMessage("");
    setSuccess(false);

    if (
      password !==
      confirmPassword
    ) {
      setMessage(
        "Passwords do not match."
      );
      return;
    }

    const res = await fetch(
      "/api/register",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data =
      await res.json();

    if (!res.ok) {
      setMessage(
        data.error ??
          "Unable to create account."
      );
      return;
    }

    setSuccess(true);

    setMessage(
      "Account created successfully ✅"
    );

    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--background)] text-[var(--text)]">
      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-120px] top-[-80px] h-[320px] w-[320px] rounded-full bg-green-500/10 blur-[100px]" />

        <div className="absolute bottom-[-120px] right-[-120px] h-[280px] w-[280px] rounded-full bg-emerald-400/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-md items-center px-5 py-8">
        <div className="w-full rounded-[32px] border border-[var(--border)] bg-[rgba(31,40,36,0.82)] p-6 shadow-2xl backdrop-blur-xl">
          {/* hero */}
          <div className="mb-8 text-center">
            <div className="mb-5 flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-4xl">
                🌱
              </div>
            </div>

            <h1 className="mb-2 text-4xl font-semibold tracking-tight">
              Create account
            </h1>

            <p className="mb-5 text-xs uppercase tracking-[0.24em] text-[var(--primary)]">
              Grow App
            </p>

            <p className="mx-auto max-w-xs text-base leading-relaxed text-[var(--text-muted)]">
              Start tracking your
              cultivation with
              clarity.
            </p>
          </div>

          {/* form */}
          <form
            onSubmit={
              handleSubmit
            }
            className="space-y-4"
          >
            <div>
              <label className="mb-2 block text-sm font-medium">
                Email
              </label>

              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target
                      .value
                  )
                }
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Password
              </label>

              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target
                      .value
                  )
                }
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Confirm password
              </label>

              <input
                type="password"
                placeholder="••••••••"
                value={
                  confirmPassword
                }
                onChange={(e) =>
                  setConfirmPassword(
                    e.target
                      .value
                  )
                }
              />
            </div>

            {message && (
              <div
                className={`rounded-2xl px-4 py-3 text-sm ${
                  success
                    ? "border border-green-500/20 bg-green-500/10 text-green-300"
                    : "border border-red-500/20 bg-red-500/10 text-red-300"
                }`}
              >
                {message}
              </div>
            )}

            <button
              type="submit"
              className="btn-primary mt-2 w-full"
            >
              Create account
            </button>
          </form>

          {/* divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-[var(--border)]" />

            <span className="text-sm text-[var(--text-muted)]">
              already have an
              account
            </span>

            <div className="h-px flex-1 bg-[var(--border)]" />
          </div>

          {/* login */}
          <button
            type="button"
            onClick={() =>
              router.push(
                "/login"
              )
            }
            className="flex min-h-[48px] w-full items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 text-sm font-medium transition hover:border-[var(--primary)]"
          >
            Sign in
          </button>

          {/* footer */}
          <div className="mt-8 border-t border-[var(--border)] pt-5">
            <div className="flex items-center justify-center gap-8 text-center">
              <div>
                <p className="text-lg">
                  🌱
                </p>
                <p className="mt-1 text-xs text-[var(--text-muted)]">
                  Track
                </p>
              </div>

              <div>
                <p className="text-lg">
                  📈
                </p>
                <p className="mt-1 text-xs text-[var(--text-muted)]">
                  Understand
                </p>
              </div>

              <div>
                <p className="text-lg">
                  ✨
                </p>
                <p className="mt-1 text-xs text-[var(--text-muted)]">
                  Improve
                </p>
              </div>
            </div>

            <p className="mt-5 text-center text-sm text-[var(--text-muted)]">
              Maximum insight.
              Minimum friction.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}