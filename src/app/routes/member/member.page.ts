import { NavController } from '@ionic/angular';
import { Component, OnInit, OnChanges } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member',
  templateUrl: './member.page.html',
  styleUrls: ['./member.page.scss'],
})
export class MemberPage implements OnInit{
  public role: any;
  public text: any;
  constructor(public localService: LocalStorageService,
              public nav: NavController,
              private router: Router,) { }

  ngOnInit() {

  }

  gotosign() {
    this.nav.navigateForward('\initiate');
  }

  clickedStar() {
    this.router.navigateByUrl('/record');
  }
}