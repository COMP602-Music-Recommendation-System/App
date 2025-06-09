import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs/operators';
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
  getAccessToken(): Observable<string> {
    return this.http
      .get<{ access_token: string }>(`${this.apiUrl}/token`, {
        withCredentials: true
      })
      .pipe(switchMap((res) => [res.access_token]));
  }

  searchSpotify(query: string, type: string = 'track'): Observable<any> {
    return this.getAccessToken().pipe(
      switchMap((token: string) => {
        const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(
          query
        )}&type=${type}&limit=20`;
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        return this.http.get<any>(url, { headers });
      })
    );
  }
}
