import { TentEnvironment }
  from "./types";

export async function getMockEnvironment(
  tentId: string
): Promise<TentEnvironment> {
  const seed =
    tentId.length;

  return {
    temperature:
      23 +
      (seed % 4) +
      Math.random(),

    humidity:
      55 +
      (seed % 10),

    vpd:
      1.0 +
      Math.random() *
        0.5,

    soilMoisture:
      40 +
      (seed % 20),

    co2:
      400 +
      seed * 10,

    lightsOn:
      new Date().getHours() >=
        6 &&
      new Date().getHours() <
        24,

    updatedAt:
      new Date().toISOString(),
  };
}