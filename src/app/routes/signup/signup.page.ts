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
  college = ''
  school=''
  number=''
  colleges = []
  schools=[]
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
  public user = {
    phone: '',//phone  phone
    code:'',//
    password: '',//password password
    confirmPassword: '',
    name: '',//name nick_name
    nickname:'',//name username
    sex: '',//sex gender
    number: '',//student_number 
    school: { "id": 8 },
    status:'',//student teacher
    college: { "id": 8 },
    dept: { "id": 8 },
    email:''
  };
  public studentForm={
    phone:'',
    password:'',
    name:'',
    sex:'',
    studentNumber :'',
    status:'',
    email:'',
    school:{ "id": 8 },
    college: { "id": 8 },
    dept: { "id": 8 },
    type:3
  }
  public teacherForm={
    phone:'',
    password:'',
    nickName:'',
    username:'',
    gender:'',
    status:'',
    school:{ "id": 8 },
    college: { "id": 8 },
    dept: { "id": 8 },
    email:'',
    enabled:true,
    type:2
  }
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
    const api='/mobileApp/college'
    this.httpService.ajaxGet(api).then((res:any)=>{

      for(let i in res){
        const item = {
          'id': res[i].id,
          'name': res[i].name }
        this.schools.push(item)
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
    this.user.status = e.detail.value;
    if(this.user.status=='student'){
      this.isStudent=true
      this.studentForm={
        phone: this.user.phone,
        password: this.user.password,
        name: this.user.name,
        sex: this.user.sex,
        studentNumber: this.user.number,
        status: this.user.status,
        email:this.user.email,
        school:this.user.school,
        college:this.user.college,
        dept:this.user.dept,
        type:3
      }
    }else if(this.user.status=='teacher'){
      this.isStudent=false
      this.teacherForm={
        phone: this.user.phone,
        password: this.user.password,
        nickName: this.user.name,
        username:this.user.nickname,
        gender: this.user.sex,
        status: this.user.status,
        school:this.user.school,
        college:this.user.college,
        dept:this.user.dept,
        email:this.user.email,
        enabled:true,
        type:2
      }
    }
  }
  checkSex(e) {
    this.user.sex = e.detail.value;
  }
  checkSchool(){
    this.colleges=[]
    const api='/mobileApp/college'
    this.httpService.ajaxGet(api).then((res:any)=>{
      for(let i in res){
        if(this.school==res[i].id){
          this.number=i
        }
      }
      for(let i in res[this.number].children){      
        const item = {
          'id': res[this.number].children[i].id,
          'label': res[this.number].children[i].label
        }
        this.colleges.push(item)
      }
    }).catch((err)=>{
      console.log(err)
    })
  }
  async onRegisterInfo(form: NgForm){
    if(form.valid&&this.isStudent==true){
      this.user.college.id = Number(this.college)
      this.user.school.id = Number(this.school)
      this.user.dept.id = Number(this.college)
      console.log(this.user)
      this.passportService.register(this.isStudent, this.studentForm).then(async (res:any)=>{
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
    }else if(form.valid&&this.isStudent==false){
      this.user.college.id = Number(this.college)
      this.user.school.id = Number(this.school)
      this.user.dept.id = Number(this.college)
      this.passportService.register(this.isStudent, this.teacherForm).then(async (res:any)=>{
        const alert = await this.alertCtrl.create({
          message: '注册成功',
          buttons: ['确定']
        })
        alert.present()
        window.location.replace('login')
        // this.router.navigateByUrl('passport/login')
      }).catch(err =>{
        console.log(err)
      })
    }
    else{
      const toast = await this.toastCtrl.create({
        message: '请输入完整信息',
        duration: 3000
      })
      toast.present()
    }
  }

}