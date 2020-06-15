import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Detail1Page } from './detail1.page';

const routes: Routes = [
  {
    path: '',
    component: Detail1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Detail1PageRoutingModule {}
