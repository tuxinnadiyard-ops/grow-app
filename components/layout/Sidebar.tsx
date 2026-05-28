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

import CreateTentModal from "@/components/tent/CreateTentModal";

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

  const [
    createTentOpen,
    setCreateTentOpen,
  ] = useState(false);

  const [tentName, setTentName] =
    useState("");

  const [
    surfaceM2,
    setSurfaceM2,
  ] = useState("");

  const [
    creatingTent,
    setCreatingTent,
  ] = useState(false);

  const [
    mobileOpen,
    setMobileOpen,
  ] = useState(false);

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

  async function createTent() {
    if (!tentName.trim()) {
      return;
    }

    try {
      setCreatingTent(true);

      let growSpaceId:
        | string
        | undefined;

      // try to reuse an
      // existing grow space
      const growRes =
        await fetch(
          "/api/dashboard"
        );

      const growData =
        await growRes.json();

      growSpaceId =
        growData?.[0]
          ?.growSpaceId;

      // first setup
      if (!growSpaceId) {
        const res =
          await fetch(
            "/api/grow-spaces",
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify({
                name:
                  "My Grow Space",
                description:
                  "",
              }),
            }
          );

        const growSpace =
          await res.json();

        growSpaceId =
          growSpace.id;
      }

      await fetch("/api/tents", {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          name: tentName,
          surfaceM2:
            surfaceM2
              ? Number(
                  surfaceM2
                )
              : null,
          growSpaceId,
        }),
      });

      setTentName("");
      setSurfaceM2("");

      setCreateTentOpen(
        false
      );

      await loadTents();

      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setCreatingTent(false);
    }
  }

  const NavItem = ({
    href,
    label,
  }: {
    href: string;
    label: string;
  }) => {
    const active =
      pathname === href;

    return (
      <Link
        href={href}
        onClick={() =>
          setMobileOpen(
            false
          )
        }
        className={`
          block
          rounded-2xl
          px-4
          py-3
          text-sm
          transition
          min-h-[48px]
          flex
          items-center
          ${
            active
              ? "border bg-[var(--card)] border-[var(--border)]"
              : "hover:bg-[var(--card)]"
          }
        `}
      >
        {label}
      </Link>
    );
  };

  return (
    <>
      {/* mobile top bar */}
      <div className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-[var(--border)] bg-[rgba(15,20,18,0.92)] px-4 backdrop-blur md:hidden">
        <button
          onClick={() =>
            setMobileOpen(
              true
            )
          }
          className="rounded-2xl border border-[var(--border)] px-4 py-2"
        >
          ☰
        </button>

        <div className="text-center">
          <p className="text-sm font-semibold">
            Grow App
          </p>

          <p className="text-xs text-[var(--text-muted)]">
            Indoor journal
          </p>
        </div>

        <div className="w-10" />
      </div>

      {/* mobile overlay */}
      {mobileOpen && (
        <div
          onClick={() =>
            setMobileOpen(
              false
            )
          }
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
        />
      )}

      {/* sidebar */}
      <aside
        className={`
          fixed
          left-0
          top-0
          z-50
          flex
          h-full
          w-[290px]
          flex-col
          border-r
          border-[var(--border)]
          bg-[var(--surface)]
          p-5
          transition-transform
          duration-300
          md:translate-x-0
          md:sticky
          md:z-30
          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* brand */}
        <div className="mb-8">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] text-2xl">
            🌿
          </div>

          <h1 className="text-2xl font-semibold">
            Grow App
          </h1>

          <p className="mt-2 text-sm text-[var(--text-muted)]">
            Calm indoor grow
            journal
          </p>
        </div>

        {/* navigation */}
        <nav className="flex flex-1 flex-col">
          <div className="space-y-2">
            <NavItem
              href="/dashboard"
              label="Dashboard"
            />

            <NavItem
              href="/settings"
              label="Settings"
            />
          </div>

          <div className="mt-8 flex-1">
            <p className="mb-3 px-2 text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
              Grow Spaces
            </p>

            <div className="space-y-2">
              {tents.map(
                (tent) => (
                  <NavItem
                    key={tent.id}
                    href={`/tents/${tent.id}`}
                    label={tent.name}
                  />
                )
              )}
            </div>

            <button
              onClick={() =>
                setCreateTentOpen(
                  true
                )
              }
              className="
                mt-4
                flex
                min-h-[48px]
                w-full
                items-center
                justify-center
                rounded-2xl
                border
                border-dashed
                border-[var(--border)]
                bg-[var(--card)]
                px-4
                text-sm
                transition
                hover:border-[var(--primary)]
              "
            >
              + Add Tent
            </button>
          </div>
        </nav>

        {/* footer */}
        <div className="border-t border-[var(--border)] pt-5">
          <button
            onClick={logout}
            className="
              flex
              min-h-[48px]
              w-full
              items-center
              justify-center
              rounded-2xl
              border
              border-[var(--border)]
              bg-[var(--card)]
              text-sm
              transition
              hover:border-red-400/40
            "
          >
            Logout
          </button>
        </div>
      </aside>
      <CreateTentModal
        open={createTentOpen}
        tentName={tentName}
        setTentName={
          setTentName
        }
        surfaceM2={
          surfaceM2
        }
        setSurfaceM2={
          setSurfaceM2
        }
        creatingTent={
          creatingTent
        }
        onClose={() =>
          setCreateTentOpen(
            false
          )
        }
        onCreate={
          createTent
        }
      />
    </>
  );
}