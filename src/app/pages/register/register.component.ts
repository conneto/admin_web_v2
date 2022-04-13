import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, MinLengthValidator, MinValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackBarMessageComponent } from 'src/app/components/snack-bar-message/snack-bar-message.component';
import { BaseResponse } from 'src/app/models/base-response/base-response';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
import { LoadingServiceService } from 'src/app/services/loading/loading-service.service';
import { Md5 } from 'ts-md5';

import { LoginComponent } from '../login/login.component';
import { LoginModule } from '../login/login.module';
import { UserManagementComponent } from '../user-management/user-management.component';

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
  constructor(private userComponent:UserManagementComponent,private loadingService: LoadingServiceService, private snackBar: SnackBarMessageComponent, private router: Router, private authService: AuthServiceService, private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.initRegisterForm();
  }
  async register() {
    this.isSubmited = true;

    this.loadingService.isLoading.next(true);

    if (this.registerForm.valid) {
      const md5 = new Md5()
      let uploadData: any = new FormData();


      const oldPass = this.registerForm.value.password;
      const oldPhone = this.registerForm.value.number_phone;
      this.registerForm.value.number_phone="0"+""+oldPhone;
      // this.registerForm.patchValue({ password: md5.appendStr(this.registerForm.value.password.concat(RegisterComponent.KEY)).end() });
      this.registerForm.value.password=md5.appendStr(this.registerForm.value.password.concat(RegisterComponent.KEY)).end();
      console.log(this.registerForm.value.password);
      uploadData.append('account', JSON.stringify(this.registerForm.value));
      console.log(uploadData.get('account'));
      let res: BaseResponse = await this.authService.register(
        uploadData
      )

      if (res?.status == 0) {
        this.userComponent.getListMangerAndVolunteer();
        this.loadingService.isLoading.next(false);
        this.snackBar.showMessage(res.message, true);
        let baseResponse: BaseResponse = await this.authService.login(
          false,
          this.registerForm.value.username,
          oldPass,
        );
        if (baseResponse?.status == 0) {
          this.snackBar.showMessage(res.message, true);
          await this.router.navigate(['admin']);
        }
      } else {
        this.registerForm.setValue({
          username: this.registerForm.value.username, password:oldPass, first_name: this.registerForm.value.first_name,
          last_name: this.registerForm.value.last_name, number_phone: oldPhone, role: 'organization_manager'
        })
        this.loadingService.isLoading.next(false);
        this.snackBar.showMessage(res.message, false)
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
