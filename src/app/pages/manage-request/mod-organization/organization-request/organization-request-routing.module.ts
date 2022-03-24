import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrganizationRequestComponent } from './organization-request.component';

const routes: Routes = [{ path: '', component: OrganizationRequestComponent },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRequestRoutingModule { }
