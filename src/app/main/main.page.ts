import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

import {
  SpotifyService,
  RecommendationItem,
  RecommendationsResponse
} from '../spotify.service';
import { LoginService } from '../login/login.service';

interface SpotifyArtist {
  name: string;
}
interface SpotifyTrack {
  name: string;
  artists: SpotifyArtist[];
  album?: {
    name: string;
    images?: { url: string; height?: number; width?: number }[];
  };
}
interface SpotifyTopTracksResponse {
  items: SpotifyTrack[];
}

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  imports: [CommonModule, FormsModule, IonicModule]
})
export class MainPage implements OnInit {
  topTracks: SpotifyTrack[] = [];
  isLoadingData = false;
  errorLoadingData: string | null = null;

  recommendations: RecommendationItem[] = [];
  isLoadingRecommendations = false;
  errorLoadingRecommendations: string | null = null;
  recommendationsMessage: string | null = null;

  constructor(
    private loginService: LoginService,
    private spotifyService: SpotifyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.importSpotifyData();
  }

  logout(): void {
    this.loginService.logout().subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err) => console.error('Logout failed', err)
    });
  }

  importSpotifyData(): void {
    if (this.isLoadingData) {
      return;
    }

    this.isLoadingData = true;
    this.errorLoadingData = null;

    this.spotifyService
      .getTopTracks()
      .pipe(finalize(() => (this.isLoadingData = false)))
      .subscribe({
        next: (data: SpotifyTopTracksResponse) => {
          this.topTracks = data.items ?? [];
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error fetching Spotify data', err);
          this.errorLoadingData =
            err.error?.detail || err.message || 'Failed to load Spotify data.';
          this.topTracks = [];
        }
      });
  }
  fetchRecommendations(): void {
    if (this.isLoadingRecommendations) {
      return;
    }
    this.isLoadingRecommendations = true;
    this.errorLoadingRecommendations = null;
    this.recommendations = [];
    this.recommendationsMessage = null;

    this.spotifyService
      .getRecommendations()
      .pipe(finalize(() => (this.isLoadingRecommendations = false)))
      .subscribe({
        next: (response: RecommendationsResponse) => {
          this.recommendations = response.items ?? [];
          if (response.message) {
            this.recommendationsMessage = response.message;
          }
          // If no items and no specific message, provide a generic one.
          if (this.recommendations.length === 0 && !response.message) {
            this.recommendationsMessage =
              'No recommendations were generated at this time.';
          }
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error fetching recommendations', err);
          this.errorLoadingRecommendations =
            err.error?.detail ||
            err.message ||
            'Failed to load recommendations.';
          this.recommendations = [];
        }
      });
  }
  getArtistNames(artists?: SpotifyArtist[]): string {
    return artists && artists.length
      ? artists.map((a) => a.name).join(', ')
      : 'Unknown Artist';
  }

  getSmallestAlbumImage(album?: SpotifyTrack['album']): string | null {
    const images = album?.images;
    if (!images?.length) {
      return null;
    }
    const sorted = images
      .slice()
      .sort((a, b) => (a.height ?? Infinity) - (b.height ?? Infinity));
    return sorted[0]?.url ?? null;
  }
}
