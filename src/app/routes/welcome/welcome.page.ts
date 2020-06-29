import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  constructor(private router: Router, private localStorageService:LocalStorageService) { }

  ngOnInit() {
  }

  onSignup() {
    this.router.navigateByUrl('/signup')
  }
  onLogin() {
    this.router.navigateByUrl('/login')
  }
}