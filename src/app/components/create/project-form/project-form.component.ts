import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Constant } from 'src/app/constant/constant';


import { AuthService } from 'src/app/services/auth/auth.service';
import { LoadingService } from 'src/app/services/loading-service/loading.service';
import { OrganizationApiService } from 'src/app/services/organization/organization-api.service';
import { ProjectService } from 'src/app/services/project-service/project.service';


@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {
  constructor(private router:Router,public organizationId: LoadingService, private authApi: AuthService, public dialogRef: MatDialogRef<ProjectFormComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder) { }
  projectForm!: FormGroup;
  coverImage?: File;
  logo?:File;
  isSubmitted?:boolean;
  isRemoved?:boolean;
  category:any[]=Constant.CATEGORY;
  categoryStringClone?:any;
  categoryString?:any;
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
      category:[''],
    })
  }
  noClick() {

    this.dialogRef.close(false);

  }
  yesClick() {

    if (this.projectForm.controls.category.value.length != 0 && this.projectForm.controls.category.value) {
      if (this.isRemoved == true || this.isSubmitted == true) {
        this.categoryStringClone = '';
        for (let i = 0; i < this.projectForm.controls.category.value.length; i++) {
          this.categoryStringClone = this.projectForm.controls.category.value[i].name.concat("|", this.categoryStringClone);
        }
      } else {
        for (let i = 0; i < this.projectForm.controls.category.value.length; i++) {
          this.categoryStringClone = this.projectForm.controls.category.value[i].name.concat("|", this.categoryStringClone);

        }
      }
    }
    this.categoryString = this.categoryStringClone.slice(0, this.categoryStringClone.length - 1);
    this.isSubmitted = true;
    this.projectForm.value.category = this.categoryString;

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
  onRemoveCategory(e: string) {
    this.isRemoved = true;
    const category = this.projectForm.controls.category.value as string[];
    const index = category.indexOf(e);
    console.log(index);
    if (index !== -1) {
      category.splice(index, 1);
    }
    if (index == 0) {
      this.categoryStringClone = ''
    }
    this.projectForm.controls.category.patchValue(category);
  }
}
