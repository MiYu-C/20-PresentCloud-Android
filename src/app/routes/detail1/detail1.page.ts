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

  courseCode = ''

  isTeacher = true

  classInfo = {
    'id': '',
    'courseCode': '',
    'courseName': '',
    'className': '',
    'teacherName': '',
    'semester': '',
    'school': '福州大学',
    'college': {},
    'joinPermission': null,
    'enabled': null,
  }

  constructor(private localStorageService:LocalStorageService, private router: Router, private httpService:CommonService, private alertCtrl: AlertController) { }

  ngOnInit() {
    const userInfo = this.localStorageService.get(USER_KEY,'')
    this.courseCode = this.localStorageService.get(GLOBAL_VARIABLE_KEY,'').courseCode
    let api = '/mobile/course/check?'+'courseCode='+this.courseCode+'&'+'phone='+userInfo.phone
    this.httpService.ajaxGet(api).then(res =>{
      this.isTeacher = true
    }).catch(err =>{
      this.isTeacher = false
    })
    api = '/mobile/course/info?'+'courseCode='+this.courseCode
    this.httpService.ajaxGet(api).then(async (res:any) =>{
      for(let item in res){
        this.classInfo[item] = res[item]
      }
    })
  }

  async checkboxChange(){
    let api = '/mobile/course/update'
    const json = {
      'id': this.classInfo.id,
      'joinPermission': this.classInfo.joinPermission
    }
    this.httpService.ajaxPut(api, json).then(async (res:any) =>{
      console.log('change to ' + json.joinPermission + ' success')
    })
  }

  async doChange(){
    this.router.navigateByUrl('/home/class/detail/details/info')
  }



  async exitClass(){
    // const alert = await this.alertCtrl.create({
    //   header: '警告',
    //   message: '是否退出当前班课',
    //   buttons: [
    //     {
    //       text: '取消',
    //       role: 'cancel'
    //     },
    //     {
    //       text: '确定',
    //       handler: () => {
    //         const api = '/class/change/exit'
    //         const json = {
    //           'number': this.classId,
    //           'phone': this.localStorageService.get(GLOBAL_VARIABLE_KEY,'').phone
    //         }
    //         this.httpService.ajaxPost(api,json).then(async (res:any)=>{
    //           window.location.replace('/home/class')
    //         })
    //       }
    //     }
    //   ]
    // })
    // alert.present()
  }
}