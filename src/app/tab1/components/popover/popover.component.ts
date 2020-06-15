import { APP_KEY } from 'src/app/core/start-app.guard';
import { LocalStorageService } from './../../../services/local-storage.service';
import { Component, OnInit, OnChanges } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})

export class PopoverComponent implements OnInit {
  // public state: any = 1;
  constructor(
    public popoverController: PopoverController,
    public localStorage: LocalStorageService) { }

  ngOnInit() {
  }

  // ngOnChanges() {
  //   if (this.localStorage.getItem('hasRole') === false) {
  //     this.state = false;
  //   } else {
  //     this.state = true;
  //   }
  // }

  // setRole() {
  //   this.localStorage.set('role', 'studert');
  //   const role: any = this.localStorage.getItem('role');
  //   console.log(role);
  // }

  async dismissPop(e: any) {
    this.popoverController.dismiss();
  }
}