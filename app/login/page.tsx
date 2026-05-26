"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password,
    setPassword] =
    useState("");

  const [message,
    setMessage] =
    useState("");

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    const res = await fetch(
      "/api/login",
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
        data.error
      );
      return;
    }

    router.push(
      "/dashboard"
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm rounded-xl border p-6 shadow">
        <h1 className="text-2xl font-bold mb-6">
          Login
        </h1>

        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-4"
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target
                  .value
              )
            }
            className="w-full rounded border p-3"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target
                  .value
              )
            }
            className="w-full rounded border p-3"
          />

          <button className="w-full rounded bg-black text-white p-3">
            Login
          </button>
        </form>

        {message && (
          <p className="mt-4 text-sm">
            {message}
          </p>
        )}
      </div>
    </main>
  );
}