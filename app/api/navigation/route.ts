import { prisma } from "@/lib/prisma";
import {
  NextRequest,
  NextResponse,
} from "next/server";

export async function GET(
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

    const growSpaces =
      await prisma.growSpace.findMany(
        {
          where: {
            userId:
              user.id,
          },

          include: {
            tents: {
              orderBy: {
                createdAt:
                  "asc",
              },
            },
          },
        }
      );

    const tents =
      growSpaces.flatMap(
        (space) =>
          space.tents
      );

    return NextResponse.json(
      tents
    );
  } catch (error) {
    console.error(
      "NAVIGATION ERROR:",
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