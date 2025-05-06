import axios from 'axios';
import { HistoryItem, UserPreferences, HistoryCreateRequest, PreferencesUpdateRequest } from '../types/history';
import { getAuthHeader } from '../utils/auth';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const historyService = {
  async addToHistory(data: HistoryCreateRequest): Promise<HistoryItem> {
    const response = await axios.post(`${API_URL}/history/`,
      { song_id: data.songId, completed: data.completed },
      { headers: getAuthHeader() }
    );
    return response.data;
  },

  async getHistory(): Promise<HistoryItem[]> {
    const response = await axios.get(`${API_URL}/history/`,
      { headers: getAuthHeader() }
    );
    return response.data;
  },

  async deleteHistoryItem(id: number): Promise<void> {
    await axios.delete(`${API_URL}/history/${id}`,
      { headers: getAuthHeader() }
    );
  },

  async updatePreferences(data: PreferencesUpdateRequest): Promise<UserPreferences> {
    const response = await axios.put(`${API_URL}/history/preferences`,
      {
        favorite_genre: data.favoriteGenre,
        favorite_artist: data.favoriteArtist,
        preferred_volume: data.preferredVolume,
        dark_mode: data.darkMode
      },
      { headers: getAuthHeader() }
    );
    return response.data;
  },

  async getPreferences(): Promise<UserPreferences> {
    const response = await axios.get(`${API_URL}/history/preferences`,
      { headers: getAuthHeader() }
    );
    return response.data;
  },

  async getRecommendations(limit = 10): Promise<any[]> {
    const response = await axios.get(`${API_URL}/history/recommendations?limit=${limit}`,
      { headers: getAuthHeader() }
    );
    return response.data;
  }
};