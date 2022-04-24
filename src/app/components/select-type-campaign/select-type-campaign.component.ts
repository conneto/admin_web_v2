import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-select-type-campaign',
  templateUrl: './select-type-campaign.component.html',
  styleUrls: ['./select-type-campaign.component.scss']
})
export class SelectTypeCampaignComponent implements OnInit {

  constructor(private matRef: MatDialogRef<SelectTypeCampaignComponent>, private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }
  close() {
    this.matRef.close();
  }
  openForm(e: any) {
    this.matRef.close(e);
  }
}
