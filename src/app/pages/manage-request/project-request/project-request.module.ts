import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRequestRoutingModule } from './project-request-routing.module';
import { ProjectRequestComponent } from './project-request.component';
import { ComponentModule } from 'src/app/components/component/component.module';


@NgModule({
  declarations: [
    ProjectRequestComponent
  ],
  imports: [
    CommonModule,
    ProjectRequestRoutingModule,
    ComponentModule,
  ]
})
export class ProjectRequestModule { }
