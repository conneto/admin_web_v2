import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';


import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
import { LoadingServiceService } from 'src/app/services/loading/loading-service.service';
import { OrganizationApiService } from 'src/app/services/organization/organization-api.service';
import { ProjectApiService } from 'src/app/services/project/project-api.service';


@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {
  constructor(private router:Router,public organizationId: LoadingServiceService, private authApi: AuthServiceService, public dialogRef: MatDialogRef<ProjectFormComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder) { }
  projectForm!: FormGroup;
  coverImage?: File;
  logo?:File;
  isSubmitted?:boolean;
  ngOnInit(): void {
    this.initForm();

  }

  initForm() {
    this.projectForm = this.formBuilder.group({
      name: ['', [ Validators.required,Validators.minLength(8),Validators.maxLength(128)]],
      description: ['', [ Validators.required,Validators.minLength(128),Validators.maxLength(256)]],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      created_by: [this.authApi.currentUserValue.id],
      organization_id: [this.organizationId.getOrganizationId.value],
      request_type: ['create'],
      cover: [''],
      logo:[''],
    })
  }
  noClick() {
   
    this.dialogRef.close(false);

  }
  yesClick() {
    this.isSubmitted=true;
    if (this.projectForm.valid) {
      let uploadData: any = new FormData();
      uploadData.append('cover', this.coverImage, this.coverImage?.name);
      uploadData.append('logo',this.logo,this.logo?.name);
      uploadData.append('project', JSON.stringify(this.projectForm.value));
      this.dialogRef.close(uploadData);
    }
  }
  onChange(e: any) {
    if (e.target.files && e.target.files.length > 0) {
      this.coverImage = e.target.files[0];
    }
  }
  onChangeCover(e: any) {
    if (e.target.files && e.target.files.length > 0) {
      this.logo = e.target.files[0];
    }

  }
  get projectControl(){
    return this.projectForm.controls;
  }
}
