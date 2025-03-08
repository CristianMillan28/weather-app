import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import CountryFlag from 'react-native-country-flag';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../constants/colors';
import {SearchHistory} from '../../data/models/SearchHistory';

interface ListItemProps {
  item: SearchHistory;
  onPress: () => void;
  showRemoveButton?: boolean;
  onRemove?: () => void;
}

const ListItem: React.FC<ListItemProps> = ({
  item,
  onPress,
  showRemoveButton = false,
  onRemove,
}) => {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
      <View style={styles.suggestionItem}>
        <View style={styles.cityInfo}>
          <View style={styles.cityNameContainer}>
            <Text style={styles.cityName}>{item.city}</Text>
            <CountryFlag isoCode={item.country} size={16} />
          </View>
          {item.state ? <Text style={styles.state}>{item.state}</Text> : null}
        </View>
        {showRemoveButton && (
          <TouchableOpacity onPress={onRemove}>
            <Icon name="delete" size={24} color={colors.gray} />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  suggestionItem: {
    padding: 16,
    backgroundColor: colors.white,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.separatorGray,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 5,
  },
  cityInfo: {
    flex: 1,
  },
  cityNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cityName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.darkGray,
  },
  state: {
    fontSize: 18,
    color: colors.darkGray,
  },
});

export default ListItem;
