import * as Notifications from 'expo-notifications';

export const initializeNotifications = async () => {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    console.warn('No se otorgaron permisos para notificaciones');
    return false;
  }

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  return true;
};

export const sendTemperatureAlert = async (temperature: number, threshold: number) => {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "¡Alerta de Temperatura!",
        body: `La temperatura actual (${temperature}°C) ha superado el umbral (${threshold}°C)`,
        data: { temperature, threshold },
      },
      trigger: null,
    });
  } catch (error) {
    console.error('Error al enviar notificación:', error);
  }
}; 