import { Component, OnInit } from '@angular/core';
import { MenuController, ToastController, AlertController } from '@ionic/angular';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import {NavController} from "@ionic/angular";
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  async ngOnInit() {
    const alert = await this.alertCtrl.create({
      header: '提示',
      message: '请联系管理员',
      buttons: [
        {
          text: '确定',
          handler: () => {
            this.router.navigateByUrl('/login')
          }
        }
      ]
    })
    alert.present()
  }
    constructor(private userService: UserService,
                private toastController: ToastController,
                private navCtrl: NavController, private router: Router,
                private alertCtrl: AlertController) { }

  }