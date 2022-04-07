import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Organization } from 'src/app/models/organization/organization';
import { OrganizationDetailsComponent } from 'src/app/pages/management/mod-organization/organization-details/organization-details.component';

import { AuthServiceService } from 'src/app/services/auth/auth-service.service';


@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {
  constructor(public authApi: AuthServiceService, public dialogRef: MatDialogRef<ProjectFormComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder, private organizatioNDetail: OrganizationDetailsComponent) { }
  projectForm!: FormGroup;
  
  ngOnInit(): void {
    this.initForm();
  
  }

  initForm() {
    this.projectForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      created_by: [this.authApi.currentUserValue.id],
      request_type: ['create'],
    })
  }
  noClick() {
    this.dialogRef.close(false);

  }
  yesClick() {
    if (this.projectForm.valid) {
      this.dialogRef.close(this.projectForm.value);
    }
  }
}
