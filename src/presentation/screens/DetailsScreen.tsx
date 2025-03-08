import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import CountryFlag from 'react-native-country-flag';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {GetWeatherDetailsUseCase} from '../../domain/usecases/GetWeatherDetailsUseCase';
import {RootStackParamList} from '../../navigation/types';
import {useSearchHistoryStore} from '../../store/useSearchHistoryStore';
import {Weather} from '../../types/Weather';
import {BackButton} from '../components/GoBackButton';
import {getWeatherIcon} from '../../utils/weatherIcons';

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

  const handleGetWeatherDetails = async () => {
    try {
      const data = await GetWeatherDetailsUseCase(city, state, country);
      setWeather(data);
      addToHistory({
        id: data.id,
        lat: data.lat,
        lon: data.lon,
        city,
        state: state || '',
        country,
      });
      setLoading(false);
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
    return <ActivityIndicator size="large" color="#0000ff" />;
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
  const iconUrl = getWeatherIcon(weather.weatherCondition, isNight);

  const getTime = (timestamp: number, timezone: number) => {
    const date = new Date((timestamp + timezone) * 1000);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC',
    });
  };

  const getBackgroundColor = (moment: string) => {
    switch (moment) {
      case 'Noche':
        return '#2c3e50';
      case 'Amaneciendo':
        return '#f39c12';
      case 'Día':
        return '#87CEEB';
      case 'Anocheciendo':
        return '#e74c3c';
      default:
        return '#87CEEB';
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.topContainer,
          {
            paddingTop: top + 32,
            backgroundColor: getBackgroundColor(momentOfDay),
          },
        ]}>
        <View style={{position: 'absolute', left: 16, top: 16 + top}}>
          <BackButton />
        </View>
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
        <Text style={styles.weatherDescription}>{weather.weatherCondition}</Text>
        <Text style={styles.currentTime}>{currentTime}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Humedad:</Text>
          <Text style={styles.detailValue}>{weather.humidity}%</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Estado:</Text>
          <Text style={styles.detailValue}>{weather.description}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Viento:</Text>
          <Text style={styles.detailValue}>{weather.windSpeed} m/s</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Sensación Térmica:</Text>
          <Text style={styles.detailValue}>{weather.feelsLike}°C</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Amanecer:</Text>
          <Text style={styles.detailValue}>
            {getTime(weather.sunrise, weather.timezone)}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Atardecer:</Text>
          <Text style={styles.detailValue}>
            {getTime(weather.sunset, weather.timezone)}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Momento del día:</Text>
          <Text style={styles.detailValue}>{momentOfDay}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  topContainer: {
    padding: 32,
    borderBottomLeftRadius: 64,
    borderBottomRightRadius: 64,
    alignItems: 'center',
    position: 'relative',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  currentTime: {
    fontSize: 18,
    color: '#fff',
    marginTop: 8,
  },
  subtitleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    marginRight: 8,
  },
  temperatureContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 16,
  },
  temperatureText: {
    fontSize: 96,
    fontWeight: 'bold',
    color: '#fff',
  },
  symbol: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
  },
  weatherIcon: {
    width: 150,
    height: 100,
    marginVertical: 16,
  },
  weatherDescription: {
    fontSize: 24,
    color: '#fff',
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
    color: '#555',
  },
  detailValue: {
    fontSize: 18,
    color: '#333',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default DetailsScreen;
