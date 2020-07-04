
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { ToastController } from '@ionic/angular';
import { LocalStorageService, GLOBAL_VARIABLE_KEY, USER_KEY} from 'src/app/services/local-storage.service';
import { AlertController } from '@ionic/angular';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import QRious from 'QRious';
@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.page.html',
  styleUrls: ['./qrcode.page.scss'],
})
export class QrcodePage implements OnInit {
  college = ''
  school=''
  number=''
  colleges = []
  schools=[]

  semesters = []

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
  
  @ViewChild('qr', {static: true}) qr: ElementRef;
  constructor(private alertCtrl: AlertController, private router: Router, private httpService:CommonService, private toastCtrl: ToastController, private localStorageService: LocalStorageService) { }

  ngOnInit() {

    this.courseCode = this.localStorageService.get(GLOBAL_VARIABLE_KEY,'').courseCode
    let api = '/mobileApp/course/info?'+'courseCode='+this.courseCode
    this.httpService.ajaxGet(api).then(async (res:any) =>{
      for(let item in res){
        this.classInfo[item] = res[item]
      }
    })

    this.courseCode = this.localStorageService.get(GLOBAL_VARIABLE_KEY,'').courseCode
    api = '/mobileApp/course/info?'+'courseCode='+this.courseCode
    this.httpService.ajaxGet(api).then(async (res:any) =>{
      for(let item in res){
        this.classInfo[item] = res[item]
      }
      this.college = res['college'].id.toString()
      
    })
    this.semesters = this.createSemesters()

    const userInfo = this.localStorageService.get(USER_KEY, '')
    this.userInfo.phone = userInfo.phone
    api='/mobileApp/userInfo?phone=' + this.userInfo.phone
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
        console.log(err)
      })
    }).catch((err)=>{
      console.log(err)
    })

    var qr = new QRious({
      element: this.qr.nativeElement,
      size: 180,
      value: this.courseCode
    })
  }

  async change(){
    const api = '/mobileApp/course/update'
    let json = this.classInfo
    json['college'] = {id: this.college}
    console.log(json)
    const toast = await this.toastCtrl.create({
      message: '信息修改成功',
      duration: 3000,
    })
    toast.present()
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
            const api = '/mobileApp/course/update'
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
      console.log(err)
    })
  }
}