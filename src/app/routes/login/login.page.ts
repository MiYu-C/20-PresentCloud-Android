import { LocalStorageService, USER_KEY } from 'src/app/services/local-storage.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationCodeService } from 'src/app/services/authentication-code.service';
import { Router } from '@angular/router';
import { IonSlides, ToastController, AlertController } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';
import { PassportService } from 'src/app/services/passport.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  login = {
    userName: '',
    password: '',
    submited: false
  }

  constructor(private router: Router,private toastCtrl: ToastController,
    private passportService: PassportService,
    private localStorageService: LocalStorageService, 
    private httpService:CommonService) { }

  ngOnInit() {
  }
  async onLogin() {
    // 验证输入是否合法
    if (this.login.userName === '') {
      const toast = await this.toastCtrl.create({
        message: '请输入手机号码',
        duration: 3000
      })
      toast.present()
    } else if (this.login.password === '') {
      const toast = await this.toastCtrl.create({
        message: '请输入密码',
        duration: 3000
      })
      toast.present()
    } else {
      const json = { 'username':this.login.userName, 'password':this.login.password }
      console.log(json)
      this.passportService.login(json).then(async (res:any)=>{
        let userInfo: any = this.localStorageService.get(USER_KEY, {})
        userInfo['phone'] = this.login.userName
        const api='/mobileApp/userInfo?phone=' + this.login.userName
        this.httpService.ajaxGet(api).then((res:any)=>{
          userInfo = res
          userInfo['isLogined'] = true
          this.localStorageService.set(USER_KEY, userInfo)
          window.location.replace('tabs/tab1')
          console.log("登录成功")
        }).catch((err)=>{
          console.log(err)
        })
      }).catch(async (err:any) =>{
        console.log(err)
        if (err.status == 400){
          const toast = await this.toastCtrl.create({
            message: '密码错误',
            duration: 3000,
            buttons: [
              {
                side: 'end',
                text: '找回密码',
                handler: () => {
                  this.router.navigateByUrl('forgot-password')
                }
              }
            ]
          })
          toast.present()
        }else if (err.status == 404){
          const toast = await this.toastCtrl.create({
            message: '该帐号不存在',
            duration: 3000,
            buttons: [
              {
                side: 'end',
                text: '去注册',
                handler: () => {
                  this.router.navigateByUrl('signup')
                }
              }
            ]
          })
          toast.present()
        }
      })
    }
  }

  openForgotPassword() {
    // 进入找回密码页面
    this.router.navigate(['/forgot-password'])
    }
openSignUp(){
    this.router.navigateByUrl('/signup');
  }
openLogin2(){
  this.router.navigateByUrl('/login2');
}
}
