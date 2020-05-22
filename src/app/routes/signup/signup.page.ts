import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Component, OnInit, ViewChild} from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { AuthenticationCodeService } from 'src/app/services/authentication-code.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  public slideIndex: any = 0;
  private verifyCode: any = {
    verifyCodeTips: '发送验证码',
    code : '',
    confirmCode: '',
    length: 4,
    time: 60,
    disable: false,
    fail: false,
  };
  public user: any = {
    phone: '',
    passport: '',
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
  constructor(public localStorage: LocalStorageService,
              public authenticationCodeService: AuthenticationCodeService) { }
  ngOnInit() {
    this.SignupSlides.lockSwipes(true);
  }

  onNext() {
    this.SignupSlides.lockSwipes(false);
    this.SignupSlides.slideNext();
    this.slideIndex++;
    this.SignupSlides.lockSwipes(true);
  }

  sendVerifyCode() {
    this.verifyCode.code = this.authenticationCodeService.createCode(this.verifyCode.length);
    this.verifyCode.disable = true;
    this.intervalFun = setInterval(() => {
      this.countDown();
    }, 1000);
  }

  resend() {
    this.verifyCode.code = this.authenticationCodeService.createCode(this.verifyCode.length);
    this.verifyCode.disable = true;
    this.intervalFun = setInterval(() => {
      this.countDown();
    }, 1000);
  }

  countDown() {
    if (this.verifyCode.time === 0) {
      this.verifyCode.time = 60;
      this.verifyCode.verifyCodeTips = '重新发送';
      this.verifyCode.disable = false;
      clearInterval(this.intervalFun);
      return;
    } else {
      this.verifyCode.time--;
    }
    this.verifyCode.verifyCodeTips = this.verifyCode.time + 's';
  }

  checkVerifyCode() {
    if (this.verifyCode.confirmCode == this.verifyCode.code) {
      this.onNext();
    }
  }

  checkRole(e) {
    this.user.role = e.detail.value;
  }
  checkSex(e) {
    this.user.sex = e.detail.value;
  }
  saveUser() {
    this.localStorage.set('user', this.user);
  }
}