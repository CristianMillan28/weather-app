import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors} from '../../constants/colors';
import {SearchHistory} from '../../data/models/SearchHistory';
import {GetCitySuggestionsUseCase} from '../../domain/usecases/GetCitySuggestionsUseCase';
import LoadingIndicator from '../components/LoadingIndicator';
import ListItem from '../components/ListItem';
import {RootStackParamList} from '../navigation/types';

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

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const suggestions = await GetCitySuggestionsUseCase(query);
        setSuggestions(suggestions);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [query]);

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
    return (
      <View
        style={[
          styles.container,
          {
            paddingTop: top + 32,
          },
        ]}>
        <LoadingIndicator />
      </View>
    );
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  if (suggestions.length === 0) {
    return (
      <View
        style={[
          styles.container,
          {
            paddingTop: top + 32,
          },
        ]}>
        <Text style={styles.title}>No se encontraron sugerencias</Text>
      </View>
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
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <ListItem
            item={item}
            onPress={() => handleSuggestionPress(item)}
          />
        )}
        ItemSeparatorComponent={() => <View style={{height: 8}} />}
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
});

export default CitySuggestionsScreen;
