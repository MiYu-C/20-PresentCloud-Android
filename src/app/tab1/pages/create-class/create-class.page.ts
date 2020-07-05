    
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { ToastController, AlertController } from '@ionic/angular';
import { LocalStorageService, USER_KEY } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-create-class',
  templateUrl: './create-class.page.html',
  styleUrls: ['./create-class.page.scss'],
})
export class CreateClassPage implements OnInit {
  college = ''
  school=''
  number=''
  colleges = []
  schools=[]
  semesters = []

  classInfo = {
    'courseName': '',
    'className': '',
    'semester': '',
    'school': {},
    'college': {}
  }

  constructor(private router: Router, private httpService:CommonService, private toastCtrl: ToastController, private alertCtrl: AlertController, private localStorageService: LocalStorageService) { }

  ngOnInit() {
    const api='/mobileApp/college'
    this.httpService.ajaxGet(api).then((res:any)=>{
      for(let i in res){
        const item = {
          'id': res[i].id,
          'name': res[i].name }
        this.schools.push(item)
      }
    }).catch((err)=>{
      //console.log(err)
    })
  }

  async create() {
    let info = ''
    for(let item in this.classInfo){
      if(!this.classInfo[item]) {
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
        }
        const toast = await this.toastCtrl.create({
          message: info + ' 不能为空',
          duration: 3000
        })
        toast.present()
        return
      }
    }
    if(JSON.stringify(this.classInfo['school']) == '{}' && !this.school){
      const toast = await this.toastCtrl.create({
        message: '学校 不能为空',
        duration: 3000
      })
      toast.present()
      return
    }
    if(JSON.stringify(this.classInfo['college']) == '{}' && !this.college){
      const toast = await this.toastCtrl.create({
        message: '院系 不能为空',
        duration: 3000
      })
      toast.present()
      return
    }
    const api = '/mobileApp/course'
    const userInfo = this.localStorageService.get(USER_KEY,'')
    this.classInfo['teacherName'] = userInfo.name
    this.classInfo['createUser'] = { id : userInfo.id }
    this.classInfo.college = { id : Number(this.college) }
    this.classInfo.school = { id : Number(this.school) }
    this.httpService.ajaxPost(api, this.classInfo).then(async (res:any)=>{
      const alert = await this.alertCtrl.create({
        backdropDismiss: false,
        message: '课程已创建',
        buttons: [{
          text: '确定',
          handler: () => {
            window.location.replace('tabs/tab1')
          }
        }]
      })
      alert.present()
    }).catch(err=>{
      //console.log(err)
    })
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
      //console.log(err)
    })
  }
  createSemesters(){
    var semesters = []
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 1
    for(let index=year+1; index>2010; index--){
      semesters.push((index-1)+'-'+index+'-'+'2')
      semesters.push((index-1)+'-'+index+'-'+'1')
    }
    return semesters
  }
}