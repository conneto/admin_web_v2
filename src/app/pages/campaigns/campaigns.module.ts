import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampaignsRoutingModule } from './campaigns-routing.module';
import { CampaignsComponent } from './campaigns.component';
import { ComponentModule } from 'src/app/components/component/component.module';


@NgModule({
  declarations: [
    CampaignsComponent
  ],
  imports: [
    CommonModule,
    CampaignsRoutingModule,
    ComponentModule,
  ]
})
export class CampaignsModule { }
