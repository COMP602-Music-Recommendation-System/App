import { IonicModule, ToastController } from '@ionic/angular';
import { Component, inject, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';
import { catchError, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';

import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
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

  private loginService = inject(LoginService);
  private toastController = inject(ToastController);

  async ngOnInit(): Promise<void> {
    const loggedIn = await this.loginService.verify();
    if (loggedIn) {
      const next = localStorage.getItem('next') || '/';
      localStorage.removeItem('next');
      location.replace(next);
      return;
    }

    this.loginService
      .loadMethod()
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.presentToast('Could not load login options.');
          return throwError(() => error);
        })
      )
      .subscribe((methods) => {
        this.loaded = this.showMethod.length == methods.length;
        this.showMethod = methods.slice(0, 3);
        this.allMethod = methods;
      });
  }

  load(): void {
    if (this.loaded) return;
    this.showMethod.push(...this.allMethod);
    this.allMethod = [];
    this.loaded = true;
  }

  async login(method: string): Promise<void> {
    try {
      const url = await this.loginService.login(method);
      window.location.href = url;
    } catch (error) {
      console.error('Login error', error);
      this.presentToast(`Login with ${method} failed.`);
    }
  }

  private async presentToast(message: string): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'bottom'
    });
    await toast.present();
  }
}
