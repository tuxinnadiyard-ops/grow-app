"use client";

import {
  useEffect,
  useState,
} from "react";

export default function usePreferences() {
  const [
    temperatureUnit,
    setTemperatureUnit,
  ] = useState("C");

  const [
    timeFormat,
    setTimeFormat,
  ] = useState("24h");

  useEffect(() => {
    const temp =
      localStorage.getItem(
        "temperatureUnit"
      );

    const time =
      localStorage.getItem(
        "timeFormat"
      );

    if (temp)
      setTemperatureUnit(
        temp
      );

    if (time)
      setTimeFormat(time);
  }, []);

  function formatTemperature(
    celsius?: number | null
  ) {
    if (
      celsius === undefined ||
      celsius === null
    ) {
      return "--";
    }

    if (
      temperatureUnit ===
      "F"
    ) {
      return Math.round(
        celsius * 1.8 + 32
      );
    }

    return Math.round(
      celsius
    );
  }

  function formatDate(
    date: string
  ) {
    return new Date(
      date
    ).toLocaleString(
      undefined,
      {
        hour12:
          timeFormat ===
          "12h",
      }
    );
  }

  return {
    temperatureUnit,
    timeFormat,
    formatTemperature,
    formatDate,
  };
}