import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BaseResponse, BaseResponseAdapter } from 'src/app/models/base-response/base-response';
import { Organization } from 'src/app/models/organization/organization';
import { LoadingServiceService } from '../loading/loading-service.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  corsHeaders: HttpHeaders;

  private uri = "http://f747-123-20-22-176.ngrok.io/fetch_data/api/v1";
  private postUri = 'http://3698-123-20-22-176.ngrok.io/core/api/v1';
  constructor(private http: HttpClient, private baseResponseAdapter: BaseResponseAdapter,public loadingService:LoadingServiceService) {
    this.corsHeaders = new HttpHeaders();
    this.corsHeaders = this.corsHeaders.set('Access-Control-Allow-Origin', '*');
  }

  // getOrg():Observable<Organization[]>{
  //   return this.http.get<Organization[]>(this.uri+'/organizations').pipe(
  //     tap(data=>console.log(data)),catchError(error=>of([]))

  //   )
  // }
  getFullUri(api_name: string, params?: any) {
    let url = this.uri + '/' + api_name;


    if (typeof params != 'undefined') {
      let array = [];
      for (let prop in params) {
        array.push(prop + '=' + params[prop]);
      }

      url += '?' + array.join('&');
    }

    return url
  }
  getFullUriPost(api_name: string, params?: any) {
    let url = this.postUri + '/' + api_name;


    if (typeof params != 'undefined') {
      let array = [];
      for (let prop in params) {
        array.push(prop + '=' + params[prop]);
      }

      url += '?' + array.join('&');
    }

    return url
  }
  post(
    api_name: string,
    body?: any,
    params?: boolean,
    parse_json?: boolean
  ): any {
    let api_uri = '';
    console.log(body);
    if (params) {
      api_uri = this.getFullUriPost(api_name, body);
    } else {
      api_uri = this.getFullUriPost(api_name);
    }

    if (localStorage.getItem('USER_TOKEN')) {
      this.corsHeaders = this.corsHeaders.set(
        'Authorization',
        'Bearer ' + localStorage.getItem('USER_TOKEN')
      );
    }

    let options = {
      headers: this.corsHeaders,
    };

    return new Promise((resolve) => {
      this.http.post(api_uri, body, options).subscribe(
        (data) => {
          console.log(data);
          resolve(this.baseResponseAdapter.adapt(data));
        },
        (err) => {
          console.log(err);
          switch (err.status) {
            case 0:
              break;
            case 404:
              break;
            default:
              break;
          }
          err.status = 99;
          resolve(err);
        }
      );
    });
  }
  get(api_name: string, params?: any): any {
    this.loadingService.getApiGetLink.next(this.uri);
    let api_uri = this.getFullUri(api_name, params);
    if (localStorage.getItem('USER_TOKEN')) {
      this.corsHeaders = this.corsHeaders.set('Authorization', 'Bearer ' + localStorage.getItem('USER_TOKEN'));

    }
    let options = {
      headers: this.corsHeaders,
    };

    return new Promise((resolve) => {
      this.http.get(api_uri, options).subscribe(
        (data) => {
          console.log(data);
          resolve(this.baseResponseAdapter.adapt(data));
        },
        (err) => {
          console.log(err);
          switch (err.status) {
            case 0:
              break;
            case 404:
              break;
            default:
              break;
          }
          err.status = 99;
          resolve(err);
        }
      );
    });
  }
}

