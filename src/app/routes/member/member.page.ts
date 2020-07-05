import { Component, OnInit } from '@angular/core';
import { LocalStorageService, GLOBAL_VARIABLE_KEY, USER_KEY } from 'src/app/services/local-storage.service';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-member',
  templateUrl: './member.page.html',
  styleUrls: ['./member.page.scss'],
})
export class MemberPage implements OnInit{

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
    'studentCount': '',
    'isJoinable': true,
    'isClosed': false,
    'isDeleted': false
  }
  memberList = []

  constructor(private localStorageService:LocalStorageService, private router: Router, private httpService:CommonService, private toastCtrl: ToastController, private alertCtrl: AlertController) { }

  ngOnInit() {
    const userInfo = this.localStorageService.get(USER_KEY,'')
    this.courseCode = this.localStorageService.get(GLOBAL_VARIABLE_KEY,'').courseCode
    // 获取班课信息
    let api = '/mobileApp/course/info?'+'courseCode='+this.courseCode
    this.httpService.ajaxGet(api).then(async (res:any) =>{
      for(let item in res){
        this.classInfo[item] = res[item]
      }
      // 获取班课成员的接口
      api = '/mobileApp/course/student?'+'id='+this.classInfo.id
      this.httpService.ajaxGet(api).then(async (res:any) =>{
        this.classInfo['studentCount'] = res.length
        this.memberList = res
        this.memberList.sort(function(a:any, b:any){
          return b.exp - a.exp
        })
      })
    })
  }

  async signIn(){
    if(this.classInfo.isClosed){
      const toast = await this.toastCtrl.create({
        message: '课程已结束',
        duration: 3000
      })
      toast.present()
    }else {
      if(this.isTeacher){
        // 发起签到
        this.router.navigateByUrl('/home/class/detail/members/create-signin')
      }else{
        // 参与签到
        this.router.navigateByUrl('/home/class/detail/members/join-signin')
      }
    }
  }

  async memberDetail(number){
    if(this.isTeacher){
      // 成员详情接口
    }
  }
  gotosign() {
    this.router.navigateByUrl('/initiate');
  }
  
  clickedStar() {
    this.router.navigateByUrl('/record');
  }
}