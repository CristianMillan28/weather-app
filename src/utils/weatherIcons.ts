const weatherIcons = {
  // Cloud Icons
  '2bolt-snow': require('../assets/icons/cloud/2bolt-snow.webp'),
  '2bolt-wind': require('../assets/icons/cloud/2bolt-wind.webp'),
  'bolt-rain-wind': require('../assets/icons/cloud/bolt-rain-wind.webp'),
  'bolt-rain': require('../assets/icons/cloud/bolt-rain.webp'),
  'bolt-snow': require('../assets/icons/cloud/bolt-snow.webp'),
  bolt: require('../assets/icons/cloud/bolt.webp'),
  'cloud-snow': require('../assets/icons/cloud/cloud-snow.webp'),
  cloud: require('../assets/icons/cloud/cloud.webp'),
  'rain-snow': require('../assets/icons/cloud/rain-snow.webp'),
  'rain-wind': require('../assets/icons/cloud/rain-wind.webp'),
  rain: require('../assets/icons/cloud/rain.webp'),
  snow: require('../assets/icons/cloud/snow.webp'),

  // Sun Icons
  'sun-cloud': require('../assets/icons/sun/cloud.webp'),
  'sun-bolt-cloud-rain': require('../assets/icons/sun/bolt-cloud-rain.webp'),
  'sun-cloud-rain-wind': require('../assets/icons/sun/cloud-rain-wind.webp'),
  'sun-cloud-rain': require('../assets/icons/sun/cloud-rain.webp'),
  'sun-cloud-wind': require('../assets/icons/sun/cloud-wind.webp'),
  'sun-wind': require('../assets/icons/sun/wind.webp'),
  sun: require('../assets/icons/sun/sun.webp'),

  // Moon Icons
  'moon-2bolt-cloud': require('../assets/icons/moon/2bolt-cloud.webp'),
  'moon-cloud-rain-snow': require('../assets/icons/moon/cloud-rain-snow.webp'),
  'moon-cloud-rain-wind': require('../assets/icons/moon/cloud-rain-wind.webp'),
  'moon-cloud-rain': require('../assets/icons/moon/cloud-rain.webp'),
  'moon-cloud-snow': require('../assets/icons/moon/cloud-snow.webp'),
  'moon-cloud': require('../assets/icons/moon/cloud.webp'),
  moon: require('../assets/icons/moon/moon.webp'),
  'moon-rain-darkwind': require('../assets/icons/moon/rain-darkwind.webp'),
  'moon-rain-wind': require('../assets/icons/moon/rain-wind.webp'),
  'moon-wind': require('../assets/icons/moon/wind.webp'),
};

