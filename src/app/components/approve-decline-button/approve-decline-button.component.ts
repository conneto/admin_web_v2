import { Component, Injectable, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Campaign } from 'src/app/models/campaign/campaign.model';
import { Organization } from 'src/app/models/organization/organization';
import { Project } from 'src/app/models/projects/project.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { OrganizationInforCardComponent } from '../request-components/organization-infor-card/organization-infor-card.component';

@Component({
  selector: 'app-approve-decline-button',
  templateUrl: './approve-decline-button.component.html',
  styleUrls: ['./approve-decline-button.component.scss']
})
@Injectable({
  providedIn: 'root',
})
export class ApproveDeclineButtonComponent implements OnInit {
  @Input() organization?: Organization;
  @Input() project?: Project;
  @Input() campaign?: Campaign;
  @Input() isRequest?: boolean
  isPro: string='';
  isOrg: string='';
  isCam: string='';
  constructor(private router: Router, private authApi: AuthService, private dialog: MatDialog, private dialogConfirm: OrganizationInforCardComponent) { }

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

    await this.dialogConfirm.approve(this.organization?.id || this.project?.id || this.campaign?.id, this.isPro || this.isOrg || this.isCam);
  }
  async reject() {

    await this.dialogConfirm.reject(this.organization?.id || this.project?.id || this.campaign?.id, this.isPro || this.isOrg || this.isCam);
  }

}
