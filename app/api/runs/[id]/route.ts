import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    const { id } =
      await params;

    const run =
      await prisma.run.findUnique(
        {
          where: {
            id,
          },

          include: {
            tent: {
              select: {
                id: true,
                name: true,
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
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      run
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to load run",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PATCH(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    const { id } =
      await params;

    const body =
      await request.json();

    const run =
      await prisma.run.update(
        {
          where: {
            id,
          },

            data: {
            strain:
                body.strain,

            ...(body.finishRun && {
                isActive: false,
                endDate:
                new Date(),
            }),
            },
        }
      );

    return NextResponse.json(
      run
    );
    } catch (error) {
        console.error(
            "PATCH run error:",
            error
        );

        return NextResponse.json(
            {
            error:
                error instanceof Error
                ? error.message
                : "Failed to update run",
            },
            {
            status: 500,
            }
        );
    }
}