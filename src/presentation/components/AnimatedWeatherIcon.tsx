import React from 'react';
import {Animated, StyleSheet} from 'react-native';

interface AnimatedWeatherIconProps {
  iconUrl: any;
  pulseAnim: Animated.Value;
}

const AnimatedWeatherIcon: React.FC<AnimatedWeatherIconProps> = ({
  iconUrl,
  pulseAnim,
}) => {
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
