import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {
  Button,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {RootStackParamList} from '../navigation/types';
import {useSearchHistoryStore} from '../../domain/store/useSearchHistoryStore';
import {SearchHistory} from '../../data/models/SearchHistory';
import CountryFlag from 'react-native-country-flag';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const {top} = useSafeAreaInsets();
  const [city, setCity] = useState('');
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const {history, fetchHistory, clearHistory, removeFromHistory} =
    useSearchHistoryStore();

  useEffect(() => {
    fetchHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = () => {
    if (city.trim()) {
      navigation.navigate('CitySuggestions', {query: city});
    } else {
      // alert('Por favor ingrese una ciudad válida.');
    }
  };

  const handleClearHistory = async () => {
    await clearHistory();
  };

  const handleHistoryPress = (historyItem: SearchHistory) => {
    navigation.navigate('Details', historyItem);
  };

  const handleCityChange = (text: string) => {
    setCity(text);
  };

  const handleRemoveHistoryItem = async (id: number) => {
    await removeFromHistory(id);
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
      <Text style={styles.title}>Consulta el Clima</Text>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Ingrese el nombre de la ciudad"
          value={city}
          onChangeText={handleCityChange}
        />
        <View>
          <Icon name="search" />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Buscar" onPress={handleSearch} />
        <Button title="Limpiar Historial" onPress={handleClearHistory} />
      </View>
      <FlatList
        data={history}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View style={styles.historyItemContainer}>
            <TouchableOpacity onPress={() => handleHistoryPress(item)}>
              <View style={styles.historyItem}>
                <Text>
                  {item.city},{item.state || 'N/A'}, {item.country}
                </Text>
                <CountryFlag isoCode={item.country} size={25} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleRemoveHistoryItem(item.id)}>
              <Text style={styles.removeButton}>X</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  historyItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  historyItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  removeButton: {
    color: 'red',
    fontWeight: 'bold',
    padding: 8,
  },
  suggestionItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    borderRadius: 8,
    marginBottom: 8,
  },
});

export default HomeScreen;
