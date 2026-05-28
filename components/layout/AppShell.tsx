"use client";

import { ReactNode } from "react";
import Sidebar from "./Sidebar";

type Props = {
  children: ReactNode;
};

export default function AppShell({
  children,
}: Props) {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text)]">
      <div className="flex min-h-screen">
        <Sidebar />

        <main className="min-w-0 flex-1">
          <div
            className="
              mx-auto
              flex
              min-h-screen
              w-full
              max-w-[1600px]
              flex-col
              px-4
              py-5
              sm:px-6
              sm:py-6
              lg:px-8
              lg:py-8
            "
          >
            <div
              className="
                flex-1
                rounded-[32px]
                border
                border-[var(--border)]
                bg-[rgba(23,29,26,0.65)]
                p-4
                backdrop-blur-sm
                sm:p-6
                lg:p-8
              "
            >
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}