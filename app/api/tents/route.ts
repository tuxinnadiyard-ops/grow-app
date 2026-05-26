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
      name,
      surfaceM2,
      growSpaceId,
    } = body;

    const growSpace =
      await prisma.growSpace.findFirst(
        {
          where: {
            id: growSpaceId,
            userId: user.id,
          },
        }
      );

    if (!growSpace) {
      return NextResponse.json(
        {
          error:
            "Grow space not found",
        },
        { status: 404 }
      );
    }

    const tent =
      await prisma.tent.create({
        data: {
          name,
          surfaceM2,
          growSpaceId,
        },
      });

    return NextResponse.json(
      tent
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