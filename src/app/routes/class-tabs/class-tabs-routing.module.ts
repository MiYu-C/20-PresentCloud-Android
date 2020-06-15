import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClassTabsPage } from './class-tabs.page';

const routes: Routes = [
  {
    path: 'class-tabs',
    component: ClassTabsPage,
    children: [
      {
        path: 'member',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../member/member.module').then(m => m.MemberPageModule)
          }
        ]
      },
      {
        path: 'detail',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../detail/detail.module').then(m => m.DetailPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/class-tabs/member',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/class-tabs/member',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassTabsPageRoutingModule {}