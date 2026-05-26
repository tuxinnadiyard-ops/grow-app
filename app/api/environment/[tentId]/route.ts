import { NextRequest, NextResponse } from "next/server";
import { getFakeEnvironment } from "@/lib/fake-monitoring";

export async function GET(
  request: NextRequest,
  context: {
    params: Promise<{
      tentId: string;
    }>;
  }
) {
  try {
    const { tentId } =
      await context.params;

    const environment =
      getFakeEnvironment(tentId);

    return NextResponse.json(
      environment
    );
  } catch (error) {
    console.error(
      "Environment API error:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to load environment",
      },
      {
        status: 500,
      }
    );
  }
}