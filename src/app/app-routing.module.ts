import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'add-class',
    loadChildren: () => import('./routes/class/student/add-class/add-class.module').then( m => m.AddClassPageModule)
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./routes/class/student/sign-in/sign-in.module').then( m => m.SignInPageModule)
  },
  {
    path: 'student',
    loadChildren: () => import('./routes/class/student/student/student.module').then( m => m.StudentPageModule)
  },
  {
    path: 'create-class',
    loadChildren: () => import('./routes/class/teacher/create-class/create-class.module').then( m => m.CreateClassPageModule)
  },
  {
    path: 'initiate-sign-in',
    loadChildren: () => import('./routes/class/teacher/initiate-sign-in/initiate-sign-in.module').then( m => m.InitiateSignInPageModule)
  },
  {
    path: 'sign-in-record',
    loadChildren: () => import('./routes/class/teacher/sign-in-record/sign-in-record.module').then( m => m.SignInRecordPageModule)
  },
  {
    path: 'teacher',
    loadChildren: () => import('./routes/class/teacher/teacher/teacher.module').then( m => m.TeacherPageModule)
  },
  {
    path: 'info',
    loadChildren: () => import('./routes/me/info/info.module').then( m => m.InfoPageModule)
  },
  {
    path: 'setting',
    loadChildren: () => import('./routes/me/setting/setting.module').then( m => m.SettingPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./routes/passport/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./routes/passport/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./routes/passport/register/register.module').then( m => m.RegisterPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
