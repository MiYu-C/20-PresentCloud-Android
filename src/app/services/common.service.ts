import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public config:any={
    //域名：
    // domain:'http://47.115.72.49:7300/mock/5e7ababe6914d01473f8142c/yunzaodao',  // easy-mock
    domain:'',  // 本地后端 http://localhost:8000
  }

  private header = new HttpHeaders({'content-type': 'application/json'});
  constructor(public http:HttpClient) { }

  //封装了一个get请求
  ajaxGet(url:String) {
    var api=this.config.domain + url;
    return new Promise((resolve, reject) => {
      this.http.get(api,{headers : this.header}).subscribe((response) => {
        resolve(response);
      }, (err) => {
        reject(err);
      })
    })
  }
  //封装了一个post请求 
  ajaxPost(url:String, json:Object) {
    var api = this.config.domain + url;
    return new Promise((resove, reject) => {
      this.http.post(api, json, {headers : this.header}).subscribe((response) => {
        resove(response);
      }, (error) => {
        reject(error);
      })
    })
  }
  ajaxPut(url:String, json:Object) {
    var api = this.config.domain + url;
    return new Promise((resove, reject) => {
      this.http.put(api, json, {headers : this.header}).subscribe((response) => {
        resove(response);
      }, (error) => {
        reject(error);
      })
    })
  }
}