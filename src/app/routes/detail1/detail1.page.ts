import { Component, OnInit } from '@angular/core';
import { LocalStorageService, GLOBAL_VARIABLE_KEY, USER_KEY } from 'src/app/services/local-storage.service';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-detail1',
  templateUrl: './detail1.page.html',
  styleUrls: ['./detail1.page.scss'],
})
export class Detail1Page implements OnInit {

  college = ''
  school=''
  number=''
  colleges = []
  schools=[]

  courseCode = ''

  isTeacher = true

  classInfo = {
    'id': '',
    'courseCode': '',
    'courseName': '',
    'className': '',
    'teacherName': '',
    'semester': '',
    'school': '',
    'college': {},
    'joinPermission': null,
    'enabled': null,
  }
  userInfo = {
    'id': '',
    'name': '',
    'phone': '',
    'sex': '',
    'status': '',
    'school': '',
    'college': { "id": 8 },
    'number': ''
  }
  constructor(private localStorageService:LocalStorageService, private router: Router, private httpService:CommonService, private alertCtrl: AlertController) { }

  ngOnInit() {
   
    this.courseCode = this.localStorageService.get(GLOBAL_VARIABLE_KEY,'').courseCode
    let api = '/mobileApp/course/info?'+'courseCode='+this.courseCode
    this.httpService.ajaxGet(api).then(async (res:any) =>{
      for(let item in res){
        this.classInfo[item] = res[item]
      }
    })

    this.courseCode = this.localStorageService.get(GLOBAL_VARIABLE_KEY,'').courseCode
    api = '/mobileApp/course/info?'+'courseCode='+this.courseCode
    this.httpService.ajaxGet(api).then(async (res:any) =>{
      for(let item in res){
        this.classInfo[item] = res[item]
      }
      this.college = res['college'].id.toString()
    })

    const userInfo = this.localStorageService.get(USER_KEY, '')
    this.userInfo.phone = userInfo.phone
    api='/mobileApp/userInfo?phone=' + this.userInfo.phone
    this.httpService.ajaxGet(api).then(async (res:any)=>{
      this.userInfo=res
      api='/mobileApp/college'
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
    }).catch((err)=>{
      console.log(err)
    })
  }


  async exitClass(){
    const alert = await this.alertCtrl.create({
      header: '警告',
      message: '是否退出当前班课',
      buttons: [
        {
          text: '取消',
          role: 'cancel'
        },
        {
          text: '确定',
          handler: () => {
            const api = '/mobileApp/quit/course?'+'userId='+this.localStorageService.get(USER_KEY, {"id":null}).id+'&'+'courseCode='+this.courseCode
            this.httpService.ajaxGet(api).then(async (res:any)=>{
              window.location.replace('tabs/tab1')
            })
          }
        }
      ]
    })
    alert.present()
  }
}