import { Component, Injectable, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Campaign } from 'src/app/models/campaign/campaign.model';
import { Organization } from 'src/app/models/organization/organization';
import { Project } from 'src/app/models/projects/project.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { OrganizationInforCardComponent } from '../organization-infor-card/organization-infor-card.component';

@Component({
  selector: 'app-campaign-request-card',
  templateUrl: './campaign-request-card.component.html',
  styleUrls: ['./campaign-request-card.component.scss']
})

export class CampaignRequestCardComponent implements OnInit {
  @Input() organization?: Organization;
  @Input() project?: Project;
  @Input() campaign?: Campaign;
  @Input() isRequest?: boolean
  isPro: string = '';
  isOrg: string = '';
  isCam: string = '';
  urlLogo?:string;
  urlApi?:string;
  urlCover?:string;
  isAdmin?:boolean;
  constructor(private authService:AuthService,private router:Router,private dialogConfirm:OrganizationInforCardComponent) { }

  ngOnInit(): void {
    this.check();
    if (this.authService.currentUserValue.role_id == 'admin') {
      this.isAdmin = true;
    }
  }
  goToDetails(id: any) {

    if (this.isAdmin) {
      this.router.navigate([`/admin/manage-campaign/campaign-details/${id}`])
    } else {
      this.router.navigate([`/manager/manage-campaign/campaign-details/${id}`])
    }
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
    await this.dialogConfirm.approve(this.organization?.id || this.project?.id || this.campaign?.id, this.isPro || this.isOrg || this.isCam);
  }
   async reject() {
    await this.dialogConfirm.reject(this.organization?.id || this.project?.id || this.campaign?.id, this.isPro || this.isOrg || this.isCam);
  }
}
