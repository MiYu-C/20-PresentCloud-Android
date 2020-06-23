import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';

declare var BMap;
@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  public longitude: any;
  public latitude: any;
  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public toastCtrl: ToastController) { }

  ngOnInit() {
  }
  signInAlert() {
    alert('签到成功');
  }

  getLocation() {
    const geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function(r) {
      const mk = new BMap.Marker(r.point);
      alert('您的位置：' + r.point.lng + ',' + r.point.lat);
      this.longitude = r.point.lng;
      this.latitude = r.point.lat;
      console.log(this.longitude);
    }, { enableHighAccuracy: true });
    this.signInAlert();
  }

  getDistance() {
  }
}