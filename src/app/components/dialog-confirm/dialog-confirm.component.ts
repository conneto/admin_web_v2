import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
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
  reasonFormControl = new FormControl('', {
    validators: Validators.required
  });
  volunteerFormControl = new FormControl('', {
    validators: Validators.required
  });
  constructor(public dialogRef: MatDialogRef<DialogConfirmComponent>, public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  noClick() {
    this.dialogRef.close(false);
  }

  yesClick() {
   if(this.data.reason || this.data.volunteer){
    this.reasonFormControl.markAllAsTouched();
    this.volunteerFormControl.markAllAsTouched();
    if (!this.reasonFormControl.errors?.required) {
      this.dialogRef.close(this.reasonFormControl.value);
    }
    if (!this.volunteerFormControl.errors?.required) {
      this.dialogRef.close(this.volunteerFormControl.value);
    }
  
   }else{
     this.dialogRef.close(true);
   }
   
  }
}
