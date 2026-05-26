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

    const body =
      await request.json();

    const {
      runId,
      type,
      note,
      metadata,
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

    const entry =
      await prisma.journalEntry.create(
        {
          data: {
            runId,
            type,
            note,
            metadata,
          },
        }
      );

    return NextResponse.json(
      entry
    );
  } catch (error) {
    console.error(
      "JOURNAL ERROR:",
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