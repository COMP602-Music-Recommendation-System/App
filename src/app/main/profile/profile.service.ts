import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { environment } from 'src/environments/environment';
import { NetworkService } from 'src/app/network.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private root = `${environment.domain}/profile`;

  constructor(private http: NetworkService) {}

  async avatar() {
    return await firstValueFrom(this.http.get<string>(`${this.root}/avatar`));
  }

  upload() {}
}
