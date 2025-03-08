import React from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../../constants/colors';

interface SearchInputProps {
  city: string;
  onCityChange: (text: string) => void;
  onClearInput: () => void;
  onSearch: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  city,
  onCityChange,
  onClearInput,
  onSearch,
}) => {
  return (
    <View style={styles.searchInputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Ingrese el nombre de la ciudad"
        value={city}
        onChangeText={onCityChange}
        onSubmitEditing={onSearch}
        placeholderTextColor={colors.gray}
      />
      {city.length > 0 && (
        <TouchableOpacity onPress={onClearInput} style={styles.clearButton}>
          <Icon name="close-circle" size={24} color={colors.darkGray} />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={onSearch}
        style={styles.searchButton}>
        <Icon name="search" size={24} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.separatorGray,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderRadius: 100,
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
});

export default SearchInput;
