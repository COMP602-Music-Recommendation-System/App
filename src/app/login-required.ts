import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { LoginService } from './login/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginRequired {
  constructor(private loginService: LoginService) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const verify = await this.loginService.verify();
    if (!verify) {
      localStorage.setItem('next', state.url);
      location.href = '/#/login';
    }
    return verify;
  }
}
