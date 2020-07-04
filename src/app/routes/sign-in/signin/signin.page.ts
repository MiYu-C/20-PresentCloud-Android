    
import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { LocalStorageService, GLOBAL_VARIABLE_KEY, USER_KEY } from 'src/app/services/local-storage.service';
import { CommonService } from 'src/app/services/common.service';
import { async } from '@angular/core/testing';
import { Router } from '@angular/router';
declare var BMap;
@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  classId=''
  courseCode=''

  historyList=[]
  password='123456'
  constructor(private localStorageService:LocalStorageService, private toastCtrl: ToastController, private httpService:CommonService, private alertCtrl: AlertController, private router: Router) { }

  ngOnInit() {
    this.courseCode = this.localStorageService.get(GLOBAL_VARIABLE_KEY, '').courseCode
    let api = '/mobileApp/course/info?'+'courseCode='+this.courseCode
    this.httpService.ajaxGet(api).then(async (res:any) =>{
      this.classId = res.id
    api = '/mobileApp/sign/history?courseId='+this.classId+'&studentId='+this.localStorageService.get(USER_KEY,{'id':null}).id
      this.httpService.ajaxGet(api).then((res:any)=>{
        this.historyList=res
        this.convert2DateTime()
      })
    })
  }

  async signin(){
    let longitude: any ;
    let latitude: any;
    const geolocation = new BMap.Geolocation();
    await geolocation.getCurrentPosition(function(resp) {
      const mk = new BMap.Marker(resp.point);
      alert('你的位置：' + resp.point.lng + ',' + resp.point.lat);
      longitude = resp.point.lng;
      latitude = resp.point.lat;
      console.log(longitude);
      return longitude;
    }, { enableHighAccuracy: true });
    console.log(longitude);
    this.localStorageService.set('longitude', longitude);
    this.localStorageService.set('latitude', latitude);
    console.log(latitude);

    let api='/mobileApp/sign/student?courseId=' + this.classId + '&code=' + this.password + '&studentId=' + this.localStorageService.get(USER_KEY, {'id': null}).id
    this.httpService.ajaxGet(api).then(async (res:any)=>{
      const alert = await this.alertCtrl.create({
        header: '提示',
        message: '签到成功',
        buttons: [
          {
            text: '确定',
          }
        ]
      })
      alert.present()
    }).catch(async (err:any)=>{
      console.log(err)
      const toast = await this.toastCtrl.create({
        message: err.msg,
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
}