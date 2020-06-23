import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Component, OnInit, ViewChild} from '@angular/core';
import { AuthenticationCodeService } from 'src/app/services/authentication-code.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { IonSlides, ToastController, AlertController } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';
import { PassportService } from 'src/app/services/passport.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  colleges = []
  isStudent = true
  public slideIndex: any = 0;
  public verifyCode = {
    verifyCodeTips: '发送验证码',
    countdown: 60,
    disable: true,
    sended: false,
    submited: false,
    verifyCodeResult: false
  };
  public user: any = {
    phone: '',
    code:'',
    password: '',
    confirmPassword: '',
    role: '',
    name: '',
    nickname: '',
    sex: '',
    id: '',
    school: '',
    department: ''
  };
  
  @ViewChild('SignupSlides', {static: true}) SignupSlides: IonSlides;
  intervalFun: any;
  constructor(private alertController: AlertController,
              public localStorage: LocalStorageService,
              public authenticationCodeService: AuthenticationCodeService,
              private router: Router,
              private authenticationCode: AuthenticationCodeService,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private httpService:CommonService,
              private passportService: PassportService, ) { }
  ngOnInit() {
    this.SignupSlides.lockSwipeToNext(true)
    this.SignupSlides.lockSwipeToPrev(true)
    const api='/mobile/college'
    this.httpService.ajaxGet(api).then((res:any)=>{
      for(let i in res[0].children){
        const item = {
          'id': res[0].children[i].id,
          'label': res[0].children[i].label
        }
        this.colleges.push(item)
      }
    }).catch((err)=>{
      console.log(err)
    })
  }
  onNext() {
    this.SignupSlides.lockSwipeToNext(false)
    this.slideIndex = (this.slideIndex + 1) % 6
    this.SignupSlides.slideNext()
    this.SignupSlides.lockSwipeToNext(true)
  }
  onPrevious() {
    this.SignupSlides.lockSwipeToPrev(false)
    this.slideIndex = (this.slideIndex - 1) % 6
    this.SignupSlides.slidePrev()
    this.SignupSlides.lockSwipeToPrev(true)
  }
  async onregisterPhone(form: NgForm) {
    if (form.valid) {
      this.passportService.checkIsRegisted(this.user.phone).then(async (res:any) =>{
        this.onNext()
      }).catch(async (err:any) =>{
        console.log(err)
        const toast = await this.toastCtrl.create({
          message: '该手机号码已注册',
          duration: 3000,
          buttons: [
            {
              side: 'end',
              text: '去登陆',
              handler: () => {
                this.router.navigateByUrl('/login')
              }
            }
          ]
        })
        toast.present()
      })
    } else {
      const toast = await this.toastCtrl.create({
        message: '请输入正确的手机号码',
        duration: 3000
      })
      toast.present()
    }
  }
  async onRegisterCode(form: NgForm) {
    if(form.valid){
      this.verifyCode.submited = true
      // 验证code是否一致
      if (this.authenticationCode.validate(this.user.code)) {
        this.verifyCode.verifyCodeResult = true
        this.onNext()
      } else {
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
  async onRegisterPassword(form: NgForm){
  if(this.user.password!=this.user.confirmPassword){
      const toast = await this.toastCtrl.create({
        message: '两次密码不相同',
        duration: 3000
      })
      toast.present()
    } else if(form.valid){
      this.onNext()
    }
    else {
      const toast = await this.toastCtrl.create({
        message: '密码格式不正确，请重新输入',
        duration: 3000
      })
      toast.present()
    }
  }
  checkRole(e) {
    this.user.role = e.detail.value;
    if(this.user.role=='student'){
      this.isStudent=true
    }else{
      this.isStudent=false
    }
  }
  
  checkSex(e) {
    this.user.sex = e.detail.value;
  }
  async onRegisterInfo(form: NgForm){
    if(form.valid){
      this.passportService.register(this.isStudent, this.user).then(async (res:any)=>{
        const alert = await this.alertCtrl.create({
          header: '提示',
          message: '注册成功',
          buttons: ['确定']
        })
        alert.present()
        window.location.replace('login')
        // this.router.navigateByUrl('passport/login')
      }).catch(err =>{
        console.log(err)
      })
    }else{
      const toast = await this.toastCtrl.create({
        message: '请输入完整信息',
        duration: 3000
      })
      toast.present()
    }
  }

}