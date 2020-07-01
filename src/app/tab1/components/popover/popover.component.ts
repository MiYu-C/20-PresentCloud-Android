
import { Router} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { LocalStorageService, USER_KEY, GLOBAL_VARIABLE_KEY } from 'src/app/services/local-storage.service';
import { CommonService } from 'src/app/services/common.service';
import { threadId } from 'worker_threads';
import { IonSlides, ToastController, AlertController } from '@ionic/angular';
@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})

export class PopoverComponent implements OnInit {
  // public state: any = 1;
  constructor(
    public popoverController: PopoverController,
    public localStorage: LocalStorageService,
    private router: Router,
   private localStorageService:LocalStorageService, 
   private httpService:CommonService,
   private toastCtrl: ToastController,) { }
    
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
  ngOnInit() {
    const userInfo = this.localStorageService.get(USER_KEY, '')
    this.userInfo.phone = userInfo.phone
      let api='/mobileApp/userInfo?phone=' + this.userInfo.phone
      this.httpService.ajaxGet(api).then(async (res:any)=>{
        this.userInfo=res
        api='/mobileApp/college'
        this.httpService.ajaxGet(api).then((res:any)=>{
        }).catch((err)=>{
          console.log(err)
        })
      }).catch((err)=>{
        console.log(err)
      })

  }

  async onCreateclass(){
    if(this.userInfo.status=="教师"){
      this.router.navigateByUrl('tabs/tab1/create-class')
    }
    else{
      const toast = await this.toastCtrl.create({
        message: '您没有此权限！',
        duration: 1500
      })
      toast.present()
    }
  }
  async  onJoinclass(){
    if(this.userInfo.status=="学生"){
      this.router.navigateByUrl('tabs/tab1/join-class')
    }
    else{
      const toast = await this.toastCtrl.create({
        message: '您没有此权限！',
        duration: 1500
      })
      toast.present()
    }

  }
  async dismissPop(e: any) {
    this.popoverController.dismiss();
  }
}