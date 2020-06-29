import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService, APP_KEY, USER_KEY } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class StartAppGuard implements CanActivate {
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      const appConfig: any = this.localStorageService.get(APP_KEY, {
        hasRun: false,
        version: '1.0.0'
      })
      const userInfo: any = this.localStorageService.get(USER_KEY, {
        isLogined: false
      })
      if (appConfig.hasRun === false) {
        appConfig.hasRun = true
        this.localStorageService.set(APP_KEY, appConfig)
        return true
      } else if (userInfo.isLogined === false) {
        this.router.navigateByUrl('/login')
        return true
      } else {
        this.router.navigateByUrl('/tabs/tab1')
        return true

      }
  }
}