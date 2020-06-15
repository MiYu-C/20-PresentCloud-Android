import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab1Page } from './tab1.page';

const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
  },
  {
    path: 'join-class',
    loadChildren: () => import('./pages/join-class/join-class.module').then( m => m.JoinClassPageModule)
  },
  {
    path: 'create-class',
    loadChildren: () => import('./pages/create-class/create-class.module').then( m => m.CreateClassPageModule)
  },
  {
    path: 'create-code',
    loadChildren: () => import('./pages/create-code/create-code.module').then( m => m.CreatcodePageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
