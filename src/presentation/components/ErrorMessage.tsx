import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../constants/colors';

interface ErrorMessageProps {
  message: string;
  icon?: string;
  showBackButton?: boolean;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  icon,
  showBackButton = false,
}) => {
  const isNetworkError = message.includes('Network Error');
  const navigation = useNavigation();

  const iconName = isNetworkError ? 'wifi-off' : icon || 'cloud-alert';

  return (
    <View style={styles.container}>
      <Icon name={iconName} size={64} color={colors.gray} />
      <Text style={styles.text}>
        {isNetworkError ? 'Error de conexión' : message}
      </Text>
      {showBackButton ? (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Volver atrás</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  text: {
    fontSize: 16,
    color: colors.gray,
    textAlign: 'center',
    marginTop: 16,
  },
  backButton: {
    marginTop: 8,
  },
  backButtonText: {
    color: colors.primary,
    fontSize: 16,
  },
});

export default ErrorMessage;
