import { prisma } from "@/lib/prisma";
import {
  NextRequest,
  NextResponse,
} from "next/server";

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

    const {
      taskId,
    } =
      await request.json();

    const task =
      await prisma.task.findFirst(
        {
          where: {
            id: taskId,
            run: {
              tent: {
                growSpace: {
                  userId:
                    user.id,
                },
              },
            },
          },
        }
      );

    if (!task) {
      return NextResponse.json(
        {
          error:
            "Task not found",
        },
        { status: 404 }
      );
    }

    const updated =
      await prisma.task.update(
        {
          where: {
            id: taskId,
          },
          data: {
            status:
              task.status ===
              "TODO"
                ? "DONE"
                : "TODO",
          },
        }
      );

    return NextResponse.json(
      updated
    );
  } catch (error) {
    console.error(
      "TASK TOGGLE ERROR:",
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