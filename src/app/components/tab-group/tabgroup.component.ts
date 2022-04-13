import { Component, EventEmitter, Injectable, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Organization } from 'src/app/models/organization/organization';
import { CampaignsComponent } from 'src/app/pages/management/mod-campaign/campaigns/campaigns.component';
import { OrganizationsComponent } from 'src/app/pages/management/mod-organization/organizations/organizations.component';
import { ProjectComponent } from 'src/app/pages/management/mod-project/project/project.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-tabgroup',
  templateUrl: './tabgroup.component.html',
  styleUrls: ['./tabgroup.component.scss']
})
@Injectable({
  providedIn: 'root',
})
export class TabgroupComponent implements OnInit {
  @Input() entity?: string;

  @Input() isActivated?: boolean;
  @Input() isEmpty?: boolean;
  @Input() organizations: Organization[] = [];
  @Input() object: any[] = [];
  isActive1: boolean = false;
  isActive2: boolean = false;
  isActive3: boolean = false;
  isChangeState: boolean = false;
  @Output() getState = new EventEmitter<any>();
  @ViewChild('searchBar') searchBar?: SearchBarComponent;
  constructor(private org: OrganizationsComponent, private pro: ProjectComponent, private camp: CampaignsComponent) { }

  ngOnInit(): void {

    this.getTabActivated();

  }
  changeActive(name: string) {
    switch (name) {
      case 'approve': this.isActive1 = true, this.isActive2 = false, this.isActive3 = false; break;
      case 'reject': this.isActive1 = false, this.isActive2 = false, this.isActive3 = true; break;
      case 'pending': this.isActive1 = false, this.isActive2 = true, this.isActive3 = false; break;
    }
  }

  getTabActivated() {

    if (localStorage.getItem('approve')) {
      this.getEntity('approve', this.entity);
    }

    if (localStorage.getItem('pending')) {
      this.getEntity('pending', this.entity);

    }

    if (localStorage.getItem('reject')) {
      this.getEntity('reject', this.entity);
    }

  }

  getEntity(name: string, entity: any) {
    this.passData(this.isChangeState = true);
    switch (name) {
      case 'approve':
        localStorage.setItem('approve', 'true');
        localStorage.removeItem('reject');
        localStorage.removeItem('pending');
        this.changeActive('approve');
        switch (entity) {
          case 'org':
            this.org.getAllOrganizationByStatus('approve', this.organizations);
            break;
          case 'cam': break;
          case 'pro':
            this.pro.getAllProjectsByStatus('approve',this.object);
            break;
        }
        break;
      case 'pending':
        localStorage.setItem('pending', 'true');
        localStorage.removeItem('approve');
        localStorage.removeItem('reject');
        this.changeActive('pending');
        switch (entity) {
          case 'org':
            this.org.getAllOrganizationByStatus('pending', this.organizations);
            break;
          case 'cam': break;
          case 'pro': this.pro.getAllProjectsByStatus('pending',this.object); break;
        }
        break;
      case 'reject':
        localStorage.setItem('reject', 'true');
        localStorage.removeItem('approve');
        localStorage.removeItem('pending');
        this.changeActive('reject');
        switch (entity) {
          case 'org':
            this.org.getAllOrganizationByStatus('reject', this.organizations);
            break;
          case 'cam': break;
          case 'pro': this.pro.getAllProjectsByStatus('reject',this.object); break;
        }
        break;

    }

  }
  passData(e: any) {

    this.getState.emit(e);
  }
}
