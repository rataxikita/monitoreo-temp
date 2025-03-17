import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { config } from '../config/env';

type ThresholdContextType = {
  threshold: number;
  setThreshold: (value: number) => Promise<void>;
};

const ThresholdContext = createContext<ThresholdContextType>({
  threshold: config.DEFAULT_THRESHOLD,
  setThreshold: async () => {},
});

export const ThresholdProvider = ({ children }: { children: React.ReactNode }) => {
  const [threshold, setThresholdState] = useState(config.DEFAULT_THRESHOLD);

  useEffect(() => {
    // Cargar el umbral guardado al iniciar
    const loadThreshold = async () => {
      try {
        const savedThreshold = await AsyncStorage.getItem('temperature_threshold');
        if (savedThreshold) {
          setThresholdState(Number(savedThreshold));
        }
      } catch (error) {
        console.error('Error al cargar el umbral:', error);
      }
    };
    loadThreshold();
  }, []);

  const setThreshold = async (value: number) => {
    try {
      await AsyncStorage.setItem('temperature_threshold', value.toString());
      setThresholdState(value);
    } catch (error) {
      console.error('Error al guardar el umbral:', error);
    }
  };

  return (
    <ThresholdContext.Provider value={{ threshold, setThreshold }}>
      {children}
    </ThresholdContext.Provider>
  );
};

export const useThreshold = () => useContext(ThresholdContext); 