import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../../constants/colors';
import {SearchHistory} from '../../data/models/SearchHistory';
import {useSearchHistoryStore} from '../../domain/store/useSearchHistoryStore';
import ListItem from '../components/ListItem';
import {RootStackParamList} from '../navigation/types';
import {weatherIcons} from '../utils/weatherIcons';
import EmptyHistory from '../components/EmptyHistory';

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

  const handleHistoryPress = (historyItem: SearchHistory) => {
    navigation.navigate('Details', historyItem);
  };

  const handleCityChange = (text: string) => {
    setCity(text);
  };

  const handleRemoveHistoryItem = async (id: number) => {
    await removeFromHistory(id);
  };

  const handleClearHistory = async () => {
    await clearHistory();
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
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Ingrese el nombre de la ciudad"
            value={city}
            onChangeText={handleCityChange}
            onSubmitEditing={handleSearch}
            placeholderTextColor={colors.gray}
          />
          {city.length > 0 && (
            <TouchableOpacity onPress={clearInput} style={styles.clearButton}>
              <Icon name="close-circle" size={24} color={colors.darkGray} />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={handleSearch}
            style={styles.searchButton}>
            <Icon name="search" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>
      </View>

      {history.length > 0 ? (
        <>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={handleClearHistory}
            style={styles.clearHistoryContainer}>
            <Icon name="trash" size={20} color={colors.darkGray} />
            <Text style={styles.clearHistoryText}>Limpiar Historial</Text>
          </TouchableOpacity>
          <FlatList
            data={history}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <ListItem
                item={item}
                onPress={() => handleHistoryPress(item)}
                showRemoveButton={true}
                onRemove={() => handleRemoveHistoryItem(item.id)}
              />
            )}
            ItemSeparatorComponent={() => <View style={{height: 8}} />}
          />
        </>
      ) : (
        <EmptyHistory />
      )}
    </KeyboardAvoidingView>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.separatorGray,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderRadius: 100,
    flex: 1,
    marginRight: 8, // Espacio entre el input y el botón de buscar
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 16,
    color: colors.darkGray,
  },
  clearButton: {
    marginRight: 8,
  },
  searchButton: {
    backgroundColor: colors.primary,
    padding: 8,
    borderRadius: 100,
  },
  clearHistoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 16,
  },
  clearHistoryText: {
    color: colors.darkGray,
    marginLeft: 8,
  },
  emptyHistoryContainer: {
    marginTop: 64,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 32,
  },
  emptyHistoryText: {
    fontSize: 16,
    color: colors.gray,
  },
  weatherIcon: {
    width: 160,
    height: 160,
    objectFit: 'contain',
  },
});

export default HomeScreen;
