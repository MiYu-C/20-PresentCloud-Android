import { Injectable } from '@angular/core';
import { CommonService } from '../services/common.service';
import { LocalStorageService, USER_KEY } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PassportService {

  constructor(private httpService:CommonService, private localStorageService: LocalStorageService) { }

  async login(json:object){
    const api='/mobileApp/login'
    return new Promise((resolve,reject)=>{
      this.httpService.ajaxPost(api,json).then((res:any)=>{
        resolve(res)
      }).catch((err)=>{
        reject(err)
      })
    })
  }
  async checkIsRegisted(phone:string){
    const api='/mobileApp/check?phone='+phone
    return new Promise((resolve,reject)=>{
      this.httpService.ajaxGet(api).then((res)=>{
        resolve(res)
      }).catch((err)=>{
        reject(err)
      })
    })
  }
  async register(isStudent:boolean,json:object){
    let api = ''
    if(isStudent){
      api='/mobileApp/student/register'
    }else {
      api='/mobileApp/teacher/register'
    }
    return new Promise((resolve,reject)=>{
      this.httpService.ajaxPost(api,json).then((res:any)=>{
          resolve(res)
      }).catch((err)=>{
        reject(err)
      })
    })
  }
  async changePassword(oldPassword: string, newPassword: string, status: string){
    let userInfo: any = this.localStorageService.get(USER_KEY, false)
    const  api='/mobileApp/password/change'
    const json = {
      count: userInfo.phone,
      oldPassword: oldPassword,
      newPassword: newPassword,
      role: status
    }
    return new Promise((resolve,reject)=>{
      this.httpService.ajaxPost(api,json).then((res)=>{
        resolve(res)
      }).catch((err)=>{
        reject(err)
      })
    })
  }
}