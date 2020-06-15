import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class StartAppGuard implements CanActivate {
  constructor(private localStorageService: LocalStorageService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const appConfig: any = this.localStorageService.get(APP_KEY, {
      hasRun: false,
      version: '1.0.0'
    });
    if ( appConfig.hasRun === false ) {
      appConfig.hasRun = true;
      this.localStorageService.set(APP_KEY, appConfig);
      return true;
    } else {
      this.router.navigateByUrl('/tabs/tab1');
      return false;
    }
  }
}
export const APP_KEY = 'App';