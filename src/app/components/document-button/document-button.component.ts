import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-document-button',
  templateUrl: './document-button.component.html',
  styleUrls: ['./document-button.component.scss']
})
export class DocumentButtonComponent implements OnInit {
  fileName='BieuMau.xlsx';
  constructor(private matDialogRef: MatDialogRef<DocumentButtonComponent>, private dialgo: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }
  exportExcel() {
    let element = document.querySelector('#excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    const file:File=XLSX.writeFile(wb,this.fileName);
  }
}
