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
    this.nav.navigateForward('/start');
  }
}