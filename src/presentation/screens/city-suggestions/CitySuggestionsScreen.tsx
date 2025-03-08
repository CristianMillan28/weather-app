import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {
  RouteProp,
  useNavigation,
  useRoute,
  useFocusEffect,
} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {colors} from '../../../constants/colors';
import {SearchHistory} from '../../../data/models/SearchHistory';
import {GetCitySuggestionsUseCase} from '../../../domain/usecases/GetCitySuggestionsUseCase';
import LoadingIndicator from '../../components/LoadingIndicator';
import ListItem from '../../components/ListItem';
import {RootStackParamList} from '../../navigation/types';
import ErrorMessage from '../../components/ErrorMessage';

type CitySuggestionsScreenRouteProp = RouteProp<
  RootStackParamList,
  'CitySuggestions'
>;
type CitySuggestionsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CitySuggestions'
>;

const CitySuggestionsScreen = () => {
  const {top} = useSafeAreaInsets();

  const route = useRoute<CitySuggestionsScreenRouteProp>();
  const navigation = useNavigation<CitySuggestionsScreenNavigationProp>();
  const {query} = route.params;

  const [suggestions, setSuggestions] = useState<SearchHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        headerTintColor: colors.darkGray,
      });
    }, [navigation]),
  );

  const fetchSuggestions = async () => {
    try {
      setLoading(true);
      const suggestionsCities = await GetCitySuggestionsUseCase(query);
      setSuggestions(suggestionsCities);
      setLoading(false);

      if (suggestions.length === 1) {
        navigation.navigate('Details', suggestions[0]);
      }
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuggestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    if (!loading) {
      navigation.setOptions({
        headerTintColor: colors.darkGray,
      });
    } else {
      navigation.setOptions({
        headerTintColor: colors.white,
      });
    }
  }, [loading, navigation]);

  const handleSuggestionPress = (suggestion: SearchHistory) => {
    const searchHistory = {
      city: suggestion.city,
      state: suggestion.state,
      country: suggestion.country,
      lat: suggestion.lat,
      lon: suggestion.lon,
    };
    navigation.navigate('Details', searchHistory);
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorMessage showBackButton message={error} />;
  }

  if (suggestions.length === 0) {
    return (
      <ErrorMessage showBackButton message="No se encontraron sugerencias" />
    );
  }

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: top + 32,
        },
      ]}>
      <Text style={styles.title}>Seleccione una ciudad</Text>
      <FlatList
        data={suggestions}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <ListItem item={item} onPress={() => handleSuggestionPress(item)} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    position: 'relative',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  error: {
    color: colors.errorRed,
    textAlign: 'center',
    marginTop: 20,
  },
  listContainer: {gap: 8},
});

export default CitySuggestionsScreen;
