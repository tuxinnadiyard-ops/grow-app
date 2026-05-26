import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { getFakeEnvironment } from "@/lib/fake-monitoring";

export async function POST() {
  try {
    /**
     * Get tents with active runs
     */
    const tents =
      await prisma.tent.findMany({
        include: {
          runs: true,
        },
      });

    const results = [];

    for (const tent of tents) {
      const activeRun =
        tent.runs.find(
          (run) => run.isActive
        );

      if (!activeRun) {
        continue;
      }

      /**
       * Read environment
       */
      const environment =
        getFakeEnvironment(
          tent.id
        );

      /**
       * Save snapshot
       * (throttled in API)
       */
      const response =
        await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/api/snapshots`,
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
                temperature:
                  environment.temperature,
                humidity:
                  environment.humidity,
                lightOn:
                  environment.lightOn,
              }),
          }
        );

      const result =
        await response.json();

      results.push({
        tentId: tent.id,
        tentName:
          tent.name,
        saved:
          result.saved ??
          false,
      });
    }

    return NextResponse.json({
      success: true,
      results,
    });
  } catch (error) {
    console.error(
      "Environment collector error:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Collector failed",
      },
      {
        status: 500,
      }
    );
  }
}