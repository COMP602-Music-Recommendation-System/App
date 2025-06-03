import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { LoginRequired } from './login-required';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then((m) => m.LoginPage)
  },

  {
    path: '',
    canActivate: [LoginRequired],
    loadComponent: () => import('./main/main.page').then((m) => m.MainPage),
    children: [
      {
        path: 'profile',
        loadComponent: () =>
          import('./main/profile/profile.page').then((m) => m.ProfilePage)
      }
    ]
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
