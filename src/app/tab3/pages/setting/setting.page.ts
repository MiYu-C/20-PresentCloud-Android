import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  constructor(private localStorageService: LocalStorageService,
private router: Router) { }

  ngOnInit() {
    
  }
  onAboutus(){
    this.router.navigateByUrl('/about-us');
  }
  onLogout() {
    const config = this.localStorageService.get('App', '');
    config.hasRun = false;
    this.localStorageService.set('App', config);
    this.router.navigateByUrl('/login');
  }
}