export const weatherIconsByDescription: any = {
  // Group 2xx: Thunderstorm
  'thunderstorm with light rain': {
    day: weatherIcons['bolt-rain'],
    night: weatherIcons['moon-2bolt-cloud'],
  },
  'thunderstorm with rain': {
    day: weatherIcons['bolt-rain'],
    night: weatherIcons['moon-2bolt-cloud'],
  },
  'thunderstorm with heavy rain': {
    day: weatherIcons['bolt-rain'],
    night: weatherIcons['moon-2bolt-cloud'],
  },
  'light thunderstorm': {
    day: weatherIcons.bolt,
    night: weatherIcons['moon-2bolt-cloud'],
  },
  thunderstorm: {
    day: weatherIcons.bolt,
    night: weatherIcons['moon-2bolt-cloud'],
  },
  'heavy thunderstorm': {
    day: weatherIcons.bolt,
    night: weatherIcons['moon-2bolt-cloud'],
  },
  'ragged thunderstorm': {
    day: weatherIcons.bolt,
    night: weatherIcons['moon-2bolt-cloud'],
  },
  'thunderstorm with light drizzle': {
    day: weatherIcons['bolt-rain'],
    night: weatherIcons['moon-2bolt-cloud'],
  },
  'thunderstorm with drizzle': {
    day: weatherIcons['bolt-rain'],
    night: weatherIcons['moon-2bolt-cloud'],
  },
  'thunderstorm with heavy drizzle': {
    day: weatherIcons['bolt-rain'],
    night: weatherIcons['moon-2bolt-cloud'],
  },
  // Grupo 3xx: Drizzle
  'light intensity drizzle': {
    day: weatherIcons['sun-cloud-rain'],
    night: weatherIcons['moon-cloud-rain'],
  },
  drizzle: {
    day: weatherIcons['sun-cloud-rain'],
    night: weatherIcons['moon-cloud-rain'],
  },
  'heavy intensity drizzle': {
    day: weatherIcons['sun-cloud-rain'],
    night: weatherIcons['moon-cloud-rain'],
  },
  'light intensity drizzle rain': {
    day: weatherIcons['sun-cloud-rain'],
    night: weatherIcons['moon-cloud-rain'],
  },
  'drizzle rain': {
    day: weatherIcons['sun-cloud-rain'],
    night: weatherIcons['moon-cloud-rain'],
  },
  'heavy intensity drizzle rain': {
    day: weatherIcons['sun-cloud-rain'],
    night: weatherIcons['moon-cloud-rain'],
  },
  'shower rain and drizzle': {
    day: weatherIcons['sun-cloud-rain'],
    night: weatherIcons['moon-cloud-rain'],
  },
  'heavy shower rain and drizzle': {
    day: weatherIcons['sun-cloud-rain'],
    night: weatherIcons['moon-cloud-rain'],
  },
  'shower drizzle': {
    day: weatherIcons['sun-cloud-rain'],
    night: weatherIcons['moon-cloud-rain'],
  },
  // Grupo 5xx: Rain
  'light rain': {
    day: weatherIcons['sun-cloud-rain'],
    night: weatherIcons['moon-cloud-rain'],
  },
  'moderate rain': {
    day: weatherIcons['sun-cloud-rain'],
    night: weatherIcons['moon-cloud-rain'],
  },
  'heavy intensity rain': {
    day: weatherIcons['sun-cloud-rain'],
    night: weatherIcons['moon-cloud-rain'],
  },
  'very heavy rain': {
    day: weatherIcons['sun-cloud-rain'],
    night: weatherIcons['moon-cloud-rain'],
  },
  'extreme rain': {
    day: weatherIcons['sun-cloud-rain'],
    night: weatherIcons['moon-cloud-rain'],
  },
  'freezing rain': {
    day: weatherIcons['cloud-snow'],
    night: weatherIcons['moon-cloud-snow'],
  },
  'light intensity shower rain': {
    day: weatherIcons['sun-cloud-rain'],
    night: weatherIcons['moon-cloud-rain'],
  },
  'shower rain': {
    day: weatherIcons['sun-cloud-rain'],
    night: weatherIcons['moon-cloud-rain'],
  },
  'heavy intensity shower rain': {
    day: weatherIcons['sun-cloud-rain'],
    night: weatherIcons['moon-cloud-rain'],
  },
  'ragged shower rain': {
    day: weatherIcons['sun-cloud-rain'],
    night: weatherIcons['moon-cloud-rain'],
  },
  // Grupo 6xx: Snow
  'light snow': {
    day: weatherIcons['cloud-snow'],
    night: weatherIcons['moon-cloud-snow'],
  },
  snow: {
    day: weatherIcons['cloud-snow'],
    night: weatherIcons['moon-cloud-snow'],
  },
  'heavy snow': {
    day: weatherIcons['cloud-snow'],
    night: weatherIcons['moon-cloud-snow'],
  },
  sleet: {
    day: weatherIcons['rain-snow'],
    night: weatherIcons['moon-cloud-rain-snow'],
  },
  'light shower sleet': {
    day: weatherIcons['rain-snow'],
    night: weatherIcons['moon-cloud-rain-snow'],
  },
  'shower sleet': {
    day: weatherIcons['rain-snow'],
    night: weatherIcons['moon-cloud-rain-snow'],
  },
  'light rain and snow': {
    day: weatherIcons['rain-snow'],
    night: weatherIcons['moon-cloud-rain-snow'],
  },
  'rain and snow': {
    day: weatherIcons['rain-snow'],
    night: weatherIcons['moon-cloud-rain-snow'],
  },
  'light shower snow': {
    day: weatherIcons.snow,
    night: weatherIcons['moon-cloud-snow'],
  },
  'shower snow': {
    day: weatherIcons.snow,
    night: weatherIcons['moon-cloud-snow'],
  },
  'heavy shower snow': {
    day: weatherIcons.snow,
    night: weatherIcons['moon-cloud-snow'],
  },
  // Group 7xx: Atmosphere
  mist: {
    day: weatherIcons['sun-cloud'],
    night: weatherIcons['moon-cloud'],
  },
  smoke: {
    day: weatherIcons['sun-cloud'],
    night: weatherIcons['moon-cloud'],
  },
  haze: {
    day: weatherIcons['sun-cloud'],
    night: weatherIcons['moon-cloud'],
  },
  'sand/dust whirls': {
    day: weatherIcons['sun-cloud'],
    night: weatherIcons['moon-cloud'],
  },
  fog: {
    day: weatherIcons['sun-cloud'],
    night: weatherIcons['moon-cloud'],
  },
  sand: {
    day: weatherIcons['sun-cloud'],
    night: weatherIcons['moon-cloud'],
  },
  dust: {
    day: weatherIcons['sun-cloud'],
    night: weatherIcons['moon-cloud'],
  },
  'volcanic ash': {
    day: weatherIcons['sun-cloud'],
    night: weatherIcons['moon-cloud'],
  },
  squalls: {
    day: weatherIcons['sun-wind'],
    night: weatherIcons['moon-wind'],
  },
  tornado: {
    day: weatherIcons['sun-wind'],
    night: weatherIcons['moon-wind'],
  },
  // Group 800: Clear
  'clear sky': {
    day: weatherIcons.sun,
    night: weatherIcons.moon,
  },
  // Group 80x: Clouds
  'few clouds': {
    day: weatherIcons['sun-cloud'],
    night: weatherIcons['moon-cloud'],
  },
  'scattered clouds': {
    day: weatherIcons['sun-cloud'],
    night: weatherIcons['moon-cloud'],
  },
  'broken clouds': {
    day: weatherIcons['sun-cloud'],
    night: weatherIcons['moon-cloud'],
  },
  'overcast clouds': {
    day: weatherIcons['sun-cloud'],
    night: weatherIcons['moon-cloud'],
  },
};

export const getWeatherIcon = (description: string, isNight: boolean) => {
  let icon = weatherIconsByDescription[description];
  if (!icon) {
    icon = weatherIconsByDescription.Clear;
  }
  return isNight ? icon.night : icon.day;
};
