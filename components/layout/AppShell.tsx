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
    <div
      className="
        min-h-screen
        bg-background
        text-text
      "
    >
      <div className="flex min-h-screen">
        <Sidebar />

        <main
          className="
            flex-1
            p-4
            sm:p-6
            lg:p-8
          "
        >
          {children}
        </main>
      </div>
    </div>
  );
}