import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Organization } from 'src/app/models/organization/organization';
import { Project } from 'src/app/models/projects/project.model';
import { OrganizationDetailsComponent } from 'src/app/pages/management/mod-organization/organization-details/organization-details.component';

import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
import { LoadingServiceService } from 'src/app/services/loading/loading-service.service';
import { OrganizationApiService } from 'src/app/services/organization/organization-api.service';
import { ProjectApiService } from 'src/app/services/project/project-api.service';

@Component({
  selector: 'app-camapaign-form',
  templateUrl: './camapaign-form.component.html',
  styleUrls: ['./camapaign-form.component.scss']
})
export class CamapaignFormComponent implements OnInit {
  coverImage?: File;
  constructor(private organizationApi: OrganizationApiService, private projectApi: ProjectApiService, public loadingService: LoadingServiceService, public authApi: AuthServiceService, public dialogRef: MatDialogRef<CamapaignFormComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder, private organizatioNDetail: OrganizationDetailsComponent) { }
  campaignForm!: FormGroup;
  isSubmitted?: boolean;
  organizations: Organization[] = [];
  projects: Project[] = [];
  selectedValue?: string;
  selectedRadio?: string;
  type: string[] = ['Quyên góp', 'Tuyển tình nguyện viên'];
  ngOnInit(): void {
    this.initForm();
    let uploadData: any = new FormData();
    uploadData.append('campaign', JSON.stringify(this.campaignForm.value));

  }

  async initForm() {

    this.campaignForm = this.formBuilder.group({
      selected: [this.selectedValue, Validators.required],
      name: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(128)]],
      description: ['', [Validators.required, Validators.minLength(128), Validators.maxLength(256)]],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      start_working_date: ["", this.selectedRadio == "Quyên góp" ? "" : Validators.required],
      end_working_date: ['', this.selectedRadio == "Quyên góp" ?"" : Validators.required],
      request_type: ['create'],
      type: [this.selectedRadio == "Quyên góp" ? 'donate' : 'recruitment', Validators.required],
      target_number: ['', Validators.required],
      job_requirement: ['',this.selectedRadio == "Quyên góp"  ? "" : [Validators.required, Validators.minLength(8), Validators.maxLength(128)]],
      job_description: ['', this.selectedRadio == "Quyên góp"  ? "" : [Validators.required, Validators.minLength(8), Validators.maxLength(128)]],
      job_benefit: ['', this.selectedRadio == "Quyên góp"  ? "" : [Validators.required, Validators.minLength(8), Validators.maxLength(128)]],
      project_id: [this.loadingService.projectId.value],
      cover: [''],

    })
    this.organizations = await this.organizationApi.getAll();
    if (this.organizations) {
      this.projects = await this.organizationApi.getProjectsByOrgId(`${this.organizations[0].id}`);
      this.projects = this.projects.filter(x => {
        return x.resultCode == 610;
      })
    }
  }
  noClick() {
    console.log(this.selectedValue);
    this.dialogRef.close(false);

  }
  uploadData: any = new FormData();
  yesClick() {
    this.isSubmitted = true;
    console.log('ngu');
    console.log(this.campaignForm.value);
    if (this.campaignForm.valid) {

      // if (this.selectedRadio == "Quyên góp" ) {
      //   this.campaignForm.value.start_working_date = this.campaignForm.value.start_date;
      //   this.campaignForm.value.end_working_date = this.campaignForm.value.end_date;
      // }
      this.uploadData.append('campaign', JSON.stringify(this.campaignForm.value));
      // uploadData.append('cover', this.coverImage, this.coverImage?.name);

      this.dialogRef.close(this.uploadData);
    }
  }
  onChange(e: any) {

    if (e.target.files && e.target.files.length > 0) {
      for (let i = 0; i < e.target.files.length; i++) {
        this.uploadData.append('cover', e.target.files[i], e.target.files[i].name);
      }
      // this.coverImage = e.target.files[0];
    }
  }
  get campaignControl() {
    return this.campaignForm.controls;
  }
}
