import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Organization } from 'src/app/models/organization/organization';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
import { LoadingServiceService } from 'src/app/services/loading/loading-service.service';
import { UtilService } from "../../services/util-service/util.service";

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {
  displayColumns?: string[]

  @Input() entity?: any;
  @Input() whichEntity?: string;


  @ViewChild(MatPaginator) paginator!: MatPaginator

  dataSource = new MatTableDataSource;

  urlApi?: string;

  constructor(private role: AuthServiceService, private router: Router, private loadingService: LoadingServiceService, public utilService: UtilService) {
  }

  ngOnInit(): void {
    switch (this.whichEntity) {
      case 'org': this.displayColumns = ['name', "created_name", 'type', 'founding_date', 'status']; break;
      case 'pro': this.displayColumns = ["org_name",'name',  'created_date','start_date', 'end_date' ]; break;
      case 'cam': this.displayColumns = ["pro_name",'name', 'created_date','start_date', 'end_date' ]; break;
    }
    this.dataSource = new MatTableDataSource(this.entity);

    this.urlApi = this.loadingService.getApiGetLink.value;

  }


  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;

  }
  goToDetails(e?: any) {

    if (this.role.currentUserValue.role != 'admin') {

      switch (this.whichEntity) {
        case 'org': this.router.navigate([`manager/manage-organization/organization-request-detail/${e}`]); break;
        case 'pro': this.router.navigate([`manager/manage-project/project-request-detail/${e}`]); break;
        case 'cam': this.router.navigate([`manager/manage-campaign/campaign-details/${e}`]); break;

      }
    } else {
      switch (this.whichEntity) {
        case 'org': this.router.navigate([`admin/manage-organization/organization-request-detail/${e}`]); break;
        case 'pro': this.router.navigate([`admin/manage-project/project-request-detail/${e}`]); break;
        case 'cam': this.router.navigate([`admin/manage-campaign/campaign-details/${e}`]); break;

      }
    }
  }
}
