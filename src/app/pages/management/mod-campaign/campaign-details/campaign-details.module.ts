import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ComponentModule } from 'src/app/components/component/component.module';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { CampaignDetailsComponent } from './campaign-details.component';
import { CampaignDetailsRoutingModule } from './campaign-details-routing.module';


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
