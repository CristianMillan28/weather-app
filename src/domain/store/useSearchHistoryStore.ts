import {create} from 'zustand';
import {SearchHistory} from '../../data/models/SearchHistory';
import {
  getSearchHistory,
  clearSearchHistory,
  saveSearchHistory,
} from '../../data/repositories/WeatherRepository';

interface SearchHistoryState {
  history: SearchHistory[];
  fetchHistory: () => Promise<void>;
  addToHistory: (historyItem: SearchHistory) => Promise<void>;
  clearHistory: () => Promise<void>;
  removeFromHistory: (id: number) => Promise<void>;
}

export const useSearchHistoryStore = create<SearchHistoryState>(set => ({
  history: [],
  fetchHistory: async () => {
    const searchHistory = await getSearchHistory();
    set({history: searchHistory});
  },
  addToHistory: async (historyItem: SearchHistory) => {
    const searchHistory = await getSearchHistory();
    const itemIndex = searchHistory.findIndex(item => item.id === historyItem.id);
    if (itemIndex !== -1) {
      const [existingItem] = searchHistory.splice(itemIndex, 1);
      searchHistory.unshift(existingItem);
    } else {
      searchHistory.unshift(historyItem);
    }
    await saveSearchHistory(searchHistory);
    set({history: searchHistory});
  },
  removeFromHistory: async (id: number) => {
    const searchHistory = await getSearchHistory();
    const newHistory = searchHistory.filter(item => item.id !== id);
    await saveSearchHistory(newHistory);
    set({history: newHistory || []});
  },
  clearHistory: async () => {
    await clearSearchHistory();
    set({history: []});
  },
}));
