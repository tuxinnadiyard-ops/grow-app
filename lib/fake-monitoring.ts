type EnvironmentSnapshot = {
  temperature: number;
  humidity: number;
  lightOn: boolean;
};

function stringToSeed(value: string) {
  let hash = 0;

  for (let i = 0; i < value.length; i++) {
    hash =
      (hash << 5) -
      hash +
      value.charCodeAt(i);

    hash |= 0;
  }

  return Math.abs(hash);
}

export function getFakeEnvironment(
  tentId: string
): EnvironmentSnapshot {
  const now = new Date();

  const hour = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const tentSeed =
    stringToSeed(tentId);

  /**
   * Photoperiod
   * Lights ON 06:00 → 00:00
   */
  const lightOn =
    hour >= 6 && hour < 24;

  /**
   * Base environment
   */
  const baseTemp = lightOn
    ? 26
    : 21;

  const baseHumidity = lightOn
    ? 56
    : 64;

  /**
   * Smooth living movement
   * Changes every second
   */
  const time =
    Date.now() / 1000;

  const slowWave = Math.sin(
    time / 120 +
      tentSeed * 0.001
  );

  const fastWave = Math.sin(
    time / 20 +
      tentSeed * 0.002
  );

  /**
   * Temperature
   * Small realistic oscillation
   */
  const temperature =
    baseTemp +
    slowWave * 0.9 +
    fastWave * 0.4;

  /**
   * Humidity inversely reacts a bit
   */
  const humidity =
    baseHumidity -
    slowWave * 4 +
    fastWave * 2;

  return {
    temperature: Number(
      temperature.toFixed(1)
    ),
    humidity: Math.round(
      humidity
    ),
    lightOn,
  };
}