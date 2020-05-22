import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationCodeService } from 'src/app/services/authentication-code.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public segment = 1;
  public slideIndex: any = 0;
  private phone = '';
  private password = '';
  private verifyCode: any = {
    verifyCodeTips: '发送验证码',
    code : '',
    confirmCode: '',
    length: 4,
    time: 60,
    disable: false,
    fail: false,
  };
  intervalFun: any;

  constructor(public authenticationCodeService: AuthenticationCodeService,
              private router: Router,
              public localService: LocalStorageService) { }

  ngOnInit() {
  }
 
  check() {
    if (this.phone == this.localService.getItem('user').phone && this.password == this.localService.getItem('user').passport) {
      this.router.navigateByUrl('/home');
    }
  }
}