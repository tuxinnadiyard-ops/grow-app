import { getMockEnvironment }
  from "./mock";

export async function getEnvironment(
  tentId: string
) {
  return getMockEnvironment(
    tentId
  );
}