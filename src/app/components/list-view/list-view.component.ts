import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Organization } from 'src/app/models/organization/organization';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
import { LoadingService } from 'src/app/services/loading-service/loading.service';
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
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource;

  urlApi?: string;

  constructor(private role: AuthServiceService, private router: Router, private loadingService: LoadingService, public utilService: UtilService) {
  }

  ngOnInit(): void {
    switch (this.whichEntity) {
      case 'org': this.displayColumns = ["no", 'name', "created_name", 'type', 'founding_date', 'status']; break;
      case 'pro': this.displayColumns = ["no", "org_name", 'name', 'created_date', 'start_date', 'end_date']; break;
      case 'cam': this.displayColumns = ["no", "pro_name", 'name', 'created_date', 'start_date', 'end_date']; break;
      case 'user': this.displayColumns = ["no", "name", 'username', 'created_date', 'role', 'status']; break;
    }
    for (let i = 0; i < this.entity.length; i++) {
      Object.assign(this.entity[i], { no: i + 1 });
    }
    this.dataSource = new MatTableDataSource(this.entity);

    this.urlApi = this.loadingService.getApiGetLink.value;

  }


  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

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
  filterByName(e: any) {
    const value = (e.target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
