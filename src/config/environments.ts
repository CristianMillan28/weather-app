import Config from 'react-native-config';

export const env = {
  apiKey: Config.API_KEY || '',
  baseUrl: Config.BASE_URL || '',
  geoBaseUrl: Config.GEO_BASE_URL || '',
};
