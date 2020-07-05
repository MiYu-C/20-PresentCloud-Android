import { Component, OnInit } from '@angular/core';
import { LocalStorageService, USER_KEY } from 'src/app/services/local-storage.service';
import { CommonService } from 'src/app/services/common.service';
import { AuthenticationCodeService } from 'src/app/services/authentication-code.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { IonSlides, ToastController, AlertController } from '@ionic/angular';
import { PassportService } from 'src/app/services/passport.service';
@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {

  name: ''

  college = ''
  school=''
  number=''
  colleges = []
  schools=[]
  userInfo = {
    'id': '',
    'name': '',
    'phone': '',
    'sex': '',
    'status': '',
    'school': { "id": 8 },
    'college': { "id": 8 },
    'number': ''
  }

  constructor(private httpService:CommonService, private toastCtrl: ToastController, private localStorageService:LocalStorageService) { }

  ngOnInit() {
    const userInfo = this.localStorageService.get(USER_KEY, '')
    this.userInfo.phone = userInfo.phone
    let api='/mobileApp/userInfo?phone=' + this.userInfo.phone
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
        //console.log(err)
      })
    }).catch((err)=>{
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
  async save() {

    this.userInfo['studentNumber'] = this.userInfo.number
    if(this.userInfo.status=="教师"){
      const toast = await this.toastCtrl.create({
        message: '教师请到后台修改信息',
        duration: 3000,
      })
      toast.present()
    }
    else if(this.userInfo.name && this.userInfo.number){
      this.userInfo.college = {id: Number(this.college)}
      const api='/mobileApp/student/update'
      const json = this.userInfo
      this.httpService.ajaxPost(api,json).then((res:any)=>{
          this.localStorageService.set(USER_KEY, this.userInfo)
          window.location.replace('tabs/tab3')
      }).catch((err)=>{
        //console.log(err)
      })
    }
    else {
      const toast = await this.toastCtrl.create({
        message: '请输入完整信息',
        duration: 3000,
      })
      toast.present()
    }
  }
}