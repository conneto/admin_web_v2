import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampaignRequestRoutingModule } from './campaign-request-routing.module';
import { CampaignRequestComponent } from './campaign-request.component';
import { ComponentModule } from 'src/app/components/component/component.module';


@NgModule({
  declarations: [
    CampaignRequestComponent
  ],
  imports: [
    CommonModule,
    CampaignRequestRoutingModule,
    ComponentModule,
  ]
})
export class CampaignRequestModule { }
