import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../../../../constants/colors';
import {Weather} from '../../../../data/models/Weather';

interface CurrentTimeProps {
  weather: Weather;
}

const CurrentTime: React.FC<CurrentTimeProps> = ({weather}) => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>('');

  useEffect(() => {
    if (weather) {
      const interval = setInterval(() => {
        const date = new Date((Date.now() / 1000 + weather.timezone) * 1000);
        setCurrentTime(
          date.toLocaleTimeString('es-CO', {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'UTC',
          }),
        );
        setCurrentDate(
          date.toLocaleDateString('es-CO', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'UTC',
          }),
        );
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [weather]);

  return (
    <View style={styles.container}>
      <Text style={styles.currentTime}>{currentTime}</Text>
      <Text style={styles.currentDate}>{currentDate}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  currentTime: {
    fontSize: 18,
    color: colors.white,
    textAlign: 'center',
  },
  currentDate: {
    fontSize: 16,
    color: colors.white,
    textAlign: 'center',
  },
});

export default CurrentTime;
