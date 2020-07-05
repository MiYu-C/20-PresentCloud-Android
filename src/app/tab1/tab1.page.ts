import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from 'src/app/tab1/components/popover/popover.component'
import { LocalStorageService, USER_KEY, GLOBAL_VARIABLE_KEY } from 'src/app/services/local-storage.service';
import { CommonService } from 'src/app/services/common.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  private segment: any = 1;
  popover: any;

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
  slideFlag = false  // false = created, true = joined

  classList = []

  constructor(public popoverController: PopoverController, private router:Router, private localStorageService:LocalStorageService, private httpService:CommonService) { }

  ngOnInit() {
    const userInfo = this.localStorageService.get(USER_KEY, '')
    this.userInfo.phone = userInfo.phone
      let api='/mobileApp/userInfo?phone=' + this.userInfo.phone
      this.httpService.ajaxGet(api).then(async (res:any)=>{
        this.userInfo=res
        if(this.userInfo.status=="教师"){
          this.segment = 1;
          this.initClassList(true)
        }
        else{
          this.segment = 3;
        }
        api='/mobileApp/college'
        this.httpService.ajaxGet(api).then((res:any)=>{
        }).catch((err)=>{
          //console.log(err)
        })
      }).catch((err)=>{
        //console.log(err)
      })

    }
  
  
  async presentPop(e: any) {
    this.popover = await this.popoverController.create({
      component: PopoverComponent,
      event: e,
      translucent: true,
    });
    return await this.popover.present();
  }

  async initClassList(isCreater){
    let api='/mobileApp/course/'
    const id = this.localStorageService.get(USER_KEY, '').id
    if(isCreater){
      api += 'belong'
    }else{
      api += 'join'
    }
    api += '?id=' + id
    this.httpService.ajaxGet(api).then(async (res:any)=>{
      this.classList = res
    })
  }

  async clickcreate(){
    if(this.userInfo.status=="教师"){
      this.segment = 1;
      this.initClassList(true)
    }
    else{
      this.segment = 3;
    }
  }

  async clickjoin(){
    if(this.userInfo.status=="学生"){
      this.segment = 2;
      this.initClassList(false)
    }else{
      this.segment = 4;
    }

  }

  async detailInfo(index){
    this.localStorageService.set(GLOBAL_VARIABLE_KEY,{'courseCode':index})
    this.router.navigateByUrl('/class-tabs/member')
  }
  async detailInfo1(index){
    this.localStorageService.set(GLOBAL_VARIABLE_KEY,{'courseCode':index})
    this.router.navigateByUrl('/class-tabs1/member1')
  }
}