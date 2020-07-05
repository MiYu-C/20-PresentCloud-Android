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
  memberList = []
  classId=''

  historyList=[]

  constructor(private localStorageService:LocalStorageService, private router: Router, private httpService:CommonService, private toastCtrl: ToastController, private alertCtrl: AlertController) { }

  ngOnInit() {
    const userInfo = this.localStorageService.get(USER_KEY,'')
    this.courseCode = this.localStorageService.get(GLOBAL_VARIABLE_KEY,'').courseCode
    let api = '/mobileApp/course/info?'+'courseCode='+this.courseCode
    this.httpService.ajaxGet(api).then(async (res:any) =>{
      for(let item in res){
        this.classInfo[item] = res[item]
      }

    let api = '/mobileApp/course/info?'+'courseCode='+this.courseCode
    this.httpService.ajaxGet(api).then(async (res:any) =>{
      this.classId = res.id
      api = '/mobileApp/sign/history?courseId='+this.classId+'&studentId='+this.localStorageService.get(USER_KEY,{'id':null}).id
      this.httpService.ajaxGet(api).then((res:any)=>{
        this.historyList=res
        this.convert2DateTime()
      })
    })
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


  async memberDetail(number){
    if(this.isTeacher){
      // 成员详情接口
    }
  }

  async gotosign() {
    let api='/mobileApp/sign/check?courseId=' + this.classId
    this.httpService.ajaxGet(api).then(async (res:any)=>{
      this.router.navigateByUrl('/signin');
    }).catch(async (err:any)=>{
      const toast = await this.toastCtrl.create({
        message: '未发起签到',
        duration: 3000
      })
      toast.present()
    })
  }

  async convert2DateTime(){
    for(let index in this.historyList){
      const now = new Date(this.historyList[index].time);
      const year = now.getFullYear();
      const month = this.padding(now.getMonth() + 1);
      const date = this.padding(now.getDate());
      const hour = this.padding(now.getHours());
      const minute = this.padding(now.getMinutes());
      const second = this.padding(now.getSeconds());
      this.historyList[index]['day'] = year + '-' + month + '-' + date
      this.historyList[index]['time'] = hour + ':' + minute + ':' + second
    }
  }
  padding(number:Number){
    return number < 10 ? ('0' + number) : number
  }
  clickedStar() {
    this.router.navigateByUrl('/record2');
  }
}