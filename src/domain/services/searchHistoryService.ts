import {SearchHistory} from '../../data/models/SearchHistory';
import {
  getSearchHistory,
  clearSearchHistory,
  saveSearchHistory,
} from '../../data/repositories/WeatherRepository';

export const fetchSearchHistory = async (): Promise<SearchHistory[]> => {
  return await getSearchHistory();
};

export const addSearchHistoryItem = async (
  historyItem: SearchHistory,
): Promise<SearchHistory[]> => {
  const searchHistory = await getSearchHistory();
  const itemIndex = searchHistory.findIndex(item => item.id === historyItem.id);
  if (itemIndex !== -1) {
    const [existingItem] = searchHistory.splice(itemIndex, 1);
    searchHistory.unshift(existingItem);
  } else {
    searchHistory.unshift(historyItem);
  }
  await saveSearchHistory(searchHistory);
  return searchHistory;
};

export const clearAllSearchHistory = async (): Promise<void> => {
  await clearSearchHistory();
};

export const removeSearchHistoryItem = async (
  id: number,
): Promise<SearchHistory[]> => {
  let searchHistory = await getSearchHistory();
  searchHistory = searchHistory.filter(item => item.id !== id);
  await saveSearchHistory(searchHistory);
  return searchHistory;
};
