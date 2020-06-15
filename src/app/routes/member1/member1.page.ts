import { NavController } from '@ionic/angular';
import { Component, OnInit, OnChanges } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member1',
  templateUrl: './member1.page.html',
  styleUrls: ['./member1.page.scss'],
})
export class Member1Page implements OnInit{
  public role: any;
  public text: any;
  constructor(public localService: LocalStorageService,
              public nav: NavController,
              private router: Router,) { }

  ngOnInit() {

  }

  gotosign() {
    this.nav.navigateForward('\sign-in');
  }

  clickedStar() {
    this.router.navigateByUrl('/unopen');
  }
}