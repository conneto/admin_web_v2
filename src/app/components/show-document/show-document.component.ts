import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LoadingServiceService } from 'src/app/services/loading/loading-service.service';

@Component({
  selector: 'app-show-document',
  templateUrl: './show-document.component.html',
  styleUrls: ['./show-document.component.scss']
})
export class ShowDocumentComponent implements OnInit {
  @Input() entityPDF: any;
  @Input() entityExcel: any;
  @Input() type: any;
  displayColumns: [] = [];
  uriApi?: string;
  name?: any;
  constructor(private loading: LoadingServiceService) { }
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngOnInit(): void {
    console.log(this.type);
    if(this.type=='pdf'){
      for (let i = 0; i < this.entityPDF?.length; i++) {
        this.name = this.entityPDF[i].url.split('/');
  
        Object.assign(this.entityPDF[i], {
          name: this.name[3],
        })
      }
    }else {
    
      this.dataSource = new MatTableDataSource(this.entityExcel);
    }
 


    this.uriApi = this.loading.getApiGetLink.value;
  }
  ngViewAfterInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}
