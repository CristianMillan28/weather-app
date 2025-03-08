import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {HeaderBackButton} from '@react-navigation/elements';

interface Props {
  onPress?: () => void;
}

export const BackButton: React.FC<Props> = ({}) => {
  const navigator = useNavigation();
  const handleGoBack = () => navigator.goBack();

  return (
    <HeaderBackButton
      tintColor={'#fff'}
      onPress={handleGoBack}
    />
  );
};
