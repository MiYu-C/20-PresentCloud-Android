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
 
  async onLogin(form: NgForm) {
    // 验证输入是否合法
    
    if (this.login.userName === '') {
      const toast = await this.toastCtrl.create({
        message: '请输入您的手机号码',
        duration: 3000
      })
      toast.present()
    } else if (this.login.code === '') {
      const toast = await this.toastCtrl.create({
        message: '请输入验证码',
        duration: 3000
      })
      toast.present()
    } else if(form.valid){
      this.verifyCode.submited = true
      // 验证code是否一致
      if (this.authenticationCode.validate(this.login.code)) {
        this.verifyCode.verifyCodeResult = true
        const json = { 'username':this.login.userName, 'code':this.login.code }
        this.passportService.login(json).then(async (res:any)=>{
          let userInfo: any = this.localStorageService.get(USER_KEY, {})
          userInfo['phone'] = this.login.userName
          const api='/mobileApp/userInfo?phone=' + this.login.userName
          this.httpService.ajaxGet(api).then((res:any)=>{
            userInfo = res
            userInfo['isLogined'] = true
            this.localStorageService.set(USER_KEY, userInfo)
            window.location.replace('tabs')
            console.log("登录成功")
          }).catch((err)=>{
            console.log(err)
          })
        }).catch(async (err:any) =>{
          console.log(err)
         if (err.status == 404){
            const toast = await this.toastCtrl.create({
              message: '帐号不存在',
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
      else {
        this.verifyCode.verifyCodeResult = false
        const toast = await this.toastCtrl.create({
          message: '验证码错误或已失效',
          duration: 3000
        })
        toast.present()
      }
     } 
  }

  async getCode() {
    let newcode = this.authenticationCode.createCode(4)
    console.log(newcode)
    const alert = await this.alertCtrl.create({
      header: '验证码',
      message: newcode,
      buttons: ['确定']
    })
    alert.present()
    //发送验证码成功后开始倒计时
    this.verifyCode.disable = false
    this.verifyCode.sended = true
    this.settime()
  }
  settime() {
    if (this.verifyCode.countdown == 1) {
      this.verifyCode.countdown = 60
      this.verifyCode.verifyCodeTips = '重新发送'
      this.verifyCode.disable = true
      return
    } else {
      this.verifyCode.countdown--
    }

    this.verifyCode.verifyCodeTips =
      '重新发送(' + this.verifyCode.countdown + ')'
    setTimeout(() => {
      this.verifyCode.verifyCodeTips =
        '重新发送(' + this.verifyCode.countdown + ')'
      this.settime()
    }, 1000)
  }
openSignUp(){
    this.router.navigateByUrl('/signup');
  }
openLogin(){
  this.router.navigateByUrl('/login');
}
}
