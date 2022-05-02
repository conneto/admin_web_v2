import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DownloadDocumentFormComponent } from 'src/app/components/download-document-form/download-document-form.component';
import { Campaign } from 'src/app/models/campaign/campaign.model';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
import { CampaignService } from 'src/app/services/campaign/campaign.service';
import { LoadingService } from 'src/app/services/loading-service/loading.service';

@Component({
  selector: 'app-campaign-details',
  templateUrl: './campaign-details.component.html',
  styleUrls: ['./campaign-details.component.scss']
})
export class CampaignDetailsComponent implements OnInit {
  campaign?: Campaign;
  urlApi?: string;
  urlCover?: string;
  urlLogo?: string;
  urlProjectLogo?: string;
  isInformation?: boolean;
  isDocument?: boolean;
  isAnother?: boolean
  isApproved?: boolean;
  isAdmin?: boolean;
  volunteer?: [] = [];
  type?: string;
  isEmpty?: boolean = false;
  isShow?: boolean;
  documentPDF?: any;
  documentExcel?: any;
  isPDF?: boolean;
  isExcel?: boolean;
  isUpload?: boolean;
  pdfName?:any;

  constructor(private dialog: MatDialog, private userApi: AuthServiceService, private loadingService: LoadingService, private location: Location, private activated: ActivatedRoute, private campaignApi: CampaignService) { }

  ngOnInit(): void {
    this.isPDF = true;
    this.getByID();
    this.isInformation = true;
    if (localStorage.getItem("approve")) {
      this.isApproved = true;
    }
    if (this.userApi.currentUserValue.role == 'admin') {
      this.isAdmin = true;
    }
  }
  getDocument() {
    this.type = 'pdf';

    this.isPDF = true; this.isExcel = false;
    this.isUpload = false;

  }
  getDocumentExcel() {
    this.type = 'excel';
    this.isPDF = false; this.isExcel = true;
    this.isUpload = false;


  }
  openFormDocument() {
    const dialogRef = this.dialog.open(DownloadDocumentFormComponent, {
      width: '600px',
      data: {
        id: this.campaign?.id,
      }
    })
  }
  async getByID() {
    const id = this.activated.snapshot.paramMap.get('id');
    this.urlApi = this.loadingService.getApiGetLink.value;
    console.log(this.urlApi);
    this.campaign = await this.campaignApi.getById(`${id}`);

    this.urlLogo = this.campaign?.org_logo?.replace(/\\/g, '\/');
    this.urlCover = this.campaign?.cover?.replace(/\\/g, '\/');
    this.urlProjectLogo = this.campaign?.pro_logo?.replace(/\\/g, '\/');
    switch (this.campaign?.type) {
      case 'donation': this.campaign.type = 'Quyên góp';
        this.campaign.org_id = (this.campaign.totalDonated! / this.campaign.target!).toString();
        break;
      case 'recruitment': this.campaign.type = 'Tuyển người';
        this.campaign.org_id = (this.campaign.totalPaticipant! / this.campaign.target!).toString();
        break;
    }

  }
  async getValue(e: any) {

    if (e == 'pdf') {
      this.documentPDF = await this.campaignApi.getPdf(`${this.campaign?.id}`);
    } else if (e == 'excel') {
      this.documentExcel = await this.campaignApi.getCashFlow(`${this.campaign?.id}`);
      this.documentPDF = await this.campaignApi.getPdf(`${this.campaign?.id}`);
    }
  }
  goBack() {
    this.location.back();
  }
  getResult(e: any) {

    if (e == true) {
      this.getTab('ano');
    }
  }
  async getTab(id: any) {
    switch (id) {
      case 'infor':
        this.isInformation = true;
        this.isDocument = false;
        this.isAnother = false;
        this.isShow = false;
        break;
      case 'doc':

        this.documentExcel = await this.campaignApi.getCashFlow(`${this.campaign?.id}`);
        this.documentPDF = await this.campaignApi.getPdf(`${this.campaign?.id}`);
        if(this.documentPDF){
          for (let i = 0; i < this.documentPDF?.length; i++) {
            this.pdfName = this.documentPDF[i].url.split('/');

            Object.assign(this.documentPDF[i], {
              name: this.pdfName[3],
            })

          }
        }
        console.log(this.documentExcel);
        if (this.isAdmin) {
          if (this.documentPDF.length <= 0) {
            this.isEmpty = true;
          } else if (this.documentExcel) {
            this.getDocumentExcel();
          } else {
            this.getDocument();
          }
          console.log(this.isPDF);
        } else {
          this.isUpload = true;
        }
        this.isDocument = true;
        this.isInformation = false;
        this.isAnother = false;
        this.isShow = false;
        break;
      case 'ano':
        this.volunteer = await this.campaignApi.getParticipations(`${this.campaign?.id}`);

        if (this.volunteer?.length == 0) {
          this.isEmpty = true;
        }

        switch (this.campaign?.type) {
          case 'Quyên góp': this.type = 'donation'; break;
          case 'Tuyển người': this.type = 'recruitment'; break;
        }
        this.isAnother = true;
        this.isDocument = false;
        this.isInformation = false;
        this.isShow = false;



    }
  }
  uploadAll() {

  }
}
