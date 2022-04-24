import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampaignsRoutingModule } from './campaigns-routing.module';
import { CampaignsComponent } from './campaigns.component';
import { ComponentModule } from 'src/app/components/component/component.module';
import {AngularMaterialModule} from "../../../../angular-material.module";


@NgModule({
  declarations: [
    CampaignsComponent
  ],
  imports: [
    CommonModule,
    CampaignsRoutingModule,
    ComponentModule,
    AngularMaterialModule
  ],
})
export class CampaignsModule { }
