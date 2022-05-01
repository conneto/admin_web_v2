import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LoadingService } from 'src/app/services/loading-service/loading.service';

@Component({
  selector: 'app-show-document',
  templateUrl: './show-document.component.html',
  styleUrls: ['./show-document.component.scss']
})
export class ShowDocumentComponent implements OnInit {
  @Input() entityPDF: any;
  @Input() entityExcel: any;
  @Input() type: any;
  displayColumns?: string[] = ["payer_name", "purpose", "payment_date", "item", "price", "quantity", "recipient_name", "unit"];
  uriApi?: string;
  name?: any;
  showName?: any;
  constructor(private loading: LoadingService) { }
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngOnInit(): void {

    if (this.type == 'pdf') {
      for (let i = 0; i < this.entityPDF?.length; i++) {
        this.name = this.entityPDF[i].url.split('/');

        Object.assign(this.entityPDF[i], {
          name: this.name[3],
        })

      }

    } else {
      this.displayColumns = ["payer_name", "purpose", "payment_date", "item", "price", "quantity", "recipient_name", "unit"];
      this.dataSource = new MatTableDataSource(this.entityExcel?.cashflow_details);

    }



    this.uriApi = this.loading.getApiGetLink.value;
  }
  ngViewAfterInit(): void {


    this.dataSource.paginator = this.paginator;
  }
}
