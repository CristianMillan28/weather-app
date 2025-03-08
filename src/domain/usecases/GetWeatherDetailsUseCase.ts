import { getWeatherDetails } from '../../data/repositories/WeatherRepository';

export const GetWeatherDetailsUseCase = async (city: string, state: string, country: string) => {
  return await getWeatherDetails(city, state, country);
};
