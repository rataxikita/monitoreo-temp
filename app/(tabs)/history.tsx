import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, RefreshControl } from "react-native";
import { config } from "../../config/env";

interface TemperatureRecord {
  temperatura: number;
  fecha: string;
}

export default function HistoryScreen() {
  const [historial, setHistorial] = useState<TemperatureRecord[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const obtenerHistorial = async () => {
    try {
      setError(null);
      let response = await fetch(`${config.API_URL}/history`);
      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
      let data = await response.json();
      setHistorial(data);
    } catch (error) {
      console.error("Error obteniendo historial:", error);
      setError("No se pudo cargar el historial. Intenta de nuevo más tarde.");
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await obtenerHistorial();
    setRefreshing(false);
  };

  useEffect(() => {
    obtenerHistorial();
  }, []);

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de Temperaturas</Text>
      <FlatList
        data={historial}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.temperature}>🌡️ {item.temperatura}°C</Text>
            <Text style={styles.date}>
              {new Date(item.fecha).toLocaleString()}
            </Text>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay registros disponibles</Text>
        }
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
  item: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },
  temperature: {
    fontSize: 18,
    fontWeight: "bold",
  },
  date: {
    color: "#666",
    marginTop: 5,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  emptyText: {
    textAlign: "center",
    color: "#666",
    marginTop: 20,
  },
});
