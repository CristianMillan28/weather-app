import { getCitySuggestions } from '../../data/repositories/WeatherRepository';

export const GetCitySuggestionsUseCase = async (query: string) => {
  return await getCitySuggestions(query);
};
