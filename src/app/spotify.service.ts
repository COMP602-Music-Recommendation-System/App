import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../environments/environment';

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
}
