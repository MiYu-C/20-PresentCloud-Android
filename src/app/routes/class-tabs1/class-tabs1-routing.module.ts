import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClassTabs1Page } from './class-tabs1.page';

const routes: Routes = [
  {
    path: 'class-tabs1',
    component: ClassTabs1Page,
    children: [
      {
        path: 'member1',
        children: [
          {
            path: '',
            loadChildren: () => import('../member1/member1.module').then( m => m.Member1PageModule)
          }
        ]
      },
      {
        path: 'detail1',
        children: [
          {
            path: '',
            loadChildren: () => import('../detail1/detail1.module').then( m => m.Detail1PageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/class-tabs1/member1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/class-tabs1/member1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassTabs1PageRoutingModule {}