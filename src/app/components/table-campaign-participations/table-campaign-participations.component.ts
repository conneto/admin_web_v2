import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LoadingServiceService } from 'src/app/services/loading/loading-service.service';
import { UtilService } from 'src/app/services/util-service/util.service';

@Component({
  selector: 'app-table-campaign-participations',
  templateUrl: './table-campaign-participations.component.html',
  styleUrls: ['./table-campaign-participations.component.scss']
})
export class TableCampaignParticipationsComponent implements OnInit {
  displayColumns: string[] = ['name'];
  displayVolunteerColumns:string[]=['name']
  @Input() entity?: any;
  @Input() volunteer?:any;

  @ViewChild(MatPaginator) paginator!: MatPaginator

  dataSource = new MatTableDataSource;

  urlApi?: string;

  constructor(private loadingService: LoadingServiceService, public utilService: UtilService) {
  }

  ngOnInit(): void {
 
    this.dataSource=new MatTableDataSource(this.volunteer);
    this.urlApi = this.loadingService.getApiGetLink.value;
    
  }


  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
 
  }
}
