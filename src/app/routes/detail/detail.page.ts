
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { ToastController } from '@ionic/angular';
import { LocalStorageService, GLOBAL_VARIABLE_KEY } from 'src/app/services/local-storage.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  college = ''
  colleges = []

  courseCode = ''

  classInfo = {
    'id': '',
    'courseCode': '',
    'courseName': '',
    'className': '',
    'teacherName': '',
    'semester': '',
    'school': '',
    'college': {},
    'joinPermission': true,
    'enabled': false,
  }

  constructor(private alertCtrl: AlertController, private router: Router, private httpService:CommonService, private toastCtrl: ToastController, private localStorageService: LocalStorageService) { }

  ngOnInit() {
    let api='/mobile/college'
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
    this.courseCode = this.localStorageService.get(GLOBAL_VARIABLE_KEY,'').courseCode
    api = '/mobile/course/info?'+'courseCode='+this.courseCode
    this.httpService.ajaxGet(api).then(async (res:any) =>{
      for(let item in res){
        this.classInfo[item] = res[item]
      }
      this.college = res['college'].id.toString()
    })

  }

  async change(){
    let info = ''
    for(let item in this.classInfo){
      if(this.classInfo[item] === '') {
        switch(item){
          case 'courseName':
            info = '课程'
            break
          case 'className':
            info = '班级'
            break
          case 'semester':
            info = '学期'
            break
          case 'school':
            info = '学校'
            break
        }
        const toast = await this.toastCtrl.create({
          message: info + ' 不能为空',
          duration: 3000
        })
        toast.present()
        return
      }
    }
    if(JSON.stringify(this.classInfo['college']) == '{}' && !this.college){
      const toast = await this.toastCtrl.create({
        message: '院系 不能为空',
        duration: 3000
      })
      toast.present()
      return
    }
    const api = '/mobile/course/update'
    let json = this.classInfo
    json['college'] = {id: this.college}
    console.log(json)
    this.httpService.ajaxPut(api, json).then(async (res:any) =>{
      window.location.replace('home/class/detail/details')
    })
  }
  async closeClass(){
    const alert = await this.alertCtrl.create({
      message: '是否结束当前班课',
      buttons: [
        {
          text: '取消',
          role: 'cancel'
        },
        {
          text: '确定',
          handler: () => {
            const api = '/mobile/course/update'
            const json = {
              'id': this.classInfo.id,
              'enabled': false
            }
            this.httpService.ajaxPut(api,json).then(async (res:any)=>{
              this.classInfo.enabled = false
            })
          }
        }
      ]
    })
    alert.present()
  }


}