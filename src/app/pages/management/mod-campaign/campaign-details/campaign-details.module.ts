import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampaignDetailsRoutingModule } from './campaign-details-routing.module';
import { CampaignDetailsComponent } from './campaign-details.component';
import { ComponentModule } from 'src/app/components/component/component.module';
import { AngularMaterialModule } from 'src/app/angular-material.module';


@NgModule({
  declarations: [
    CampaignDetailsComponent
  ],
  imports: [
    CommonModule,
    CampaignDetailsRoutingModule,ComponentModule,AngularMaterialModule
  ]
})
export class CampaignDetailsModule { }
