import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Keyboard, Alert } from "react-native";
import { useThreshold } from "../../contexts/ThresholdContext";
import { config } from "../../config/env";
import { validateThreshold } from "../../utils/validations";

export default function SettingsScreen() {
  const { threshold, setThreshold } = useThreshold();
  const [inputValue, setInputValue] = useState(threshold.toString());
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setInputValue(threshold.toString());
  }, [threshold]);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    setError(null);
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const newThreshold = Number(inputValue);
      const validationError = validateThreshold(newThreshold);

      if (validationError) {
        setError(validationError);
        return;
      }

      await setThreshold(newThreshold);
      Keyboard.dismiss();
      Alert.alert(
        "Éxito",
        "El umbral de temperatura se ha guardado correctamente",
        [{ text: "OK" }]
      );
    } catch (error) {
      Alert.alert(
        "Error",
        "No se pudo guardar el umbral. Por favor, intenta de nuevo.",
        [{ text: "OK" }]
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuración</Text>
      
      <View style={styles.section}>
        <Text style={styles.label}>Umbral de temperatura (°C):</Text>
        <TextInput
          style={[
            styles.input,
            error ? styles.inputError : null
          ]}
          keyboardType="numeric"
          value={inputValue}
          onChangeText={handleInputChange}
          placeholder="Ingresa el umbral de temperatura"
          editable={!isSaving}
        />
        {error && <Text style={styles.error}>{error}</Text>}
        <Text style={styles.hint}>
          El umbral debe estar entre {config.TEMPERATURE_MIN}°C y {config.TEMPERATURE_MAX}°C
        </Text>
      </View>

      <Button 
        title={isSaving ? "Guardando..." : "Guardar"} 
        onPress={handleSave}
        disabled={isSaving || !!error}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
  },
  inputError: {
    borderColor: "#FF4444",
  },
  error: {
    color: "#FF4444",
    marginBottom: 5,
  },
  hint: {
    color: "#666",
    fontSize: 12,
    marginBottom: 10,
  },
});
