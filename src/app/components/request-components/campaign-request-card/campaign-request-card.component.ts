import { Component, Injectable, Input, OnInit } from '@angular/core';
import { Campaign } from 'src/app/models/campaign/campaign.model';
import { Organization } from 'src/app/models/organization/organization';
import { Project } from 'src/app/models/projects/project.model';
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
  constructor(private dialogConfirm:OrganizationInforCardComponent) { }

  ngOnInit(): void {
    this.check();
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
    console.log(this.isPro,this.isOrg,this.isCam);
    await this.dialogConfirm.approve(this.organization?.id || this.project?.id || this.campaign?.id, this.isPro || this.isOrg || this.isCam);
  }
   async reject() {
    console.log(this.isPro,this.isOrg,this.isCam);
    await this.dialogConfirm.reject(this.organization?.id || this.project?.id || this.campaign?.id, this.isPro || this.isOrg || this.isCam);
  }
}
