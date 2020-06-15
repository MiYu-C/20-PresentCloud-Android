import { LocalStorageService } from 'src/app/services/local-storage.service';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

declare var BMap;
@Component({
  selector: 'app-initiate',
  templateUrl: './initiate.page.html',
  styleUrls: ['./initiate.page.scss'],
})
export class InitiatePage implements OnInit {
  constructor(public localStorage: LocalStorageService,
              public nav: NavController) { }
  ngOnInit() {
  }




  async getLocation() {
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
    this.localStorage.set('longitude', longitude);
    this.localStorage.set('latitude', latitude);
    console.log(latitude);
    this.nav.navigateForward('\start');
  }

}