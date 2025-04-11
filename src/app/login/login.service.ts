import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, firstValueFrom, of } from 'rxjs';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  root = `${environment.domain}/auth`;

  constructor(private http: HttpClient) {}

  loadMethod() {
    return this.http.get<string[]>(`${this.root}/method`);
  }

  async login(method: string) {
    return await firstValueFrom(
      this.http.get<string>(`${this.root}/${method}/login`)
    );
  }

  async verify() {
    const response = await firstValueFrom(
      this.http.get<Response>(`${this.root}/verify`).pipe(
        catchError((error: HttpErrorResponse) => {
          return of(error.error);
        })
      )
    );
    return response.msg == 'Success';
  }

  logout() {
    return this.http.get<string>(`${this.root}/logout`);
  }
}
