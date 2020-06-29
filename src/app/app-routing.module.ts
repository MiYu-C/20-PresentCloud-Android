import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { StartAppGuard } from './core/start-app.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    loadChildren: './routes/welcome/welcome.module#WelcomePageModule',
    canActivate: [StartAppGuard]
  },
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
    loadChildren: () => import('./tab3/pages/info/info.module').then( m => m.InfoPageModule)
  },
  {
    path: 'setting',
    loadChildren: () => import('./tab3/pages/setting/setting.module').then( m => m.SettingPageModule)
  },
  {
    path: 'about-us',
    loadChildren: () => import('./tab3/pages/about-us/about-us.module').then( m => m.AboutUsPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./routes/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./routes/class-tabs/class-tabs.module').then( m => m.ClassTabsPageModule)
  },
  {
    path: 'initiate',
    loadChildren: () => import('./routes/sign-in/initiate/initiate.module').then( m => m.InitiatePageModule)
  },
  {
    path: '',
    loadChildren: () => import('./routes/class-tabs1/class-tabs1.module').then( m => m.ClassTabs1PageModule)
  },
  {
    path: 'start',
    loadChildren: () => import('./routes/sign-in/start/start.module').then( m => m.StartPageModule)
  },
  {
    path: 'record',
    loadChildren: () => import('./routes/sign-in/record/record.module').then( m => m.RecordPageModule)
  },
  {
    path: 'signin',
    loadChildren: () => import('./routes/sign-in/signin/signin.module').then( m => m.SigninPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
