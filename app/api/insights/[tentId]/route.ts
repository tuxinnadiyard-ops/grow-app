import { prisma } from "@/lib/prisma";
import { getEnvironment }
  from "@/lib/providers/environment";
import { generateInsights }
  from "@/lib/insights";

import {
  NextRequest,
  NextResponse,
} from "next/server";

type Params = {
  params: Promise<{
    tentId: string;
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

    const { tentId } =
      await params;

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

          include: {
            runs: {
              where: {
                isActive:
                  true,
              },

              include: {
                observations:
                  {
                    orderBy:
                      {
                        createdAt:
                          "desc",
                      },
                    take: 1,
                  },

                tasks: true,

                photos: {
                  orderBy:
                    {
                      createdAt:
                        "desc",
                    },
                  take: 1,
                },
              },
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

    const run =
      tent.runs[0];

    const environment =
      await getEnvironment(
        tentId
      );

    const lastHealth =
      run?.observations?.[0]
        ?.healthScore;

    const openTasks =
      run?.tasks.filter(
        (t) =>
          t.status ===
          "TODO"
      ).length ?? 0;

    const lastPhoto =
      run?.photos?.[0];

    const lastPhotoDays =
      lastPhoto
        ? Math.floor(
            (
              Date.now() -
              new Date(
                lastPhoto.createdAt
              ).getTime()
            ) /
              (
                1000 *
                60 *
                60 *
                24
              )
          )
        : undefined;

    const insights =
      generateInsights({
        humidity:
          environment.humidity,
        healthScore:
          lastHealth,
        openTasks,
        lastPhotoDays,
      });

    return NextResponse.json(
      insights
    );
  } catch (error) {
    console.error(
      "INSIGHTS ERROR:",
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