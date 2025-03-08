import React, {useEffect, useState} from 'react';
import ErrorMessage from '../../../components/ErrorMessage';
import {StyleSheet, View} from 'react-native';

const EmptyHistory = () => {
  const [iconIndex, setIconIndex] = useState(0);
  const icons = [
    'weather-sunny',
    'weather-lightning',
    'weather-snowy',
    'weather-night',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIconIndex(prevIndex => (prevIndex + 1) % icons.length);
    }, 3000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.flex1}>
      <ErrorMessage
        message={'Aquí saldrán tus búsquedas recientes'}
        icon={icons[iconIndex]}
      />
      <View style={styles.flex1} />
    </View>
  );
};

export default EmptyHistory;

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
});
