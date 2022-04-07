import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { SnackBarMessageComponent } from 'src/app/components/snack-bar-message/snack-bar-message.component';
import { RegisterAdapter } from 'src/app/dtos/register/register.model';
import { UserLoginRequestAdapter } from 'src/app/dtos/user-login-request/user-login-request.model';
import { UserLoginResponse, UserLoginResponseApdater } from 'src/app/dtos/user-login-response/user-login-response.model';
import { BaseResponse } from 'src/app/models/base-response/base-response';
import { Md5 } from 'ts-md5';
import { ApiService } from '../api/api.service';
import { LoadingServiceService } from '../loading/loading-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private curUserSubject: BehaviorSubject<any>;
  private curUser: Observable<any>;
  public static readonly ACCOUNTS = 'accounts';
  public static readonly LOGIN = '/login';
  public static readonly REGISTER = '/register';
  public static readonly KEY = '_CoNn3t0Se(R3T';
  public static readonly ROLE = 'organization_manager';
  public static readonly ADMIN = 'admins';
  public static readonly APPROVEMENTS = 'approvements';
  public static readonly APPROVE = 'approve';
  public static readonly REJECT = 'reject';
  public static readonly PROJECT = 'project';
  public static readonly ORGANIZATION = 'organization';
  public static readonly CAMPAIGN = 'campaign';
  constructor(private loadingService:LoadingServiceService,private snackBar: SnackBarMessageComponent, private apiService: ApiService, private userRequest: UserLoginRequestAdapter, private userResponse: UserLoginResponseApdater, private registerRequest: RegisterAdapter) {

    this.curUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('USER_WEB')!)
    );
    this.curUser = this.curUserSubject.asObservable();
  }
  public get currentUserValue(): any {
    return this.curUserSubject.value;
  }

  public async login(isSaveUser: boolean, username: string, password: string) {
    const md5 = new Md5();
    
    let res: BaseResponse = await this.apiService.post(
      AuthServiceService.ACCOUNTS + AuthServiceService.LOGIN,
      this.userRequest.adapt({
        username: username,
        // password: password,
        password: md5.appendStr(password.concat(AuthServiceService.KEY)).end(),
      })
    );
    if (res.resultCode == 0) {
      this.loadingService.isLoading.next(false);
      this.snackBar.showMessage(`Đăng Nhập ${res.resultMessage}`,true);
      let userLoginResponse: UserLoginResponse =
        this.userResponse.adapt(res.data);
      localStorage.setItem('USER_WEB', JSON.stringify(userLoginResponse));

      localStorage.setItem('USER_TOKEN', userLoginResponse.token);
      this.curUserSubject.next(userLoginResponse);

    } else if (res.resultCode == 6) {
      this.loadingService.isLoading.next(false);
      this.snackBar.showMessage(res.resultMessage,false);
    }else {
      return null;
    }



    return res;
  }
  async register(data: any) {

    const md5 = new Md5();
    let res: BaseResponse = await this.apiService.post(AuthServiceService.ACCOUNTS + AuthServiceService.REGISTER, data
    );

    if (res.resultCode != 0) {
      return null;
    }

    return res;
  }

  logout() {
    localStorage.removeItem('USER_WEB');
    localStorage.removeItem('USER_TOKEN');
    this.curUserSubject.next(null);
  }

  async updateRequestByAdmin(data: any) {
    let res: BaseResponse = await this.apiService.post(AuthServiceService.ADMIN + '/' + AuthServiceService.APPROVEMENTS, data);
    if (res.resultCode != 0) {
      return null;
    }
    return res;
  }
}
