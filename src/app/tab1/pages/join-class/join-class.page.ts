import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastController, IonSlides, AlertController } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';
import { LocalStorageService, USER_KEY } from 'src/app/services/local-storage.service';
import { Router } from '@angular/router';
import{ BarcodeScanner }from'@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-join-class',
  templateUrl: './join-class.page.html',
  styleUrls: ['./join-class.page.scss'],
})
export class JoinClassPage implements OnInit {

  classNumber = ''

  slideIndex = 1

  classInfo = {
    'name': '',
    'class': '',
    'teacher': '',
    'semester': ''
  }

  constructor(private router: Router, private barcodeScanner: BarcodeScanner, private httpService:CommonService, private toastCtrl: ToastController, private alertCtrl: AlertController, private localStorageService: LocalStorageService) { }

  @ViewChild('joinClassSlides', { static: true }) joinClassSlides: IonSlides
  ngOnInit() {
    this.slideIndex = 1
    this.joinClassSlides.lockSwipeToNext(true)
    this.joinClassSlides.lockSwipeToPrev(true)
  }

  async findClass(){
    if(this.classNumber != ''){
      const api = '/mobileApp/course/info?courseCode=' + this.classNumber
      this.httpService.ajaxGet(api).then(async (res:any)=>{
        this.classInfo.name = res.courseName
        this.classInfo.class = res.className
        this.classInfo.teacher = res.teacherName
        this.classInfo.semester = res.semester

        this.joinClassSlides.lockSwipeToNext(false)
        this.joinClassSlides.slideNext()
        this.slideIndex = 2
        this.joinClassSlides.lockSwipeToNext(true)
      }).catch(async (err)=>{
        console.log(err)
        const toast = await this.toastCtrl.create({
          message: '班课不存在',
          duration: 3000
        })
        toast.present()
      })
    }
    else{
      const toast = await this.toastCtrl.create({
        message: '请输入班课号或扫描二维码',
        duration: 3000
      })
      toast.present()
    }
  }
  
  async join(){
    const api = '/mobileApp/join/course?'+'userId='+this.localStorageService.get(USER_KEY, {"id":null}).id+'&'+'courseCode='+this.classNumber
    this.httpService.ajaxGet(api).then(async (res:any)=>{
      console.log(res)
      window.location.replace('tabs/tab1')
      const toast = await this.toastCtrl.create({
        message: '加入成功',
        duration: 3000
      })
      toast.present()

    }).catch(async (err)=>{
      if(err.status == 409){
        const alert = await this.alertCtrl.create({
          message: '班课加入失败'
        })
        alert.present()
      }else if(err.status == 400){
        const toast = await this.toastCtrl.create({
          message: '你已加入该班课',
          duration: 3000
        })
        toast.present()
      }
    })
  }

  scanQrCode(){
    this.barcodeScanner.scan().then(async (barcodeData:any) => {
      if(!barcodeData.text || barcodeData.text.length != 7){
        const alert = await this.alertCtrl.create({
          message: '无法读取课程二维码'
        })
        alert.present()
      }else{
        this.classNumber = barcodeData.text
        this.findClass()
      }
    }).catch(err => {
      alert(err)
    })
  }
}