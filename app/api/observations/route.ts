import { prisma } from "@/lib/prisma";
import {
  NextRequest,
  NextResponse,
} from "next/server";

function clamp(
  value: number
) {
  return Math.max(
    1,
    Math.min(5, value)
  );
}

export async function POST(
  request: NextRequest
) {
  try {
    const session =
      request.cookies.get(
        "session"
      )?.value;

    if (!session) {
      return NextResponse.json(
        {
          error:
            "Unauthorized",
        },
        { status: 401 }
      );
    }

    const user =
      await prisma.user.findUnique({
        where: {
          sessionToken:
            session,
        },
      });

    if (!user) {
      return NextResponse.json(
        {
          error:
            "Unauthorized",
        },
        { status: 401 }
      );
    }

    const body =
      await request.json();

    const {
      runId,
      vigour,
      leafColor,
      stressLevel,
      growthSpeed,
      note,
    } = body;

    const run =
      await prisma.run.findFirst(
        {
          where: {
            id: runId,
            tent: {
              growSpace: {
                userId:
                  user.id,
              },
            },
          },
        }
      );

    if (!run) {
      return NextResponse.json(
        {
          error:
            "Run not found",
        },
        { status: 404 }
      );
    }

    const safeVigour =
      clamp(vigour);

    const safeLeafColor =
      clamp(
        leafColor
      );

    const safeStress =
      clamp(
        stressLevel
      );

    const safeGrowth =
      clamp(
        growthSpeed
      );

    const healthScore =
      Math.round(
        (
          safeVigour +
          safeLeafColor +
          (6 -
            safeStress) +
          safeGrowth
        ) / 4
      );

    const observation =
      await prisma.observation.create(
        {
          data: {
            runId,

            vigour:
              safeVigour,

            leafColor:
              safeLeafColor,

            stressLevel:
              safeStress,

            growthSpeed:
              safeGrowth,

            healthScore,

            stressDetected:
              safeStress >=
              4,

            anomalyDetected:
              healthScore <=
              2,

            note,
          },
        }
      );

    return NextResponse.json(
      observation
    );
  } catch (error) {
    console.error(
      "OBSERVATION ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Internal server error",
      },
      { status: 500 }
    );
  }
}