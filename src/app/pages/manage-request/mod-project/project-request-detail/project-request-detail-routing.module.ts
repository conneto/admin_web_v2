import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectRequestDetailComponent } from './project-request-detail.component';

const routes: Routes = [{ path: '', component: ProjectRequestDetailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRequestDetailRoutingModule { }
