import { Component, OnInit } from '@angular/core';
import { LocalStorageService, GLOBAL_VARIABLE_KEY, USER_KEY } from 'src/app/services/local-storage.service';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { AlertController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-member1',
  templateUrl: './member1.page.html',
  styleUrls: ['./member1.page.scss'],
})
export class Member1Page implements OnInit{
  public role: any;
  public text: any;

  courseCode = ''

  num = 50

  signIn_text = '发起签到'

  isTeacher = false

  classInfo = {
    'id': '',
    'number': '',
    'name': '',
    'class': '',
    'teacher': '',
    'semester': '',
    'school': '',
    'college': '',
    'studentCount': 0,
    'isJoinable': true,
    'isClosed': false,
    'isDeleted': false
  }

  memberList = [
    {
      'id': '1',
      'name': '张三',
      'exp': '50',
      'number': '190327071'
    },
    {
      'id': '2',
      'name': '李四',
      'exp': '44',
      'number': '190327088'
    }
  ]

  constructor(private localStorageService:LocalStorageService, private router: Router, private httpService:CommonService, private toastCtrl: ToastController, private alertCtrl: AlertController) { }

  ngOnInit() {
    const userInfo = this.localStorageService.get(USER_KEY,'')
    this.courseCode = this.localStorageService.get(GLOBAL_VARIABLE_KEY,'').courseCode
    let api = '/mobile/course/check?'+'courseCode='+this.courseCode+'&'+'phone='+userInfo.phone
    this.httpService.ajaxGet(api).then(res =>{
      this.isTeacher = true
      this.signIn_text='发起签到'
    }).catch(err =>{
      this.isTeacher = false
      this.signIn_text='参与签到'
    })

    // 获取班课信息
    api = '/mobile/course/info?'+'courseCode='+this.courseCode
    this.httpService.ajaxGet(api).then(async (res:any) =>{
      for(let item in res){
        this.classInfo[item] = res[item]
      }
      // 获取班课成员的接口
      api = '/mobile/course/student?'+'id='+this.classInfo.id
      this.httpService.ajaxGet(api).then(async (res:any) =>{
        this.memberList = res
      })
    })
  }


  async memberDetail(number){
    if(this.isTeacher){
      // 成员详情接口
    }
  }

  gotosign() {
    this.router.navigateByUrl('/signin');
  }

}