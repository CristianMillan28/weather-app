import React, {useEffect, useState} from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {colors} from '../../../constants/colors';
import {useSearchHistoryStore} from '../../../domain/store/useSearchHistoryStore';
import EmptyHistory from './components/EmptyHistory';
import HistoryList from './components/HistoryList';
import SearchInput from './components/SearchInput';
import {RootStackParamList} from '../../navigation/types';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const {top} = useSafeAreaInsets();
  const [city, setCity] = useState('');
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const {history, fetchHistory} = useSearchHistoryStore();

  useEffect(() => {
    fetchHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clearInput = () => {
    setCity('');
  };

  const handleSearch = () => {
    if (city.trim()) {
      navigation.navigate('CitySuggestions', {query: city});
      clearInput();
    } else {
    }
  };

  const handleCityChange = (text: string) => {
    setCity(text);
  };

  return (
    <KeyboardAvoidingView
      style={[
        styles.container,
        {
          paddingTop: top + 32,
        },
      ]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Text style={styles.title}>Weather App</Text>
      <SearchInput
        city={city}
        onCityChange={handleCityChange}
        onClearInput={clearInput}
        onSearch={handleSearch}
      />
      {history.length > 0 ? <HistoryList /> : <EmptyHistory />}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 32,
    marginBottom: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    color: colors.primary,
  },
});

export default HomeScreen;
