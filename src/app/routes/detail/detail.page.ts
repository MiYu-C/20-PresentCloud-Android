
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { ToastController } from '@ionic/angular';
import { LocalStorageService, GLOBAL_VARIABLE_KEY, USER_KEY} from 'src/app/services/local-storage.service';
import { AlertController } from '@ionic/angular';
import { Component, OnInit} from '@angular/core';
declare const QRious: any;
@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  
  college = ''
  collegeName=''
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

     api= '/mobileApp/course/getTopDeptName?'+'college_id='+this.college
      this.httpService.ajaxGet(api).then(async (res:any) =>{
        this.school=res['name']
        api='/mobileApp/college'
        this.httpService.ajaxGet(api).then((res:any)=>{
          for(let i in res){
            if(this.school==res[i].name){
              this.number=i
            }
          }
          for(let i in res[this.number].children){     
            if(this.college==res[this.number].children[i].id){
              this.collegeName=res[this.number].children[i].label
            } 
          }
        })
      })
    })
    this.semesters = this.createSemesters()


  }

  async change(){
    const api = '/mobileApp/course/update'
    let json = this.classInfo
    json['college'] = {id: this.college}
    console.log(json)
    const toast = await this.toastCtrl.create({
      message: '班课信息修改成功',
      duration: 3000,
    })
    toast.present()
  }
  
  checkSchool(){
    this.colleges=[]
    const api='/mobileApp/college'
    this.httpService.ajaxGet(api).then((res:any)=>{

    }).catch((err)=>{
      console.log(err)
    })
  }
  gotoQrcode(){
    this.router.navigateByUrl('/qrcode')
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