
import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  private segment: any = 1;
  popover: any;

  constructor(public popoverController: PopoverController) {
    this.popover = null;
  }
  clickcreate() {
    this.segment = 1;
  }
  clickjoin() {
    this.segment = 2;
  }


}