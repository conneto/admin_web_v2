import { Component, Injectable, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackBarMessageComponent } from 'src/app/components/snack-bar-message/snack-bar-message.component';
import { BaseResponse } from 'src/app/models/base-response/base-response';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoadingService } from 'src/app/services/loading-service/loading.service';
@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isSubmitData: boolean = false;
  isChecked: boolean = false;
  isError: boolean = false;
  hide = true;
  constructor(public loadService: LoadingService, private snackBar: SnackBarMessageComponent, private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.initLoginForm();
    var enter = document.getElementsByClassName('input');
    console.log(enter);
    for (var i = 0; i < enter.length; i++) {
      (<HTMLElement>enter[i]).addEventListener("keyup", function (e) {
        if (e.key == 'Enter') {
          e.preventDefault();
          (<HTMLElement>document.getElementsByClassName('button-login')[0]).click();
          console.log((<HTMLElement>document.getElementsByClassName('login')[0]));
        }
      })
    }

  }

  async login() {

    this.isSubmitData = true;
    if (this.loginForm.valid) {
      let baseResponse: BaseResponse | null = await this.authService.login(
        this.isChecked,
        this.loginForm.value.username,
        this.loginForm.value.password
      );
      if (baseResponse?.status == 0) {

        if (this.authService.currentUserValue.role_id === 'organization_manager') {
          await this.router.navigate(['manager']);
        } else if (this.authService.currentUserValue.role_id === 'admin') {
          await this.router.navigate(['admin/dashboard']);
        } else {
          this.isError = true;
        }
      } else if (baseResponse?.status == 6) {
        this.isError = true;
      }
    }
  }

  initLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

}
