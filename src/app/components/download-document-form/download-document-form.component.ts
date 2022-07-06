import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileUploader, FileItem } from 'ng2-file-upload';
import * as XLSX from 'xlsx';
import * as _ from 'lodash';
import { CampaignService } from 'src/app/services/campaign/campaign.service';
import { BaseResponse } from 'src/app/models/base-response/base-response';
import { Campaign } from 'src/app/models/campaign/campaign.model';
import { SnackBarMessageComponent } from '../snack-bar-message/snack-bar-message.component';
import { LoadingService } from 'src/app/services/loading-service/loading.service';


@Component({
  selector: 'app-download-document-form',
  templateUrl: './download-document-form.component.html',
  styleUrls: ['./download-document-form.component.scss']
})
export class DownloadDocumentFormComponent implements OnInit {
  fileName: string = 'BieuMau.xlsx';
  public hasBaseDrop = true;

  fileUpload!: FormGroup;
  @Input() campaign?: Campaign;
  docFile?: any;
  hasBaseDropZoneOver = false;
  uploader?: FileUploader;
  id?: string;

  files: File[] = [];
  filesExcel: File[] = [];
  formData: any = new FormData();
  formDataExcel: any = new FormData();
  @Output() isUploaded = new EventEmitter<string>();

  constructor(private loading: LoadingService, private snackBar: SnackBarMessageComponent, private camApi: CampaignService, private formBuilder: FormBuilder,) {

  }
  passValue(e: any) {
    this.isUploaded.emit(e);
  }

  ngOnInit(): void {

    this.fileUpload = this.formBuilder.group({
      myFile: ['', Validators.required],
    })


  }
  async uploadExcel() {
    this.loading.isLoading.next(true);
     let res: BaseResponse<any> | null = await this.camApi.uploadCashFlow(this.formDataExcel, `${this.campaign?.id}`);
    switch (res?.status) {
      case 0: this.filesExcel = [];
        this.loading.isLoading.next(false);
        this.snackBar.showMessage("Đăng tải tài liệu thành công !", true);
        this.passValue('excel');
        break;
      default:
        this.loading.isLoading.next(false);
        this.snackBar.showMessage(`${res.message}`, false);
        break;
    }
  }
  async uploadPdf() {
    this.loading.isLoading.next(true);
     let res: BaseResponse<any> | null = await this.camApi.uploadPdf(this.formData, `${this.campaign?.id}`);

    switch (res?.status) {
      case 0: this.files = [];
        this.loading.isLoading.next(false);
        this.snackBar.showMessage("Đăng tải tài liệu thành công !", true);
        this.passValue('pdf');
        break;
      default:
        this.loading.isLoading.next(false);
        this.snackBar.showMessage(`${res.message}`, false);
        break;
    }

  }
  exportExcel() {
    let element = document.querySelector('#excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    const file: File = XLSX.writeFile(wb, this.fileName);
  }
  openModal() {

  }
  uploadFile(e: any) {
    let af = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];
    if (e.target.files.length > 0) {
      this.docFile = e.target.files[0];

      if (!_.includes(af, this.docFile.type)) {
        alert('Only EXCEL Docs Allowed!');
      }
    }
  }
  async onFormSubmit() {
    const formData = new FormData();

    formData.append('cashflow_detail', this.docFile, this.docFile?.name);
     let res: BaseResponse<any> | null = await this.camApi.uploadCashFlow(formData, `${this.campaign?.id}`);
    if (res?.status == 0) {
    } else {
    }

  }
  get campaignControl() {
    return this.fileUpload.controls;
  }

  onSelect(event: any) {
    if (event) {
      this.files.push(...event.addedFiles);
    }

    for (let i = 0; i < this.files.length; i++) {
      this.formData?.append("files", this.files[i], this.files[i].name);
    }
  }

  onSelectExcel(event: any) {
    if (event) {
      this.filesExcel=event.addedFiles;
    }
    for (let i = 0; i < this.filesExcel.length; i++) {
      this.formDataExcel?.append("cashflow_detail", this.filesExcel[i], this.filesExcel[i].name);
    }
    ;
  }
  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }
  onRemoveExcel(event: any) {
    this.filesExcel.splice(this.filesExcel.indexOf(event), 1);
  }
}
