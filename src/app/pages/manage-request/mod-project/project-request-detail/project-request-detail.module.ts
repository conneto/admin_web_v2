import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ProjectRequestDetailComponent } from './project-request-detail.component';
import { ProjectRequestDetailRoutingModule } from './project-request-detail-routing.module';
import { ComponentModule } from 'src/app/components/component/component.module';
import { AngularMaterialModule } from 'src/app/angular-material.module';


@NgModule({
  declarations: [
    ProjectRequestDetailComponent
  ],
  imports: [
    CommonModule,
    ProjectRequestDetailRoutingModule,
    ComponentModule,
    AngularMaterialModule,
  ]
})
export class ProjectRequestDetailModule { }
