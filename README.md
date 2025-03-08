# WeatherApp

Esta es una aplicación de clima desarrollada en React Native que permite al usuario consultar el clima actual de cualquier ciudad ingresada. La aplicación consume la API pública de OpenWeather y está estructurada usando el patrón Clean Architecture.

## Requisitos

- Node.js
- npm o yarn
- React Native CLI
- API Key de OpenWeather

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/CristianMillan28/weather-app
   cd weather-app
   ```

2. Instala las dependencias:
   ```bash
   npm install
   # o
   yarn install
   ```

3. Configura tu API Key de OpenWeather:
   - Crea un archivo `.env` en la raíz del proyecto.
   - Agrega las siguientes líneas al archivo `.env` y reemplaza `API_KEY` con tu clave de API de OpenWeather:
     ```
     API_KEY=YOUR_API_KEY
     BASE_URL=https://api.openweathermap.org/data/2.5/weather
     GEO_BASE_URL=https://api.openweathermap.org/geo/1.0/direct
     ```

4. Si estás en macOS y deseas ejecutar la aplicación en iOS, instala las dependencias de CocoaPods:
   ```bash
   cd ios
   pod install
   cd ..
   ```

## Ejecución

1. Inicia la aplicación en un dispositivo o emulador:

   ### Android
   ```bash
   npm run android
   # o
   yarn android
   ```

   ### iOS
   ```bash
   npm run ios
   # o
   yarn ios
   ```

## Estructura del Proyecto

- `src/data/repositories`: Contiene los repositorios para la obtención de datos.
- `src/data/models`: Contiene los modelos de datos utilizados en la aplicación.
- `src/domain/store`: Contiene los stores para el manejo del estado de la aplicación.
- `src/domain/usecases`: Contiene los casos de uso de la aplicación.
- `src/domain/services`: Contiene los servicios de la aplicación.
- `src/presentation/screens`: Contiene las pantallas de la aplicación.
  - `home`: Pantalla principal con el campo de búsqueda y el historial de búsquedas.
  - `city-suggestions`: Pantalla de sugerencias de ciudades.
  - `details`: Pantalla de detalles del clima.
- `src/constants`: Contiene las constantes utilizadas en la aplicación.
- `src/config`: Contiene la configuración de las variables de entorno.

## Funcionalidades

- Pantalla principal con un campo de búsqueda para ingresar el nombre de la ciudad.
- Mostrar información del clima: temperatura, humedad y estado (soleado, nublado, etc.).
- Segunda pantalla con detalles adicionales (viento, sensación térmica).
- Manejo de errores: Mostrar mensajes en caso de que la ciudad no exista o no haya conexión.

## Extras

- Mostrar un historial de búsquedas recientes usando AsyncStorage (opcional).
