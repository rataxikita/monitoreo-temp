import { config } from "../config/env";

export const generateRandomTemperature = () => {
  const min = config.TEMPERATURE_MIN;
  const max = config.TEMPERATURE_MAX;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}; 