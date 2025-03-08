export type RootStackParamList = {
  Home: undefined;
  Details: {
    lat: number;
    lon: number;
    state: string;
    city: string;
    country: string;
  };
  CitySuggestions: {
    query: string;
  }
};
