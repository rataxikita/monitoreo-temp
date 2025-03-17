# Monitoreo de Temperatura en Tiempo Real

Aplicación móvil desarrollada con Expo/React Native para monitorear la temperatura en tiempo real, con notificaciones y gráficos interactivos.

## 🚀 Características

- 📊 Gráfico en tiempo real de temperatura
- 🔔 Notificaciones push cuando la temperatura supera el umbral
- 📱 Interfaz responsive y moderna
- 📈 Historial de temperaturas
- ⚙️ Configuración personalizable de umbrales
- 🔄 Actualización automática cada 5 segundos

## 📋 Requisitos Previos

- Node.js (v14 o superior)
- npm o yarn
- Expo CLI
- Android Studio (para desarrollo Android)
- XCode (para desarrollo iOS, solo macOS)
- Expo Go app en tu dispositivo móvil

## 🛠️ Instalación

1. Clonar el repositorio:
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd monitoreo-temp
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Configurar variables de entorno:
   ```bash
   cp .env.example .env
   # Edita el archivo .env con tus configuraciones
   ```

4. Iniciar el servidor de desarrollo:
   ```bash
   npm start
   # o
   yarn start
   ```

5. Escanear el código QR con la app Expo Go en tu dispositivo móvil

## 📱 Uso

1. **Pantalla Principal**
   - Muestra el gráfico de temperatura en tiempo real
   - Indica visualmente si la temperatura está por encima del umbral (rojo) o por debajo (verde)
   - Actualización automática cada 5 segundos

2. **Historial**
   - Muestra el registro de temperaturas
   - Actualizable con pull-to-refresh
   - Ordenado por fecha y hora

3. **Configuración**
   - Permite establecer el umbral de temperatura
   - Rango válido: 15°C - 40°C
   - Persiste entre sesiones

## 🔧 Configuración

### Umbral de Temperatura
- Mínimo: 15°C
- Máximo: 40°C
- Valor por defecto: 25°C

### Notificaciones
Se envían cuando:
- La temperatura supera el umbral configurado
- Ocurre un error de conexión
- Se requiere atención del usuario

## 🏗️ Arquitectura

### Frontend
- React Native con Expo
- TypeScript
- React Navigation
- Chart.js para gráficos
- AsyncStorage para persistencia

### Backend
- json-server para simulación de API
- Endpoints RESTful
- Almacenamiento local en db.json

## 📁 Estructura del Proyecto

```
/monitoreo-temp
├── app/                    # Pantallas principales
│   └── (tabs)/            
│       ├── index.tsx      # Pantalla principal
│       ├── history.tsx    # Historial
│       └── settings.tsx   # Configuración
├── components/            # Componentes reutilizables
├── contexts/             # Contextos de React
├── utils/               # Utilidades y helpers
├── config/             # Configuración
└── db.json            # Base de datos simulada
```

## 🧪 Validaciones

La aplicación incluye las siguientes validaciones:

1. **Umbral de Temperatura**
   - Debe ser un número válido
   - Debe estar dentro del rango permitido
   - Se detectan cambios anómalos (>5°C)

2. **Conexión**
   - Verificación de estado de la red
   - Reintentos automáticos
   - Mensajes de error descriptivos

3. **Datos**
   - Validación de formato de temperatura
   - Verificación de timestamps
   - Detección de valores anómalos

## 🐛 Manejo de Errores

- Mensajes de error descriptivos
- Recuperación automática de errores de conexión
- Validación de datos en cada paso
- Logs detallados para debugging

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 🤝 Contribuir

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request
