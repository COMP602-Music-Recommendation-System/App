import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  imports: [CommonModule, FormsModule, IonicModule]
})
export class MainPage implements OnInit {
  constructor(private loginService: LoginService) {}

  ngOnInit() {}

  logout() {
    this.loginService.logout().subscribe(() => {
      localStorage.setItem('next', location.href);
      location.href = '/#/login';
    });
  }
}
