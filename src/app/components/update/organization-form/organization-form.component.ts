import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Constant } from 'src/app/constant/constant';

@Component({
  selector: 'app-organization-update-form',
  templateUrl: './organization-form.component.html',
  styleUrls: ['./organization-form.component.scss']
})
export class OrganizationUpdateFormComponent implements OnInit {

  isWrongFile?: boolean;
  category: any[] = Constant.CATEGORY;
  categoryString: string = '';
  categoryStringClone: string = '';
  isRemoved?: boolean;
  organizationForm!: FormGroup;
  filePDF: File[] = [];
  isSubmitted?: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  update() {

  }
  get organizationControl() {
    return this.organizationForm.controls;
  }

  onChangeLogo(e: any) {

  }

  onChangeCover(e: any) {

  }

  onRemoveCategory(e: any) {

  }

  onSelectPDF(f: any) {

  }

  onRemove(f: any) {

  }
}
