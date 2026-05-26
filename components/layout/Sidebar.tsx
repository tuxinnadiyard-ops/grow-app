"use client";

import Link from "next/link";
import {
  usePathname,
  useRouter,
} from "next/navigation";
import {
  useEffect,
  useState,
} from "react";

type Tent = {
  id: string;
  name: string;
};

export default function Sidebar() {
  const pathname =
    usePathname();

  const router =
    useRouter();

  const [tents, setTents] =
    useState<Tent[]>([]);

  async function loadTents() {
    const res =
      await fetch(
        "/api/navigation"
      );

    const data =
      await res.json();

    setTents(data);
  }

  useEffect(() => {
    loadTents();
  }, []);

  async function logout() {
    await fetch(
      "/api/logout",
      {
        method: "POST",
      }
    );

    router.push(
      "/login"
    );
  }

  return (
    <aside
      className="
        hidden
        md:flex
        w-72
        border-r
        border-border
        bg-surface
        p-5
        flex-col
      "
    >
      <div className="mb-8">
        <h1 className="text-xl font-semibold">
          Grow App
        </h1>

        <p className="text-sm text-muted mt-1">
          Calm indoor grow
          journal
        </p>
      </div>

      <nav className="space-y-2 flex-1">
        <Link
          href="/dashboard"
          className={`
            rounded-2xl
            px-4
            py-3
            text-sm
            block
            transition
            ${
              pathname ===
              "/dashboard"
                ? "bg-card border border-border"
                : "hover:bg-card"
            }
          `}
        >
          Dashboard
        </Link>

        {tents.length >
          0 && (
          <div className="pt-4">
            <p
              className="
                text-xs
                uppercase
                mb-2
              "
              style={{
                color:
                  "var(--text-muted)",
              }}
            >
              Tents
            </p>

            <div className="space-y-2">
              {tents.map(
                (
                  tent
                ) => {
                  const active =
                    pathname ===
                    `/tents/${tent.id}`;

                  return (
                    <Link
                      key={
                        tent.id
                      }
                      href={`/tents/${tent.id}`}
                      className={`
                        rounded-2xl
                        px-4
                        py-3
                        text-sm
                        block
                        transition
                        ${
                          active
                            ? "bg-card border border-border"
                            : "hover:bg-card"
                        }
                      `}
                    >
                      {
                        tent.name
                      }
                    </Link>
                  );
                }
              )}
            </div>
          </div>
        )}
      </nav>

      <button
        onClick={logout}
        className="
          rounded-2xl
          border
          border-border
          p-3
          text-sm
          hover:bg-card
          transition
        "
      >
        Logout
      </button>
    </aside>
  );
}