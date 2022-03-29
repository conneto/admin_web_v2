import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampaignRequestDetailRoutingModule } from './campaign-request-detail-routing.module';
import { CampaignRequestDetailComponent } from './campaign-request-detail.component';
import { ComponentModule } from 'src/app/components/component/component.module';
import { AngularMaterialModule } from 'src/app/angular-material.module';


@NgModule({
  declarations: [
    CampaignRequestDetailComponent
  ],
  imports: [
    CommonModule,
    CampaignRequestDetailRoutingModule,
    ComponentModule,
    AngularMaterialModule,
  ]
})
export class CampaignRequestDetailModule { }
