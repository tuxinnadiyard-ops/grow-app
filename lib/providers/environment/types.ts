export type TentEnvironment =
  {
    temperature: number;
    humidity: number;
    vpd: number;
    soilMoisture: number;
    co2: number;
    lightsOn: boolean;
    updatedAt: string;
  };