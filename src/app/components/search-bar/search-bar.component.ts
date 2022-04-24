import { Component, EventEmitter, Injectable, Input, OnInit, Output } from '@angular/core';

import { Campaign } from 'src/app/models/campaign/campaign.model';
import { Organization } from 'src/app/models/organization/organization';
import { Project } from 'src/app/models/projects/project.model';
import { OrganizationsComponent } from 'src/app/pages/management/mod-organization/organizations/organizations.component';
import { TabgroupComponent } from '../tab-group/tabgroup.component';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})

@Injectable({
  providedIn:'root',
})
export class SearchBarComponent implements OnInit {
  @Input() organizations: any[] = [];
  @Input() projects: Project[] = [];
  @Input() campaigns: Campaign[] = [];
  @Input() entity?: any;
  @Input() entityCopy?: any;
  @Input() status?: string;
  @Input() isChangeState?: boolean;
  @Output() getItem = new EventEmitter<any>();
  organization: Organization[] = [];
  organizationS?: Organization;
  isEmpty?: boolean;

  constructor(private org: OrganizationsComponent, public tabGroup: TabgroupComponent) { }

  ngOnInit(): void {
    // this.organization=this.organizations;
    // this.checkStatus(`${this.status}`);

  }
  ngAfterViewChecked():void{
    
  }
  checkStatus(status: string) {

    switch (status) {
      case 'approve':
        this.org.getAllOrganizationByStatus('approve');
        break;
      case 'reject':
        this.org.getAllOrganizationByStatus('reject');
        break;
    }
  }
  clearInput() {
    (<HTMLInputElement>document.getElementById(('myInput'))).value = '';
  }
  searchName(e: any, status?: string, entity?: string) {
    


    if (e.target.value.length <= 0 || e.target.value == '') {
      this.isEmpty = false;
      this.organization = this.entityCopy;
    } else {

      this.isEmpty = false;

      this.organization = this.entityCopy.filter((x: any) => {
        return x.name?.toLowerCase().includes(`${e.target.value}`.toLowerCase().trim());
      })
      if (this.organization == [] || this.organization.length <= 0) {
        this.isEmpty = true;
      }
    }
    this.passData(this.organization);

  }

  passData(e: any) {
    this.getItem.emit(e);
  }
  getState(e: any) {
    return e;
  }
}
