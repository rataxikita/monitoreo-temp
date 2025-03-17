import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import { config } from "../../config/env";
import { useThreshold } from "../../contexts/ThresholdContext";
import { sendTemperatureAlert } from "../../utils/notifications";
import { TemperatureChart } from "../../components/TemperatureChart";
import { validateTemperature, isAnomalousTemperature } from "../../utils/validations";

// Definimos los tipos para TypeScript
interface TemperatureResponse {
  temperature?: number;
}

const saveToHistory = async (temperature: number) => {
  try {
    await fetch(`${config.API_URL}/history`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        temperatura: temperature,
        fecha: new Date().toISOString()
      })
    });
  } catch (error) {
    console.error("Error guardando en historial:", error);
  }
};

const fetchTemperature = async (
  setTemperature: React.Dispatch<React.SetStateAction<number>>,
  setHistory: React.Dispatch<React.SetStateAction<number[]>>,
  threshold: number,
  previousTemperature?: number
) => {
  try {
    let response = await fetch(`${config.API_URL}/temperature`);
    
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    let data = await response.json();
    let temperatureValue: number;

    // Manejar diferentes formatos de respuesta
    if (typeof data === 'number') {
      temperatureValue = data;
    } else if (typeof data === 'object' && data !== null) {
      if ('temperature' in data) {
        temperatureValue = data.temperature;
      } else {
        throw new Error('Formato de temperatura inválido');
      }
    } else {
      throw new Error('Formato de temperatura inválido');
    }

    // Validar la temperatura
    if (!validateTemperature(temperatureValue)) {
      throw new Error(`Temperatura fuera de rango: ${temperatureValue}°C`);
    }

    // Verificar cambios anómalos
    if (previousTemperature !== undefined && 
        isAnomalousTemperature(temperatureValue, previousTemperature)) {
      console.warn(`Cambio brusco de temperatura detectado: ${previousTemperature}°C -> ${temperatureValue}°C`);
    }

    setTemperature(temperatureValue);
    setHistory((prev) => [...(Array.isArray(prev) ? prev.slice(-9) : []), temperatureValue]);
    
    // Guardar en el historial
    await saveToHistory(temperatureValue);

    // Verificar si se debe enviar una alerta
    if (temperatureValue > threshold) {
      await sendTemperatureAlert(temperatureValue, threshold);
    }

    return temperatureValue;
  } catch (error) {
    console.error("Error obteniendo temperatura:", error);
    throw error;
  }
};

export default function HomeScreen() {
  const [temperature, setTemperature] = useState<number>(0);
  const [history, setHistory] = useState<number[]>([]);
  const { threshold } = useThreshold();
  const [error, setError] = useState<string | null>(null);

  const updateTemperature = useCallback(() => {
    fetchTemperature(setTemperature, setHistory, threshold, temperature)
      .catch(error => {
        setError(error.message);
      });
  }, [threshold, temperature]);

  useEffect(() => {
    updateTemperature();
    const interval = setInterval(updateTemperature, config.UPDATE_INTERVAL);
    return () => clearInterval(interval);
  }, [updateTemperature]);

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  const getTemperatureColor = (temp: number) => {
    return temp > threshold ? '#FF4444' : '#44BB44';
  };

  return (
    <View style={styles.container}>
      <Text style={[
        styles.title,
        { color: getTemperatureColor(temperature) }
      ]}>
        Temperatura Actual: {temperature}°C
      </Text>
      {temperature > threshold ? (
        <Text style={styles.alert}>⚠️ TEMPERATURA SOBRE EL UMBRAL ({threshold}°C)</Text>
      ) : (
        <Text style={styles.normal}>✅ Temperatura Normal</Text>
      )}
      <TemperatureChart history={history} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  alert: {
    color: "#FF4444",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
  },
  normal: {
    color: "#44BB44",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
  },
  error: {
    color: "#FF4444",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
