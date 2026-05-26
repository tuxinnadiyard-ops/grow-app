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