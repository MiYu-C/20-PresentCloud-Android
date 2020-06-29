import { LocalStorageService } from './../../../services/local-storage.service';
import { Component, OnInit, OnChanges } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Router} from '@angular/router';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})

export class PopoverComponent implements OnInit {
  // public state: any = 1;
  constructor(
    public popoverController: PopoverController,
    public localStorage: LocalStorageService,
    private router: Router) { }

  ngOnInit() {
  }

  onCreateclass(){
    this.router.navigateByUrl('tabs/tab1/create-class')
  }
  onJoinclass(){
    this.router.navigateByUrl('tabs/tab1/join-class')
  }
  async dismissPop(e: any) {
    this.popoverController.dismiss();
  }
}