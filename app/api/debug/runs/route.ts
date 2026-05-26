import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const tents =
    await prisma.tent.findMany({
      include: {
        runs: true,
      },
    });

  return NextResponse.json(
    tents
  );
}