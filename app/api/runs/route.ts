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
      tentId,
      strain,
    } = body;

    const tent =
      await prisma.tent.findFirst(
        {
          where: {
            id: tentId,
            growSpace: {
              userId:
                user.id,
            },
          },
        }
      );

    if (!tent) {
      return NextResponse.json(
        {
          error:
            "Tent not found",
        },
        { status: 404 }
      );
    }

    await prisma.run.updateMany(
      {
        where: {
          tentId,
          isActive: true,
        },
        data: {
          isActive:
            false,
        },
      }
    );

    const run =
      await prisma.run.create({
        data: {
          tentId,
          strain,
          stage:
            "VEG",
          isActive:
            true,
        },
      });

    return NextResponse.json(
      run
    );
  } catch (error) {
    console.error(
      "RUN API ERROR:",
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
