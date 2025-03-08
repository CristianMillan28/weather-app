const weatherIcons: any = {
  Thunderstorm: {
    day: require('../assets/icons/cloud/bolt-rain.webp'),
    night: require('../assets/icons/moon/2bolt-cloud.webp'),
  },
  Drizzle: {
    day: require('../assets/icons/cloud/rain.webp'),
    night: require('../assets/icons/moon/cloud-rain.webp'),
  },
  Rain: {
    day: require('../assets/icons/cloud/rain.webp'),
    night: require('../assets/icons/moon/cloud-rain.webp'),
  },
  Snow: {
    day: require('../assets/icons/cloud/snow.webp'),
    night: require('../assets/icons/moon/cloud-snow.webp'),
  },
  Mist: {
    day: require('../assets/icons/cloud/cloud.webp'),
    night: require('../assets/icons/moon/cloud.webp'),
  },
  Smoke: {
    day: require('../assets/icons/cloud/cloud.webp'),
    night: require('../assets/icons/moon/cloud.webp'),
  },
  Haze: {
    day: require('../assets/icons/cloud/cloud.webp'),
    night: require('../assets/icons/moon/cloud.webp'),
  },
  Dust: {
    day: require('../assets/icons/cloud/cloud.webp'),
    night: require('../assets/icons/moon/cloud.webp'),
  },
  Fog: {
    day: require('../assets/icons/cloud/cloud.webp'),
    night: require('../assets/icons/moon/cloud.webp'),
  },
  Sand: {
    day: require('../assets/icons/cloud/cloud.webp'),
    night: require('../assets/icons/moon/cloud.webp'),
  },
  Ash: {
    day: require('../assets/icons/cloud/cloud.webp'),
    night: require('../assets/icons/moon/cloud.webp'),
  },
  Squall: {
    day: require('../assets/icons/cloud/cloud.webp'),
    night: require('../assets/icons/moon/cloud.webp'),
  },
  Tornado: {
    day: require('../assets/icons/cloud/cloud.webp'),
    night: require('../assets/icons/moon/cloud.webp'),
  },
  Clear: {
    day: require('../assets/icons/sun/sun.webp'),
    night: require('../assets/icons/moon/moon.webp'),
  },
  'Few Clouds': {
    day: require('../assets/icons/sun/cloud.webp'),
    night: require('../assets/icons/moon/cloud.webp'),
  },
  'Scattered Clouds': {
    day: require('../assets/icons/sun/cloud.webp'),
    night: require('../assets/icons/moon/cloud.webp'),
  },
  'Broken Clouds': {
    day: require('../assets/icons/sun/cloud.webp'),
    night: require('../assets/icons/moon/cloud.webp'),
  },
  'Overcast Clouds': {
    day: require('../assets/icons/sun/cloud.webp'),
    night: require('../assets/icons/moon/cloud.webp'),
  },
};

export const getWeatherIcon = (weatherCondition: string, isNight: boolean) => {
  let icon = weatherIcons[weatherCondition];
  if (!icon) {
    icon = weatherIcons.Clear;
  }
  return isNight ? icon.night : icon.day;
};
