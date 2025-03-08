import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import CountryFlag from 'react-native-country-flag';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors} from '../../constants/colors';
import {Weather} from '../../data/models/Weather';
import {useSearchHistoryStore} from '../../domain/store/useSearchHistoryStore';
import {GetWeatherDetailsUseCase} from '../../domain/usecases/GetWeatherDetailsUseCase';
import LoadingIndicator from '../components/LoadingIndicator';
import WeatherDetailBox from '../components/WeatherDetailBox';
import {RootStackParamList} from '../navigation/types';
import {weatherDescriptions} from '../utils/weatherDescriptions';
import {getWeatherIcon} from '../utils/weatherIcons';
import ErrorMessage from '../components/ErrorMessage';
import {getMomentOfDay, MomentOfDay} from '../utils/momentOfDay';
import {getBackgroundColor} from '../utils/backgroundColor';
import CurrentTime from '../components/CurrentTime';
import AnimatedWeatherIcon from '../components/AnimatedWeatherIcon';

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

const DetailsScreen = () => {
  const {top, bottom} = useSafeAreaInsets();

  const route = useRoute<DetailsScreenRouteProp>();
  const {city, state, country} = route.params;
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {addToHistory} = useSearchHistoryStore();
  const fadeAnim = useState(new Animated.Value(0))[0];
  const pulseAnim = useState(new Animated.Value(1))[0];

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
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetWeatherDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city, state, country]);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 750,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 750,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [pulseAnim]);

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorMessage showBackButton message={error} />;
  }

  if (!weather) {
    return (
      <ErrorMessage
        showBackButton
        message="No se encontraron datos para las coordenadas proporcionadas"
      />
    );
  }

  const currentTimeInSeconds = Math.floor(Date.now() / 1000);

  const momentOfDay = getMomentOfDay(
    currentTimeInSeconds,
    weather.sunrise,
    weather.sunset,
  );

  const isNight =
    momentOfDay === MomentOfDay.Night || momentOfDay === MomentOfDay.Dusk;
  const iconUrl = getWeatherIcon(weather.description, isNight);

  return (
    <Animated.View
      style={[styles.container, {opacity: fadeAnim, paddingBottom: bottom}]}>
      <View
        style={[
          styles.topContainer,
          {
            paddingTop: top + 32,
            backgroundColor: getBackgroundColor(momentOfDay),
          },
        ]}>
        <View>
          <Text style={styles.title}>{city}</Text>
          <View style={styles.subtitleContainer}>
            {state ? <Text style={styles.subtitle}>{state}</Text> : null}
            <CountryFlag isoCode={country} size={16} />
          </View>
          <View style={styles.temperatureContainer}>
            <Text style={styles.temperatureText}>
              {Math.round(weather.temperature)}
            </Text>
            <Text style={styles.symbol}>°</Text>
          </View>
        </View>
        <View>
          <AnimatedWeatherIcon iconUrl={iconUrl} pulseAnim={pulseAnim} />
          <Text style={styles.weatherDescription}>
            {weatherDescriptions[weather.description]}
          </Text>
        </View>
        <View />
        <View>
          <CurrentTime weather={weather} />
        </View>
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
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
    marginBottom: 8,
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
    justifyContent: 'center',
  },
  temperatureText: {
    fontSize: 120,
    fontWeight: 'bold',
    color: colors.white,
  },
  symbol: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.white,
  },
  weatherIcon: {
    width: 200,
    height: 200,
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
