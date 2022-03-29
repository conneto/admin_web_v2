import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampaignRequestDetailComponent } from './campaign-request-detail.component';

const routes: Routes = [{ path: '', component: CampaignRequestDetailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampaignRequestDetailRoutingModule { }
