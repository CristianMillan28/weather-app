import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SearchHistory} from '../models/SearchHistory';
import {env} from '../../config/environments';

let searchHistory: SearchHistory[] = [];

export const saveSearchHistory = async (history: SearchHistory[]) => {
  try {
    await AsyncStorage.setItem('searchHistory', JSON.stringify(history));
  } catch (error) {}
};

const loadSearchHistory = async () => {
  try {
    const history = await AsyncStorage.getItem('searchHistory');
    if (history) {
      searchHistory = JSON.parse(history);
    }
  } catch (error) {}
};

// Cargar el historial de búsquedas al iniciar
loadSearchHistory();

export const getWeatherDetails = async (
  city: string,
  state: string,
  country: string,
) => {
  try {
    const geoResponse = await axios.get(env.geoBaseUrl, {
      params: {
        q: `${city},${state},${country}`,
        limit: 1,
        appid: env.apiKey,
      },
    });

    if (geoResponse.data.length === 0) {
      throw new Error(
        'No se encontraron coordenadas para la ciudad proporcionada.',
      );
    }

    const {lat, lon} = geoResponse.data[0];

    const weatherResponse = await axios.get(env.baseUrl, {
      params: {
        lat,
        lon,
        appid: env.apiKey,
        units: 'metric',
      },
    });

    const data = weatherResponse.data;

    const weatherDetails = {
      temperature: data.main.temp,
      humidity: data.main.humidity,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      weatherCondition: data.weather[0].main,
      windSpeed: data.wind.speed,
      feelsLike: data.main.feels_like,
      city: data.name,
      country: data.sys.country,
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
      timezone: data.timezone,
      id: data.id,
      lat: data.coord.lat,
      lon: data.coord.lon,
    };

    return weatherDetails;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('Error al obtener los datos del clima.');
    }
  }
};

export const getCitySuggestions = async (query: string) => {
  try {
    const response = await axios.get(env.geoBaseUrl, {
      params: {
        q: query,
        appid: env.apiKey,
        limit: 5,
      },
    });

    const uniqueCities: any[] = [];

    response.data.forEach((city: any) => {
      const cityExists = uniqueCities.some(
        (item: any) =>
          item.city === city.name &&
          item.state === city.state &&
          item.country === city.country,
      );
      if (!cityExists) {
        uniqueCities.push({
          city: city.name,
          lat: city.lat,
          lon: city.lon,
          country: city.country,
          state: city.state || '',
        });
      }
    });

    return uniqueCities;
  } catch (error) {
    throw error;
  }
};

export const getSearchHistory = async () => {
  await loadSearchHistory();
  return searchHistory;
};

export const clearSearchHistory = async () => {
  try {
    searchHistory = [];
    await AsyncStorage.removeItem('searchHistory');
  } catch (error) {}
};
