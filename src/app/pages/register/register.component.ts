import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, MinLengthValidator, MinValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackBarMessageComponent } from 'src/app/components/snack-bar-message/snack-bar-message.component';
import { BaseResponse } from 'src/app/models/base-response/base-response';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
import { Md5 } from 'ts-md5';

import { LoginComponent } from '../login/login.component';
import { LoginModule } from '../login/login.module';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  hide: boolean = false;
  registerForm!: FormGroup;
  isSubmited: boolean = false;

  public static readonly KEY = '_CoNn3t0Se(R3T';
  constructor(private snackBar: SnackBarMessageComponent, private router: Router, private authService: AuthServiceService, private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.initRegisterForm();
  }
  async register() {
    this.isSubmited = true;
    if (this.registerForm.valid) {
      const md5 = new Md5()
      let uploadData: any = new FormData();
      const oldPass = this.registerForm.value.password;
      this.registerForm.value.number_phone = '0' + "" + this.registerForm.value.number_phone;
      this.registerForm.value.password = md5.appendStr(this.registerForm.value.password.concat(RegisterComponent.KEY)).end();
      uploadData.append('account', JSON.stringify(this.registerForm.value));
      console.log(uploadData.get('account'));

      let res: BaseResponse | null = await this.authService.register(
        uploadData
      )
      console.log(res?.resultCode);
      if (res?.resultCode == 0) {
        this.snackBar.showMessage("Create success !")
        let baseResponse: BaseResponse | null = await this.authService.login(
          false,
          this.registerForm.value.username,
          oldPass,
        );
        if (baseResponse?.resultCode == 0) {

          await this.router.navigate(['admin']);
        }
      } else {
        this.snackBar.showMessage("Error . Please try again !")
      }
    }

  }
  initRegisterForm() {
    const md5 = new Md5();
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      number_phone: ['', Validators.required,],
      role: ['organization_manager'],
    })
  }
}
