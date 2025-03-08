
const weatherIcons: { [key: string]: string } = {
  Thunderstorm: '11d',
  Drizzle: '09d',
  Rain: '10d',
  Snow: '13d',
  Mist: '50d',
  Smoke: '50d',
  Haze: '50d',
  Dust: '50d',
  Fog: '50d',
  Sand: '50d',
  Ash: '50d',
  Squall: '50d',
  Tornado: '50d',
  Clear: '01d',
  Clouds: '02d',
};

export const getWeatherIcon = (weather: string, isNight: boolean): string => {
  if (weather === 'Clear') {
    return isNight ? '01n' : '01d';
  }
  if (weather === 'Clouds') {
    return isNight ? '02n' : '02d';
  }
  return weatherIcons[weather] || '01d';
};
