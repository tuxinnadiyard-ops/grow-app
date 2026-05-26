import { prisma } from "@/lib/prisma";
import {
  NextRequest,
  NextResponse,
} from "next/server";

import fs from "fs/promises";
import path from "path";

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

    const formData =
      await request.formData();

    const runId =
      formData.get(
        "runId"
      ) as string;

    const note =
      formData.get(
        "note"
      ) as string;

    const file =
      formData.get(
        "photo"
      ) as File;

    if (!file) {
      return NextResponse.json(
        {
          error:
            "Photo required",
        },
        { status: 400 }
      );
    }

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

    const bytes =
      await file.arrayBuffer();

    const buffer =
      Buffer.from(bytes);

    const fileName =
      `${Date.now()}-${
        file.name
      }`;

    const uploadDir =
      path.join(
        process.cwd(),
        "public",
        "uploads"
      );

    await fs.mkdir(
      uploadDir,
      {
        recursive:
          true,
      }
    );

    const filePath =
      path.join(
        uploadDir,
        fileName
      );

    await fs.writeFile(
      filePath,
      buffer
    );

    const url =
      `/uploads/${fileName}`;

    const photo =
      await prisma.photo.create(
        {
          data: {
            runId,
            note,
            url,
          },
        }
      );

    return NextResponse.json(
      photo
    );
  } catch (error) {
    console.error(
      "PHOTO ERROR:",
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