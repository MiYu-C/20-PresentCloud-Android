import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InitiateSignInPage } from './initiate-sign-in.page';

const routes: Routes = [
  {
    path: '',
    component: InitiateSignInPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InitiateSignInPageRoutingModule {}
