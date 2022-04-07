import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrganizationDetailsComponent } from 'src/app/pages/management/mod-organization/organization-details/organization-details.component';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';

@Component({
  selector: 'app-camapaign-form',
  templateUrl: './camapaign-form.component.html',
  styleUrls: ['./camapaign-form.component.scss']
})
export class CamapaignFormComponent implements OnInit {

  constructor(public authApi: AuthServiceService, public dialogRef: MatDialogRef<CamapaignFormComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder, private organizatioNDetail: OrganizationDetailsComponent) { }
  campaignForm!: FormGroup;
  
  ngOnInit(): void {
    this.initForm();
  
  }

  initForm() {
    this.campaignForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      request_type: ['create'],
      type: ['',Validators.required],
      target_number: ['',Validators.required],
      job_requirement: ['',Validators.required],
      job_description: ['',Validators.required],
      job_benefit: ['',Validators.required],
    })
  }
  noClick() {
    this.dialogRef.close(false);

  }
  yesClick() {
    if (this.campaignForm.valid) {
      this.dialogRef.close(this.campaignForm.value);
    }
  }
}
