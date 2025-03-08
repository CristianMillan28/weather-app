import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';
import { weatherIcons } from '../utils/weatherIcons';

const EmptyHistory = () => {
  const [iconIndex, setIconIndex] = useState(0);
  const icons = [
    weatherIcons['sun-cloud'],
    weatherIcons.bolt,
    weatherIcons['cloud-snow'],
    weatherIcons['moon-cloud-rain'],
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIconIndex(prevIndex => (prevIndex + 1) % icons.length);
    }, 3000);

    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.emptyHistoryContainer}>
      <Text style={styles.emptyHistoryText}>
        Aquí saldrán tus búsquedas recientes
      </Text>
      <View
        style={styles.iconContainer}>
        <Image source={icons[iconIndex]} style={styles.weatherIcon} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyHistoryContainer: {
    marginTop: 64,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
  },
  emptyHistoryText: {
    fontSize: 16,
    color: colors.gray,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    width: 200,
    borderRadius: 100,
    backgroundColor: colors.primary,
  },
  weatherIcon: {
    width: 160,
    height: 160,
    objectFit: 'contain',
  },
});

export default EmptyHistory;
