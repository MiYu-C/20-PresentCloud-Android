import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./routes/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'login2',
    loadChildren: () => import('./routes/login2/login2.module').then( m => m.Login2PageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./routes/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'info',
    loadChildren: () => import('./routes/info/info.module').then( m => m.InfoPageModule)
  },
  {
    path: 'setting',
    loadChildren: () => import('./routes/setting/setting.module').then( m => m.SettingPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
