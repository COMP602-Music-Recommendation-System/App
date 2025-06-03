import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

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
      this.http.get<string>(`${this.root}/${method}/login`)
    );
    return url;
  }

  async verify(): Promise<boolean> {
    const result = await firstValueFrom(
      this.http.get<StatusResponse>(`${this.root}/verify`)
    );
    return result.msg === 'Success';
  }

  logout(): Observable<StatusResponse> {
    return this.http.get<StatusResponse>(`${this.root}/logout`);
  }
}
