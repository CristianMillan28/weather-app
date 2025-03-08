import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../../../constants/colors';

interface WeatherDetailBoxProps {
  iconName: string;
  title: string;
  value: string;
}

const WeatherDetailBox: React.FC<WeatherDetailBoxProps> = ({iconName, title, value}) => {
  return (
    <View style={styles.flexBox}>
      <Icon name={iconName} size={40} color="#555" />
      <Text style={styles.flexTitle}>{title}</Text>
      <Text style={styles.flexDescription}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  flexBox: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    padding: 16,
    width: '30%',
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

export default WeatherDetailBox;
