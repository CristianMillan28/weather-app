import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {GetCitySuggestionsUseCase} from '../../domain/usecases/GetCitySuggestionsUseCase';
import {RootStackParamList} from '../navigation/types';
import {SearchHistory} from '../../data/models/SearchHistory';
import CountryFlag from 'react-native-country-flag';

type CitySuggestionsScreenRouteProp = RouteProp<
  RootStackParamList,
  'CitySuggestions'
>;
type CitySuggestionsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CitySuggestions'
>;

const CitySuggestionsScreen = () => {
  const route = useRoute<CitySuggestionsScreenRouteProp>();
  const navigation = useNavigation<CitySuggestionsScreenNavigationProp>();
  const {query} = route.params;
  const [suggestions, setSuggestions] = useState<SearchHistory[]>([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const suggestions = await GetCitySuggestionsUseCase(query);
        setSuggestions(suggestions);
      } catch (error) {
        console.error(error);
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seleccione una ciudad</Text>
      <FlatList
        data={suggestions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => handleSuggestionPress(item)}>
            <View style={{}}>
              <Text>{item.city}</Text>
              {item.state ? <Text>{item.state}</Text> : null}
              <Text>
                <CountryFlag isoCode={item.country} size={16} />
                {item.country}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  suggestionItem: {},
});

export default CitySuggestionsScreen;
