import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Animated, Image, StyleSheet, Text, View } from 'react-native';
import CountryFlag from 'react-native-country-flag';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../constants/colors';
import { Weather } from '../../data/models/Weather';
import { useSearchHistoryStore } from '../../domain/store/useSearchHistoryStore';
import { GetWeatherDetailsUseCase } from '../../domain/usecases/GetWeatherDetailsUseCase';
import LoadingIndicator from '../components/LoadingIndicator';
import WeatherDetailBox from '../components/WeatherDetailBox';
import { RootStackParamList } from '../navigation/types';
import { weatherDescriptions } from '../utils/weatherDescriptions';
import { getWeatherIcon } from '../utils/weatherIcons';

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

const DetailsScreen = () => {
  const {top} = useSafeAreaInsets();

  const route = useRoute<DetailsScreenRouteProp>();
  const {city, state, country} = route.params;
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {addToHistory} = useSearchHistoryStore();
  const [currentTime, setCurrentTime] = useState<string>('');
  const fadeAnim = useState(new Animated.Value(0))[0];

  const handleGetWeatherDetails = async () => {
    const parsedState = state ? state.replaceAll(',', '') : '';
    try {
      const data = await GetWeatherDetailsUseCase(city, parsedState, country);
      setWeather(data);
      addToHistory({
        id: data.id,
        lat: data.lat,
        lon: data.lon,
        city,
        state: parsedState,
        country,
      });
      setLoading(false);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetWeatherDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city, state, country]);

  useEffect(() => {
    if (weather) {
      const interval = setInterval(() => {
        const date = new Date((Date.now() / 1000 + weather.timezone) * 1000);
        setCurrentTime(
          date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'UTC',
          }),
        );
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [weather]);

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.primary,
          },
        ]}>
        <LoadingIndicator />
      </View>
    );
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  if (!weather) {
    return (
      <Text style={styles.error}>
        No se encontraron datos para las coordenadas proporcionadas
      </Text>
    );
  }

  const currentTimeInSeconds = Math.floor(Date.now() / 1000);

  const getMomentOfDay = (current: number, sunrise: number, sunset: number) => {
    if (current < sunrise) return 'Noche';
    if (current < sunrise + 3600) return 'Amaneciendo';
    if (current < sunset - 3600) return 'Día';
    if (current < sunset) return 'Anocheciendo';
    return 'Noche';
  };

  const momentOfDay = getMomentOfDay(
    currentTimeInSeconds,
    weather.sunrise,
    weather.sunset,
  );

  const isNight = momentOfDay === 'Noche' || momentOfDay === 'Anocheciendo';
  const iconUrl = getWeatherIcon(weather.description, isNight);

  const getBackgroundColor = (moment: string) => {
    switch (moment) {
      case 'Noche':
        return colors.backgroundNight;
      case 'Amaneciendo':
        return colors.backgroundDawn;
      case 'Día':
        return colors.backgroundDay;
      case 'Anocheciendo':
        return colors.backgroundDusk;
      default:
        return colors.backgroundDay;
    }
  };

  return (
    <Animated.View style={[styles.container, {opacity: fadeAnim}]}>
      <View
        style={[
          styles.topContainer,
          {
            paddingTop: top + 32,
            backgroundColor: getBackgroundColor(momentOfDay),
          },
        ]}>
        <Text style={styles.title}>{weather.city}</Text>
        <View style={styles.subtitleContainer}>
          {state ? <Text style={styles.subtitle}>{state}</Text> : null}
          <CountryFlag isoCode={weather.country} size={16} />
        </View>
        <View style={styles.temperatureContainer}>
          <Text style={styles.temperatureText}>
            {Math.round(weather.temperature)}
          </Text>
          <Text style={styles.symbol}>°</Text>
        </View>
        <Image source={iconUrl} style={styles.weatherIcon} />
        <Text style={styles.weatherDescription}>
          {weatherDescriptions[weather.description]}
        </Text>
        {/* <Text style={styles.weatherDescription}>{weather.description}</Text> */}
        <Text style={styles.currentTime}>{currentTime}</Text>
      </View>
      <View style={styles.flexContainer}>
        <WeatherDetailBox
          iconName="water-percent"
          title="Humedad"
          value={`${weather.humidity}%`}
        />
        <WeatherDetailBox
          iconName="weather-windy"
          title="Viento"
          value={`${weather.windSpeed} m/s`}
        />
        <WeatherDetailBox
          iconName="thermometer"
          title="Sensación Térmica"
          value={`${Math.round(weather.feelsLike)}°C`}
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  topContainer: {
    borderBottomLeftRadius: 64,
    borderBottomRightRadius: 64,
    alignItems: 'center',
    position: 'relative',
    paddingBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
  },
  currentTime: {
    fontSize: 18,
    color: colors.white,
    textAlign: 'center',
  },
  subtitleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  subtitle: {
    fontSize: 18,
    color: colors.white,
  },
  temperatureContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  temperatureText: {
    fontSize: 96,
    fontWeight: 'bold',
    color: colors.white,
  },
  symbol: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.white,
  },
  weatherIcon: {
    width: 150,
    height: 150,
    objectFit: 'contain',
  },
  weatherDescription: {
    fontSize: 24,
    color: colors.white,
    textAlign: 'center',
  },
  detailsContainer: {
    padding: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  detailLabel: {
    fontSize: 18,
    color: colors.darkGray,
  },
  detailValue: {
    fontSize: 18,
    color: colors.mediumGray,
  },
  error: {
    color: colors.errorRed,
    textAlign: 'center',
    marginTop: 20,
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
    paddingHorizontal: 16,
  },
  flexBox: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    padding: 16,
    width: '30%',
  },
  separator: {
    width: 1,
    backgroundColor: colors.separatorGray,
    marginHorizontal: 8,
  },
  icon: {
    width: 40,
    height: 40,
  },
  flexTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'center',
  },
  flexDescription: {
    fontSize: 14,
    color: colors.darkGray,
    marginTop: 4,
  },
});

export default DetailsScreen;
