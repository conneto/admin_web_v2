import { Component, Injectable, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar-message',
  templateUrl: './snack-bar-message.component.html',
  styleUrls: ['./snack-bar-message.component.scss']
})
@Injectable({
  providedIn: 'root',
})
export class SnackBarMessageComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }
  showMessage(message: string, isSuccess?: boolean) {
    this.snackBar.open(message,'OK', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration:3000,
      panelClass: isSuccess ? ['success'] : ['fail'],
    })
  }
}
