import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/colors';
import { weatherIcons } from '../utils/weatherIcons';

const LoadingIndicator: React.FC = () => {
  const iconUrl = weatherIcons.sun;
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prevDots => (prevDots.length < 3 ? prevDots + '.' : ''));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={iconUrl} style={styles.icon} />
      <Text style={styles.text}>Cargando{dots}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  text: {
    fontSize: 18,
    color: colors.white,
    marginTop: 8,
  },
});

export default LoadingIndicator;
