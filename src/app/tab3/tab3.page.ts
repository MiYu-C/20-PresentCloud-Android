import { Component, OnInit } from '@angular/core';
import { LocalStorageService, USER_KEY } from 'src/app/services/local-storage.service';
import { CommonService } from 'src/app/services/common.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {


  name: ''

  college = ''
  colleges = []

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

  constructor(private httpService:CommonService, private toastCtrl: ToastController, private localStorageService:LocalStorageService) { }

  ngOnInit() {
  //   const userInfo = this.localStorageService.get(USER_KEY, '')
  //   this.userInfo.phone = userInfo.phone
  //   let api='/mobile/userInfo?phone=' + this.userInfo.phone
  //   this.httpService.ajaxGet(api).then(async (res:any)=>{
  //     this.userInfo=res
  //     api='/mobile/college'
  //     this.httpService.ajaxGet(api).then((res:any)=>{
  //       for(let i in res[0].children){
  //         if(res[0].children[i].label === this.userInfo.college){
  //           this.college = res[0].children[i].id.toString()
  //         }
  //         const item = {
  //           'id': res[0].children[i].id,
  //           'label': res[0].children[i].label
  //         }
  //         this.colleges.push(item)
  //       }
  //     }).catch((err)=>{
  //       console.log(err)
  //     })
  //   }).catch((err)=>{
  //     console.log(err)
  //   })
   }
}