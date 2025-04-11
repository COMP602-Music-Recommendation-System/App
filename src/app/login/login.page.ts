import { NzDividerModule } from 'ng-zorro-antd/divider';
import { Component, OnInit } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NzDividerModule,
    NzIconModule
  ]
})
export class LoginPage implements OnInit {
  loaded = false;
  showMethod: string[] = [];
  allMethod: string[] = [];

  constructor(private loginService: LoginService) {}

  async ngOnInit() {
    const verify = await this.loginService.verify();
    if (verify) {
      let next = localStorage.getItem('next');
      if (next) {
        localStorage.removeItem('next');
      } else next = '/';
      location.href = next;
    }

    this.loginService.loadMethod().subscribe((allMethod) => {
      for (let i = 0; i < 3; i++) {
        const method = allMethod.shift();
        if (method) this.showMethod.push(method);
      }
      this.allMethod = allMethod;
    });
  }

  load() {
    while (true) {
      const method = this.allMethod.shift();
      if (method) this.showMethod.push(method);
      else break;
    }
    this.loaded = true;
  }

  async login(method: string) {
    location.href = await this.loginService.login(method);
  }
}
