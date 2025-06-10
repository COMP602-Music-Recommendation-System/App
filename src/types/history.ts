// History and preferences types
export interface HistoryItem {
  id: number;
  songId: number;
  userId: number;
  listenedAt: string;
  completed: boolean;
  song?: {
    id: number;
    title: string;
    artist: string;
    coverImage?: string;
    duration: number;
  };
}

export interface UserPreferences {
  id: number;
  userId: number;
  favoriteGenre: string | null;
  favoriteArtist: string | null;
  preferredVolume: number;
  darkMode: boolean;
}

export interface HistoryCreateRequest {
  songId: number;
  completed: boolean;
}

export interface PreferencesUpdateRequest {
  favoriteGenre?: string | null;
  favoriteArtist?: string | null;
  preferredVolume?: number;
  darkMode?: boolean;
}