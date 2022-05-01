import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Organization } from 'src/app/models/organization/organization';
import { Project } from 'src/app/models/projects/project.model';
import { OrganizationDetailsComponent } from 'src/app/pages/management/mod-organization/organization-details/organization-details.component';

import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
import { LoadingService } from 'src/app/services/loading-service/loading.service';
import { OrganizationApiService } from 'src/app/services/organization/organization-api.service';
import { ProjectService } from 'src/app/services/project-service/project.service';

@Component({
  selector: 'app-camapaign-form',
  templateUrl: './camapaign-form.component.html',
  styleUrls: ['./camapaign-form.component.scss']
})
export class CamapaignFormComponent implements OnInit {
  coverImage?: File;
  constructor(private organizationApi: OrganizationApiService, private projectApi: ProjectService, public loadingService: LoadingService, public authApi: AuthServiceService, public dialogRef: MatDialogRef<CamapaignFormComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder, private organizatioNDetail: OrganizationDetailsComponent) { }
  campaignForm!: FormGroup;
  isSubmitted?: boolean;
  organizations: Organization[] = [];
  projects: Project[] = [];
  selectedValue?: string;
  selectedRadio: string = 'Quyên góp';
  cloneProjects: Project[] = [];
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
      end_working_date: ['', this.selectedRadio == "Quyên góp" ? "" : Validators.required],
      request_type: ['create'],
      type: ['', Validators.required],
      target_number: ['', Validators.required],
      job_requirement: [''],
      job_description: [''],
      job_benefit: [''],
      project_id: [''],
      cover: [''],

    })
    this.organizations = await this.organizationApi.getAll();
    if (this.organizations) {
      this.cloneProjects = await this.organizationApi.getProjectsByOrgId(`${this.organizations[0].id}`);
      this.projects = this.cloneProjects.filter(x => {
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
    console.log(this.selectedRadio);
    this.isSubmitted = true;

    this.projects = this.cloneProjects.filter(x => {
      return x.name == this.campaignForm.value.selected;
    })

    this.campaignForm.patchValue({ project_id: `${this.projects[0].id}` })
    if (this.selectedRadio == 'Quyên góp' ) {

      this.campaignForm.patchValue({ start_working_date: `${this.campaignForm.value.start_date}` })
      this.campaignForm.patchValue({ end_working_date: `${this.campaignForm.value.end_date}` })
      this.campaignForm.patchValue({ type: 'donation' })
      this.campaignForm.removeControl('job_requirement');
      this.campaignForm.removeControl('job_description');
      this.campaignForm.removeControl('job_benefit');
      console.log(this.campaignForm.valid);
    } else if (
      this.selectedRadio == 'Tuyển tình nguyện viên'
    ) {
      this.campaignForm.patchValue({ type: 'recruitment' })

    }
    console.log(this.campaignForm.value);
    if (this.campaignForm.valid) {

      console.log(this.campaignForm.value);
      this.uploadData.append('campaign', JSON.stringify(this.campaignForm.value));


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
  getType(e: string) {
    console.log(e);
    if(e=='Quyên góp'){
      this.campaignForm.removeControl('job_requirement');
      this.campaignForm.removeControl('job_description');
      this.campaignForm.removeControl('job_benefit');
    }else if(e=='Tuyển tình nguyện viên'){

      this.campaignForm.setControl('job_requirement', new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(128)]));
      this.campaignForm.setControl('job_description', new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(128)]));
      this.campaignForm.setControl('job_benefit', new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(128)]));
    }

   }
}
