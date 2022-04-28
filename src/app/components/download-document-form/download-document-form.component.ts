import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileUploader, FileItem } from 'ng2-file-upload';
import * as XLSX from 'xlsx';
import * as _ from 'lodash';
import { CampaignApiService } from 'src/app/services/campaign/campaign-api.service';
import { BaseResponse } from 'src/app/models/base-response/base-response';
import { Campaign } from 'src/app/models/campaign/campaign.model';


@Component({
  selector: 'app-download-document-form',
  templateUrl: './download-document-form.component.html',
  styleUrls: ['./download-document-form.component.scss']
})
export class DownloadDocumentFormComponent implements OnInit {
  fileName: string = 'BieuMau.xlsx';
  public hasBaseDrop = true;
  uploadedFiles = [];
  fileUpload!: FormGroup;
  @Input() campaign?: Campaign;
  docFile?: any;
  hasBaseDropZoneOver = false;
  uploader?: FileUploader;
  id?: string;
  file?: any;
  files: File[] = [];
  formData:any=new FormData();
  url = `http://conneto.org:5000/core/api/v1/campaigns/${this.data?.id}/donation_documents/cashflow_details`;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private matDialogRef: MatDialogRef<DownloadDocumentFormComponent>, private camApi: CampaignApiService, private formBuilder: FormBuilder, private dialog: MatDialog) {

  }

  tableUpload() {

  }
  closeForm() {
    this.matDialogRef.close();
  }

  ngOnInit(): void {

    this.fileUpload = this.formBuilder.group({
      myFile: ['', Validators.required],
    })
    this.uploader = new FileUploader({

      url: this.url,

      maxFileSize: 15 * 1024 * 1024
    })
    this.uploader.onBuildItemForm = function (fileItem, form) { form.append('myvar', 'myval'); return { fileItem, form } };


    if (this.uploader) {


      this.uploader.onCompleteItem = (fileItem: FileItem, form: FormData | any) => {
        console.log('uploader onCompleteItem', fileItem);

        fileItem.withCredentials = false;

      };

    }
  }
  fileOverBase(e: any) {
    this.hasBaseDropZoneOver = e;
  }
  async uploadAll() {
    let res: BaseResponse | null = await this.camApi.uploadCashFlow(this.formData, `${this.data.id}`);
    if (res?.status == 0) {
      console.log("upload thành công");
    } else {
      console.log("fail");
    }
  }
  exportExcel() {
    let element = document.querySelector('#excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    const file: File = XLSX.writeFile(wb, this.fileName);
    console.log(file);
    console.log(XLSX.writeFile(wb, this.fileName));
  }
  openModal() {

  }
  uploadFile(e: any) {
    let af = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];
    if (e.target.files.length > 0) {
      this.docFile = e.target.files[0];
      console.log(this.docFile);

      if (!_.includes(af, this.docFile.type)) {
        alert('Only EXCEL Docs Allowed!');
      }
    }
  }
  async onFormSubmit() {
    const formData = new FormData();

    formData.append('cashflow_detail', this.docFile, this.docFile?.name);
    let res: BaseResponse | null = await this.camApi.uploadCashFlow(formData, `${this.campaign?.id}`);
    if (res?.status == 0) {
      console.log("upload thành công");
    } else {
      console.log("fail");
    }

  }
  get campaignControl() {
    return this.fileUpload.controls;
  }
  onSelect(event:any) {
    console.log(event);
    this.files.push(...event.addedFiles);
    for(let i=0;i<this.files.length;i++){
      this.formData?.append("cashflow_detail",this.files[i],this.files[i].name);
    }
    console.log(this.formData);
  }
  
  onRemove(event:any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
}
