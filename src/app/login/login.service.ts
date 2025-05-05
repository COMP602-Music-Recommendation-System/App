import { catchError, firstValueFrom, map, Observable, of } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

interface AuthUrlResponse {
  authorization_url: string;
}
interface StatusResponse {
  msg: string;
}

@Injectable({ providedIn: 'root' })
export class LoginService {
  private root = `${environment.domain}/auth`;

  constructor(private http: HttpClient) {}

  loadMethod(): Observable<string[]> {
    return this.http.get<string[]>(`${this.root}/method`);
  }

  async login(method: string): Promise<string> {
    const url = await firstValueFrom(
      this.http.get<AuthUrlResponse>(`${this.root}/${method}/login`).pipe(
        map((res) => res.authorization_url),
        catchError((error: HttpErrorResponse) => {
          console.error('Login failed', error);
          throw new Error(`Login URL error (${error.status})`);
        })
      )
    );
    if (!url) {
      throw new Error('No authorization URL');
    }
    return url;
  }

  async verify(): Promise<boolean> {
    const result = await firstValueFrom(
      this.http
        .get<StatusResponse>(`${this.root}/verify`, { withCredentials: true })
        .pipe(
          catchError((error: HttpErrorResponse) => {
            console.log('Verify error', error.status);
            return of({ msg: 'Error' });
          })
        )
    );
    return result.msg === 'Success';
  }

  logout(): Observable<StatusResponse> {
    return this.http.get<StatusResponse>(`${this.root}/logout`, {
      withCredentials: true
    });
  }
}
