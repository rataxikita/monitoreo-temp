import { config } from "../config/env";

export const validateTemperature = (temperature: number): boolean => {
  return (
    !isNaN(temperature) &&
    temperature >= config.TEMPERATURE_MIN &&
    temperature <= config.TEMPERATURE_MAX
  );
};

export const validateThreshold = (threshold: number): string | null => {
  if (isNaN(threshold)) {
    return "El valor debe ser un número";
  }
  if (threshold < config.TEMPERATURE_MIN) {
    return `El umbral no puede ser menor a ${config.TEMPERATURE_MIN}°C`;
  }
  if (threshold > config.TEMPERATURE_MAX) {
    return `El umbral no puede ser mayor a ${config.TEMPERATURE_MAX}°C`;
  }
  return null;
};

export const validateTimestamp = (timestamp: string): boolean => {
  const date = new Date(timestamp);
  return date instanceof Date && !isNaN(date.getTime());
};

export const isAnomalousTemperature = (
  temperature: number,
  previousTemperature: number
): boolean => {
  // Detecta cambios bruscos de temperatura (más de 5 grados)
  const MAX_TEMPERATURE_CHANGE = 5;
  return Math.abs(temperature - previousTemperature) > MAX_TEMPERATURE_CHANGE;
}; 