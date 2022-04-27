import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Organization} from 'src/app/models/organization/organization';
import {AuthServiceService} from 'src/app/services/auth/auth-service.service';
import {LoadingServiceService} from 'src/app/services/loading/loading-service.service';
import {UtilService} from "../../services/util-service/util.service";

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {
  displayColumns: string[] = ['name', 'created_name', 'created_at', 'type']
  @Input() entity?: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator
  dataSource = new MatTableDataSource;

  urlApi?: string;

  constructor(private loadingService: LoadingServiceService, public utilService: UtilService) {
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.entity);

    this.urlApi = this.loadingService.getApiGetLink.value;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}
