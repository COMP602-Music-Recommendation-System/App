export interface Song {
  id: number;
  title: string;
  artist: string;
  album?: string;
  genre?: string;
  year?: number;
  duration?: number;
  popularity?: number;
}

export interface UserPreference {
  preference_type: string;
  preference_value: string;
  weight: number;
  status?: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}