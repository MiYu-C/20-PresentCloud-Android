import { COURSES } from './../services/mock-courses';
import { Course } from './../services/course';
import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from './components/popover/popover.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  private segment: any = 1;
  popover: any;
  private course = COURSES;
  constructor(public popoverController: PopoverController) {
    this.popover = null;
  }
  clickcreate() {
    this.segment = 1;
  }
  clickjoin() {
    this.segment = 2;
  }
  async presentPop(e: any) {
    this.popover = await this.popoverController.create({
      component: PopoverComponent,
      event: e,
      translucent: true,
    });
    return await this.popover.present();
  }

}