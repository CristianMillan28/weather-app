import React, {useEffect, useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {colors} from '../../constants/colors';
import {Weather} from '../../data/models/Weather';

interface CurrentTimeProps {
  weather: Weather;
}

const CurrentTime: React.FC<CurrentTimeProps> = ({weather}) => {
  const [currentTime, setCurrentTime] = useState<string>('');

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

  return <Text style={styles.currentTime}>{currentTime}</Text>;
};

const styles = StyleSheet.create({
  currentTime: {
    fontSize: 18,
    color: colors.white,
    textAlign: 'center',
  },
});

export default CurrentTime;
