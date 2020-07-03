import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController, AlertController, IonSlides } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';
import { LocalStorageService, GLOBAL_VARIABLE_KEY } from 'src/app/services/local-storage.service';

declare var BMap;
@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {

  password = ''

  type = ''
  title = ''
  classId = ''
  courseCode = ''
  attendances = []
  absences = []

  isStart = false

  constructor(private localStorageService:LocalStorageService,public activatedRoute: ActivatedRoute, private toastCtrl: ToastController, private httpService:CommonService, private router: Router, private alertCtrl: AlertController) { }
  
  ngOnInit() {

    this.courseCode = this.localStorageService.get(GLOBAL_VARIABLE_KEY, '').courseCode
    const api = '/mobileApp/course/info?'+'courseCode='+this.courseCode
    this.httpService.ajaxGet(api).then(async (res:any) =>{
      this.classId = res.id
    })

  }

  async start(){
    let longitude: any ;
    let latitude: any;
    const geolocation = new BMap.Geolocation();
    await geolocation.getCurrentPosition(function(resp) {
      const mk = new BMap.Marker(resp.point);
      alert('您的位置：' + resp.point.lng + ',' + resp.point.lat);
      longitude = resp.point.lng;
      latitude = resp.point.lat;
      console.log(longitude);
      // this.LocalStorageService.set('longitude', resp.point.lng);
      // this.LocalStorageService.set('latitude', resp.point.lat);
      // this.NavController.navigateForward('\start');
      return longitude;
    }, { enableHighAccuracy: true });
    console.log(longitude);
    this.localStorageService.set('longitude', longitude);
    this.localStorageService.set('latitude', latitude);
    console.log(latitude);

    this.isStart = true
    const api='/mobileApp/release/sign'
    const json = {
      'course':{'id':this.classId},
      'code':'123456'
    }
    this.httpService.ajaxPost(api,json).then(async (res:any)=>{
      console.log('开始签到')
    }).catch(err=>{
      console.log(err)
      return
    })
    const toast = await this.toastCtrl.create({
      message: '签到已开始，请通知学生进行签到',
      duration: 3000
    })
    toast.present()
  }

  async finish(){
    const alert = await this.alertCtrl.create({
      header: '警告',
      message: '是否结束签到',
      buttons: [
        {
          text: '取消',
          role: 'cancel'
        },
        {
          text: '确定',
          handler: () => {
            const api = '/mobileApp/sign/close?courseId='+this.classId
            this.httpService.ajaxGet(api).then(async (res:any)=>{
              this.attendances = res.attendances
              this.absences = res.absences
              this.convert2DateTime()
              // 结束签到
              this.isStart = false
              const toast = await this.toastCtrl.create({
                message: '签到已结束',
                duration: 3000
              })
              toast.present()

            }).catch(async (err:any)=>{
              const toast = await this.toastCtrl.create({
                message: '结束签到失败，请重试',
                duration: 3000
              })
              toast.present()
            })
          }
        }
      ]
    })
    alert.present()
  }

  async convert2DateTime(){
    for(let index in this.attendances){
      const now = new Date(this.attendances[index].signTime);

      const hour = now.getHours();
      let h = this.padding(hour)
      const minute = now.getMinutes();
      let m = this.padding(minute)
      const second = now.getSeconds();
      let s = this.padding(second)
      this.attendances[index]['time'] = h + ':' + m + ':' + s
    }
  }
  padding(number:Number){
    return number < 10 ? ('0' + number) : number
  }
}