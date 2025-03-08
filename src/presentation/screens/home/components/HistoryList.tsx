import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../../../constants/colors';
import { SearchHistory } from '../../../../data/models/SearchHistory';
import { useSearchHistoryStore } from '../../../../domain/store/useSearchHistoryStore';
import ListItem from '../../../components/ListItem';

interface HistoryListProps {}

const HistoryList: React.FC<HistoryListProps> = ({}) => {
  const navigation = useNavigation<any>();

  const {history, clearHistory, removeFromHistory} = useSearchHistoryStore();
  const handleHistoryPress = (historyItem: SearchHistory) => {
    navigation.navigate('Details', historyItem);
  };

  const handleRemoveHistoryItem = async (id: number) => {
    await removeFromHistory(id);
  };

  const handleClearHistory = async () => {
    await clearHistory();
  };
  return (
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
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <ListItem
            item={item}
            onPress={() => handleHistoryPress(item)}
            showRemoveButton={true}
            onRemove={() => handleRemoveHistoryItem(item.id)}
          />
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
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
  listContainer: {gap: 8},
});

export default HistoryList;
