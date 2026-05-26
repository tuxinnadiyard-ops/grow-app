import {
  NextResponse,
} from "next/server";

import { getEnvironment }
  from "@/lib/providers/environment";

type Params = {
  params: Promise<{
    tentId: string;
  }>;
};

export async function GET(
  _request: Request,
  { params }: Params
) {
  const { tentId } =
    await params;

  const data =
    await getEnvironment(
      tentId
    );

  return NextResponse.json(
    data
  );
}