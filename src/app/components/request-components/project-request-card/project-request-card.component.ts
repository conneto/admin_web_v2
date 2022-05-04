import { Component, Injectable, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Campaign } from 'src/app/models/campaign/campaign.model';
import { Organization } from 'src/app/models/organization/organization';
import { Project } from 'src/app/models/projects/project.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoadingService } from 'src/app/services/loading-service/loading.service';
import { DialogConfirmComponent } from '../../dialog-confirm/dialog-confirm.component';
import { OrganizationInforCardComponent } from '../organization-infor-card/organization-infor-card.component';


@Component({
  selector: 'app-project-request-card',
  templateUrl: './project-request-card.component.html',
  styleUrls: ['./project-request-card.component.scss']
})

export class ProjectRequestCardComponent implements OnInit {
  @Input() organization?: Organization;
  @Input() projects?: Project;
  @Input() campaign?: Campaign;
  @Input() isRequest?: boolean
  isPro: string = '';
  isOrg: string = '';
  isCam: string = '';
  urlLogo?:string;
  urlApi?:string;
  urlCover?:string;
  constructor(private loadingApi:LoadingService,private dialog: MatDialog, private authApi: AuthService, private dialogConfirm: OrganizationInforCardComponent) { }
  ngOnInit(): void {
    this.check();
    this.urlApi = this.loadingApi.getApiGetLink.value;
    this.urlLogo = this.projects?.organization_logo?.replace(/\\/g, '\/');
    this.urlCover = this.projects?.cover?.replace(/\\/g, '\/');

  }

  viewDetails() {

  }


  check() {
    if (this.organization) {
      this.isOrg = 'org';
    } else if (this.campaign) {
      this.isCam = 'cam';
    } else {
      this.isPro = 'pro';
    }
  }
  async approve() {
    await this.dialogConfirm.approve(this.organization?.id || this.projects?.id || this.campaign?.id, this.isPro || this.isOrg || this.isCam);
  }
  async reject() {
    await this.dialogConfirm.reject(this.organization?.id || this.projects?.id || this.campaign?.id, this.isPro || this.isOrg || this.isCam);
  }
}
