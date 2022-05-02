import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Constant } from 'src/app/constant/constant';
import { Organization } from 'src/app/models/organization/organization';
import { Project } from 'src/app/models/projects/project.model';
import { OrganizationDetailsComponent } from 'src/app/pages/management/mod-organization/organization-details/organization-details.component';

import { AuthService } from 'src/app/services/auth/auth.service';
import { LoadingService } from 'src/app/services/loading-service/loading.service';
import { OrganizationApiService } from 'src/app/services/organization/organization-api.service';
import { ProjectService } from 'src/app/services/project-service/project.service';

@Component({
  selector: 'app-campaign-form',
  templateUrl: './campaign-form.component.html',
  styleUrls: ['./campaign-form.component.scss']
})
export class CamapaignFormComponent implements OnInit {
  coverImage?: File;
  constructor(private organizationApi: OrganizationApiService, private projectApi: ProjectService, public loadingService: LoadingService, public authApi: AuthService, public dialogRef: MatDialogRef<CamapaignFormComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder, private organizatioNDetail: OrganizationDetailsComponent) { }
  campaignForm!: FormGroup;
  isSubmitted?: boolean;
  organizations: Organization[] = [];
  projects: Project[] = [];
  selectedValue?: string;
  selectedRadio: string = 'Quyên góp';
  cloneProjects: Project[] = [];
  type: string[] = ['Quyên góp', 'Tuyển tình nguyện viên'];
  uploadData: any = new FormData();
  isOnlyProject?: boolean;
  isRemoved?: boolean;
  category: any[] = Constant.CATEGORY;
  categoryString: string = '';
  categoryStringClone: string = '';
  projectName?:string;
  ngOnInit(): void {
    this.initForm();
    this.check();
    // let uploadData: any = new FormData();
    // uploadData.append('campaign', JSON.stringify(this.campaignForm.value));

  }

  initForm() {

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
      category: [''],

    })

  }
  async check() {
    if (this.data.project) {
      this.isOnlyProject = true;

    } else {
      this.organizations = await this.organizationApi.getAll();
      if (this.organizations) {
        this.cloneProjects = await this.organizationApi.getProjectsByOrgId(`${this.organizations[0].id}`);
        this.projects = this.cloneProjects.filter(x => {
          return x.resultCode == 610;
        })
      }
    }
  }
  noClick() {

    this.dialogRef.close(false);

  }

  yesClick() {
    if (this.campaignForm.controls.category.value.length != 0 && this.campaignForm.controls.category.value) {
      if (this.isRemoved == true || this.isSubmitted == true) {
        this.categoryStringClone = '';
        for (let i = 0; i < this.campaignForm.controls.category.value.length; i++) {
          this.categoryStringClone = this.campaignForm.controls.category.value[i].name.concat("|", this.categoryStringClone);
        }
      } else {
        this.categoryStringClone = '';
        for (let i = 0; i < this.campaignForm.controls.category.value.length; i++) {
          this.categoryStringClone = this.campaignForm.controls.category.value[i].name.concat("|", this.categoryStringClone);

        }
      }
    }
    if (this.categoryStringClone?.length > 0) {
      this.categoryString = this.categoryStringClone.slice(0, this.categoryStringClone.length - 1);
    }else {
      this.categoryString='';
    }
    this.isSubmitted = true;



    this.projects = this.cloneProjects.filter(x => {
      return x.name == this.campaignForm.value.selected;
    })

    if (this.projects.length != 0) {
      this.campaignForm.patchValue({ project_id: `${this.projects[0].id}` })
    }
    if (this.selectedRadio == 'Quyên góp') {

      this.campaignForm.patchValue({ start_working_date: `${this.campaignForm.value.start_date}` })
      this.campaignForm.patchValue({ end_working_date: `${this.campaignForm.value.end_date}` })
      this.campaignForm.patchValue({ type: 'donation' })
      this.campaignForm.removeControl('job_requirement');
      this.campaignForm.removeControl('job_description');
      this.campaignForm.removeControl('job_benefit');

    } else if (
      this.selectedRadio == 'Tuyển tình nguyện viên'
    ) {
      this.campaignForm.patchValue({ type: 'recruitment' })

    }

    if (this.campaignForm.valid) {
      this.campaignForm.value.category=this.categoryString;
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
    if (e == 'Quyên góp') {
      this.campaignForm.removeControl('job_requirement');
      this.campaignForm.removeControl('job_description');
      this.campaignForm.removeControl('job_benefit');
    } else if (e == 'Tuyển tình nguyện viên') {

      this.campaignForm.setControl('job_requirement', new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(128)]));
      this.campaignForm.setControl('job_description', new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(128)]));
      this.campaignForm.setControl('job_benefit', new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(128)]));
    }
  }
  onRemoveCategory(e: string) {
    this.isRemoved = true;
    const category = this.campaignForm.controls.category.value as string[];
    const index = category.indexOf(e);
    console.log(index);
    if (index !== -1) {
      category.splice(index, 1);
    }
    if (index == 0) {
      this.categoryStringClone = ''
    }
    this.campaignForm.controls.category.patchValue(category);
  }
}
