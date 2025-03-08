import React, {useEffect, useState} from 'react';
import {Animated, StyleSheet} from 'react-native';

interface AnimatedWeatherIconProps {
  iconUrl: any;
}

const AnimatedWeatherIcon: React.FC<AnimatedWeatherIconProps> = ({iconUrl}) => {
  const pulseAnim = useState(new Animated.Value(1))[0];

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
  return (
    <Animated.Image
      source={iconUrl}
      style={[styles.weatherIcon, {transform: [{scale: pulseAnim}]}]}
    />
  );
};

const styles = StyleSheet.create({
  weatherIcon: {
    width: 200,
    height: 200,
    objectFit: 'contain',
  },
});

export default AnimatedWeatherIcon;
