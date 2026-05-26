import { prisma } from "@/lib/prisma";
import {
  NextRequest,
  NextResponse,
} from "next/server";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  request: NextRequest,
  { params }: Params
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
        include: {
          growSpaces: {
            include: {
              tents: true,
            },
          },
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

    const { id } =
      await params;

    const ownsTent =
      user.growSpaces.some(
        (space) =>
          space.tents.some(
            (tent) =>
              tent.id === id
          )
      );

    if (!ownsTent) {
      return NextResponse.json(
        {
          error:
            "Tent not found",
        },
        { status: 404 }
      );
    }

    const tent =
      await prisma.tent.findUnique(
        {
          where: {
            id,
          },

          include: {
            runs: {
              include: {
                journalEntries:
                  {
                    orderBy:
                      {
                        createdAt:
                          "desc",
                      },
                    take: 20,
                  },

                observations:
                  {
                    orderBy:
                      {
                        createdAt:
                          "desc",
                      },
                    take: 10,
                  },
                tasks: 
                  {
                    orderBy: {
                      createdAt: "desc",
                    },
                  },
                photos: {
                  orderBy: {
                    createdAt:
                      "desc",
                  },
                },
              },
            },
          },
        }
      );

    const timeline =
      tent?.runs.flatMap(
        (run) => [
          ...run.journalEntries.map((entry) => ({
            id: entry.id,
            type: "JOURNAL",
            createdAt: entry.createdAt,
            title:
              entry.type === "WATERING"
                ? "💧 Watering"
                : entry.type === "FEEDING"
                ? "🧪 Feeding"
                : entry.type === "NOTE"
                ? "📝 Note"
                : "⚠ Issue",
            subtitle:
              entry.note,
          })),
          ...run.observations.map((obs) => ({
            id: obs.id,
            type: "OBSERVATION",
            createdAt:
              obs.createdAt,
            title: `🟢 Health ${obs.healthScore}/5`,
            subtitle: `V${obs.vigour} • L${obs.leafColor} • S${obs.stressLevel} • G${obs.growthSpeed}`,
          })),
          ...run.photos.map((photo) => ({
            id: photo.id,
            type: "PHOTO",
            createdAt:
              photo.createdAt,
            title:
              "📷 Photo",
            subtitle:
              photo.note ??
              "Grow photo",
          })),
          ...run.tasks.map((task) => ({
            id: task.id,
            type: "TASK",
            createdAt:
              task.createdAt,
            title:
              task.status ===
              "DONE"
                ? `☑ ${task.title}`
                : `☐ ${task.title}`,
            subtitle:
              task.dueDate
                ? `Due ${new Date(task.dueDate).toLocaleDateString()}`
                : undefined,
          })),
        ]
      ).sort(
        (a, b) =>
          new Date(
            b.createdAt
          ).getTime() -
          new Date(
            a.createdAt
          ).getTime()
      ) ?? [];

    return NextResponse.json(
      {
        ...tent,
        timeline,
      }
    );
  } catch (error) {
    console.error(
      "TENT API ERROR:",
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