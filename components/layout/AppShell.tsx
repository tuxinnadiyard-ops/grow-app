"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";

import Sidebar from "./Sidebar";
import Toast from "@/components/ui/Toast";

type ToastType =
  | "success"
  | "error";

type ToastState = {
  message: string;
  type: ToastType;
};

type ToastContextType = {
  showToast: (
    message: string,
    type?: ToastType
  ) => void;
};

const ToastContext =
  createContext<ToastContextType>({
    showToast: () => {},
  });

export function useToast() {
  return useContext(
    ToastContext
  );
}

type Props = {
  children: ReactNode;
};

export default function AppShell({
  children,
}: Props) {
  const [toast, setToast] =
    useState<ToastState | null>(
      null
    );

  function showToast(
    message: string,
    type: ToastType =
      "success"
  ) {
    setToast({
      message,
      type,
    });

    setTimeout(() => {
      setToast(null);
    }, 2500);
  }

  return (
    <ToastContext.Provider
      value={{
        showToast,
      }}
    >
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

        {toast && (
          <Toast
            message={
              toast.message
            }
            type={toast.type}
          />
        )}
      </div>
    </ToastContext.Provider>
  );
}