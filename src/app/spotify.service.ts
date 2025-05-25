import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../environments/environment';

export interface RecommendationItem {
  track: string;
  artist: string;
  album: string;
  reason: string;
  // Add mbid_track and mbid_artist if they are returned from your backend
  // and you want to use them on the frontend
}

export interface RecommendationsResponse {
  items: RecommendationItem[];
  message?: string; // For cases like no top tracks found or other info messages
}
@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private apiUrl = `${environment.domain}/spotify-data`;

  constructor(private http: HttpClient) {}
  getTopTracks(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/top-tracks`, {
      withCredentials: true
    });
  }
  getRecommendations(): Observable<RecommendationsResponse> {
    return this.http.get<RecommendationsResponse>(
      `${this.apiUrl}/recommendations`,
      {
        withCredentials: true
      }
    );
  }
}
