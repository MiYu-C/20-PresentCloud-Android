import { LocalStorageService, USER_KEY } from 'src/app/services/local-storage.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationCodeService } from 'src/app/services/authentication-code.service';
import { Router } from '@angular/router';
import { IonSlides, ToastController, AlertController } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';
import { PassportService } from 'src/app/services/passport.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-login2',
  templateUrl: './login2.page.html',
  styleUrls: ['./login2.page.scss'],
})
export class Login2Page implements OnInit {
  login = {
    userName: '',
    password: '',
    code:'',
    submited: false
  }
  public verifyCode = {
    verifyCodeTips: '发送验证码',
    countdown: 60,
    disable: true,
    sended: false,
    submited: false,
    verifyCodeResult: false
  };
  constructor(private router: Router,private toastCtrl: ToastController,
    private passportService: PassportService,
    private localStorageService: LocalStorageService, 
    private httpService:CommonService,
    private authenticationCode: AuthenticationCodeService,
    private alertCtrl: AlertController,) { }

  async ngOnInit() {
    const alert = await this.alertCtrl.create({
      header: '提示',
      message: '开发中',
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
 
}
