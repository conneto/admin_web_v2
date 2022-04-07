import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRequestRoutingModule } from './project-request-routing.module';
import { ProjectRequestComponent } from './project-request.component';
import { ComponentModule } from 'src/app/components/component/component.module';
import { AngularMaterialModule } from 'src/app/angular-material.module';


@NgModule({
  declarations: [
    ProjectRequestComponent
  ],
  imports: [
    CommonModule,
    ProjectRequestRoutingModule,
    AngularMaterialModule,
    ComponentModule,
  ]
})
export class ProjectRequestModule { }
