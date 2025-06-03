import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton
} from '@ionic/angular/standalone';
import { NzIconModule, provideNzIconsPatch } from 'ng-zorro-antd/icon';
import { NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { PlusOutline } from '@ant-design/icons-angular/icons';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { LoginService } from 'src/app/login/login.service';

import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  providers: [provideNzIconsPatch([PlusOutline])],
  imports: [
    NzUploadModule,
    NzModalModule,
    CommonModule,
    NzIconModule,
    IonContent,
    IonToolbar,
    IonButton,
    IonHeader,
    IonTitle
  ]
})
export class ProfilePage implements OnInit {
  file: NzUploadFile | undefined;
  isVisible = false;
  loading = false;
  avatarUrl = '';
  avatar = '';

  errorType = false;
  errorSize = false;

  constructor(
    private profileService: ProfileService,
    private loginService: LoginService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.avatar = await this.profileService.avatar();
  }

  logout() {
    this.loginService
      .logout()
      .subscribe(() => this.router.navigate(['/login']));
  }

  beforeUpload(file: NzUploadFile) {
    this.file = file;
    return false;
  }

  upload() {}

  private getBase64(img: File, callback: (img: string) => void) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  handlePreview = async (file: NzUploadFile): Promise<void> => {
    this.errorType = file.type != 'image/jpeg' && file.type != 'image/png';
    this.errorSize = file.size! / 1024 / 1024 > 2;

    // if (!file.url && !file.preview) {
    //   file.preview = await getBase64(file.originFileObj!);
    // }
    // this.previewImage = file.url || file.preview;
    // this.previewVisible = true;
  };
}
