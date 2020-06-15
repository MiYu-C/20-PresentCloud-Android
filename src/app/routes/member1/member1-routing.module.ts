import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Member1Page } from './member1.page';

const routes: Routes = [
  {
    path: '',
    component: Member1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Member1PageRoutingModule {}
