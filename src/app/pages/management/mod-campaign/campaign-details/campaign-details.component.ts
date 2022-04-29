import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DownloadDocumentFormComponent } from 'src/app/components/download-document-form/download-document-form.component';
import { Campaign } from 'src/app/models/campaign/campaign.model';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
import { CampaignApiService } from 'src/app/services/campaign/campaign-api.service';
import { LoadingServiceService } from 'src/app/services/loading/loading-service.service';

@Component({
  selector: 'app-campaign-details',
  templateUrl: './campaign-details.component.html',
  styleUrls: ['./campaign-details.component.scss']
})
export class CampaignDetailsComponent implements OnInit {
  campaign?: Campaign;
  urlApi = this.loadingService.getApiGetLink.value;
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
  isEmpty?: boolean;
  isShow?: boolean;
  documentPDF?: any;
  documentExcel?: any;
  constructor(private dialog: MatDialog, private userApi: AuthServiceService, private loadingService: LoadingServiceService, private location: Location, private activated: ActivatedRoute, private campaignApi: CampaignApiService) { }

  ngOnInit(): void {
    this.getByID();
    this.isInformation = true;
    if (localStorage.getItem("approve")) {
      this.isApproved = true;
    }
    if (this.userApi.currentUserValue.role == 'admin') {
      this.isAdmin = true;
    }
  }
  async getDocument() {
    this.type = 'pdf';
    this.documentPDF = await this.campaignApi.getPdf(`${this.campaign?.id}`);
 

  }
  async getDocumentExcel() {
    this.type = 'excel';
    this.documentExcel = await this.campaignApi.getCashFlow(`${this.campaign?.id}`);


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
  goBack() {
    this.location.back();
  }
  getResult(e: any) {
    console.log(e);
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
        break;
      case 'doc':


        this.isDocument = true;
        this.isInformation = false;
        this.isAnother = false;
        break;
      case 'ano':
        this.volunteer = await this.campaignApi.getParticipations(`${this.campaign?.id}`);

        if (this.volunteer == []) {
          this.isEmpty = true;
        }
        switch (this.campaign?.type) {
          case 'Quyên góp': this.type = 'donation'; break;
          case 'Tuyển người': this.type = 'recruitment'; break;
        }
        this.isAnother = true;
        this.isDocument = false;
        this.isInformation = false;



    }
  }
  uploadAll() {

  }
}
