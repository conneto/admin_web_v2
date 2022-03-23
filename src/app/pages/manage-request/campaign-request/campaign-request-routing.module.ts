import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampaignRequestComponent } from './campaign-request.component';

const routes: Routes = [{ path: '', component: CampaignRequestComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampaignRequestRoutingModule { }
