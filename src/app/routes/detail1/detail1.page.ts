import { Component, OnInit } from '@angular/core';
import { LocalStorageService, GLOBAL_VARIABLE_KEY, USER_KEY } from 'src/app/services/local-storage.service';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-detail1',
  templateUrl: './detail1.page.html',
  styleUrls: ['./detail1.page.scss'],
})
export class Detail1Page implements OnInit {

  college = ''
  school=''
  collegeName=''
  number=''
  colleges = []
  schools=[]

  courseCode = ''

  isTeacher = true

  classInfo = {
    'id': '',
    'courseCode': '',
    'courseName': '',
    'className': '',
    'teacherName': '',
    'semester': '',
    'school': '',
    'college': {},
    'joinPermission': null,
    'enabled': null,
  }

  constructor(private localStorageService:LocalStorageService, private router: Router, private httpService:CommonService, private alertCtrl: AlertController) { }

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

    
  }


  async exitClass(){
    const alert = await this.alertCtrl.create({
      header: '警告',
      message: '是否退出当前班课',
      buttons: [
        {
          text: '取消',
          role: 'cancel'
        },
        {
          text: '确定',
          handler: () => {
            const api = '/mobileApp/quit/course?'+'userId='+this.localStorageService.get(USER_KEY, {"id":null}).id+'&'+'courseCode='+this.courseCode
            this.httpService.ajaxGet(api).then(async (res:any)=>{
              window.location.replace('tabs/tab1')
            })
          }
        }
      ]
    })
    alert.present()
  }
}