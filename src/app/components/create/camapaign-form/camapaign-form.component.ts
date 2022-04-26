import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrganizationDetailsComponent } from 'src/app/pages/management/mod-organization/organization-details/organization-details.component';
import { ProjectDetailsComponent } from 'src/app/pages/management/mod-project/project-details/project-details.component';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
import { LoadingServiceService } from 'src/app/services/loading/loading-service.service';

@Component({
  selector: 'app-camapaign-form',
  templateUrl: './camapaign-form.component.html',
  styleUrls: ['./camapaign-form.component.scss']
})
export class CamapaignFormComponent implements OnInit {
  coverImage?: File;
  constructor(public loadingService: LoadingServiceService, public authApi: AuthServiceService, public dialogRef: MatDialogRef<CamapaignFormComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder, private organizatioNDetail: OrganizationDetailsComponent) { }
  campaignForm!: FormGroup;
  isSubmitted?: boolean;

  ngOnInit(): void {
    this.initForm();
    let uploadData: any = new FormData();
    uploadData.append('campaign', JSON.stringify(this.campaignForm.value));

  }

  initForm() {
    this.campaignForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(128)]],
      description: ['', [Validators.required, Validators.minLength(128), Validators.maxLength(256)]],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      start_working_date: ['',  this.data.type == 'donation' ? "":Validators.required],
      end_working_date: ['',  this.data.type == 'donation' ? "":Validators.required],
      request_type: ['create'],
      type: [this.data.type],
      target_number: ['', Validators.required],
      job_requirement: ['', this.data.type == 'donation' ? "" : [Validators.required, Validators.minLength(8), Validators.maxLength(128)]],
      job_description:['', this.data.type == 'donation' ? "" : [Validators.required, Validators.minLength(8), Validators.maxLength(128)]],
      job_benefit:['', this.data.type == 'donation' ? "" : [Validators.required, Validators.minLength(8), Validators.maxLength(128)]],
      project_id: [this.loadingService.projectId.value],
      cover: [''],
    })
  }
  noClick() {
    this.dialogRef.close(false);

  }
  uploadData: any = new FormData();
  yesClick() {
    this.isSubmitted = true;
    console.log(this.campaignForm);
    if (this.campaignForm.valid) {
      console.log(this.uploadData,this.campaignForm.value);
      this.uploadData.append('campaign', JSON.stringify(this.campaignForm.value));
      // uploadData.append('cover', this.coverImage, this.coverImage?.name);
      console.log(this.uploadData.getAll('cover'));
      console.log(this.uploadData.getAll('campaign'))
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
