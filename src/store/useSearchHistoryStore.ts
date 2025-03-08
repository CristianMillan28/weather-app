import {create} from 'zustand';
import {SearchHistory} from '../types/SearchHistory';
import {
  getSearchHistory,
  clearSearchHistory,
  saveSearchHistory,
} from '../data/repositories/WeatherRepository';

interface SearchHistoryState {
  history: SearchHistory[];
  fetchHistory: () => Promise<void>;
  addToHistory: (historyItem: SearchHistory) => Promise<void>;
  clearHistory: () => Promise<void>;
}

export const useSearchHistoryStore = create<SearchHistoryState>(set => ({
  history: [],
  fetchHistory: async () => {
    const searchHistory = await getSearchHistory();
    set({history: searchHistory});
  },
  addToHistory: async (historyItem: SearchHistory) => {
    const searchHistory = await getSearchHistory();
    const cityExists = searchHistory.some(item => item.id === historyItem.id);
    if (!cityExists) {
      searchHistory.push(historyItem);
      await saveSearchHistory(searchHistory);
      set({history: searchHistory});
    }
  },
  clearHistory: async () => {
    await clearSearchHistory();
    set({history: []});
  },
}));
