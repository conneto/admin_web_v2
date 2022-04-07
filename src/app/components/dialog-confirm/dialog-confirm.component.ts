import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.scss']
})
@Injectable({
  providedIn: 'root',
})
export class DialogConfirmComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogConfirmComponent>, public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  noClick() {
    this.dialogRef.close(false);
  }

  yesClick() {
    this.dialogRef.close(true);
  }

  createDialog(button: any, message: any) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '300px,',
      data: {
        button: button,
        message: message,
      }
    })
    return dialogRef;
  }
}
