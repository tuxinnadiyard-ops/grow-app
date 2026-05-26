import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

const SNAPSHOT_INTERVAL_MS =
  5 * 60 * 1000;

export async function POST(
  request: NextRequest
) {
  try {
    const body =
      await request.json();

    const {
      runId,
      temperature,
      humidity,
      lightOn,
    } = body;

    if (!runId) {
      return NextResponse.json(
        {
          error:
            "runId is required",
        },
        {
          status: 400,
        }
      );
    }

    /**
     * Latest snapshot
     */
    const latestSnapshot =
      await prisma.sensorSnapshot.findFirst(
        {
          where: {
            runId,
          },

          orderBy: {
            timestamp:
              "desc",
          },
        }
      );

    /**
     * Throttle
     */
    if (latestSnapshot) {
      const now =
        Date.now();

      const latest =
        new Date(
          latestSnapshot.timestamp
        ).getTime();

      const diff =
        now - latest;

      if (
        diff <
        SNAPSHOT_INTERVAL_MS
      ) {
        return NextResponse.json(
          {
            saved: false,
            reason:
              "throttled",
          }
        );
      }
    }

    /**
     * Save snapshot
     */
    const snapshot =
      await prisma.sensorSnapshot.create(
        {
          data: {
            runId,
            temperature:
              Number(
                temperature
              ),
            humidity:
              Number(
                humidity
              ),
            lightOn:
              Boolean(
                lightOn
              ),
          },
        }
      );

    return NextResponse.json(
      {
        saved: true,
        snapshot,
      }
    );
  } catch (error) {
    console.error(
      "Snapshot POST error:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to create snapshot",
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET(
  request: NextRequest
) {
  try {
    const runId =
      request.nextUrl.searchParams.get(
        "runId"
      );

    if (!runId) {
      return NextResponse.json(
        {
          error:
            "runId is required",
        },
        {
          status: 400,
        }
      );
    }

    const snapshots =
      await prisma.sensorSnapshot.findMany(
        {
          where: {
            runId,
          },

          orderBy: {
            timestamp:
              "desc",
          },

          take: 100,
        }
      );

    return NextResponse.json(
      snapshots
    );
  } catch (error) {
    console.error(
      "Snapshot GET error:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to load snapshots",
      },
      {
        status: 500,
      }
    );
  }
}