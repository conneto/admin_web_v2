import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { TagPlaceholder } from '@angular/compiler/src/i18n/i18n_ast';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {

  BaseResponse,
  BaseResponseAdapter,
} from 'src/app/models/base-response/base-response';
import { Campaign } from 'src/app/models/campaign/campaign.model';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  corsHeaders: HttpHeaders;

  private fetchUri = environment.api_fetch;
  private postUri = environment.api_core;

  constructor(
    private http: HttpClient,
    private baseResponseAdapter: BaseResponseAdapter,

  ) {
    this.corsHeaders = new HttpHeaders();
    this.corsHeaders = this.corsHeaders.set('Access-Control-Allow-Origin', '*');
    this.corsHeaders = this.corsHeaders.set(
      'Access-Control-Allow-Methods',
      'GET,PUT,POST,DELETE'
    );
  }

  getFetchUri(api_name: string, params?: any) {
    let url = this.fetchUri + '/' + api_name;

    if (typeof params != 'undefined') {
      let array = [];
      for (let prop in params) {
        array.push(prop + '=' + params[prop]);
      }

      url += '?' + array.join('&');
    }

    return url;
  }

  getPostUri(api_name: string, params?: any) {
    let url = this.postUri + '/' + api_name;

    if (typeof params != 'undefined') {
      let array = [];
      for (let prop in params) {
        array.push(prop + '=' + params[prop]);
      }

      url += '?' + array.join('&');
    }

    return url;
  }
  public postByObservable(api_name: string, body?: any, params?: boolean): any {
    let api_uri = '';

    if (params) {
      api_uri = this.getPostUri(api_name, body);
    } else {
      api_uri = this.getPostUri(api_name);
    }
    return this.http.post<any>(api_uri, body).pipe(map((data: any) => {
      return this.baseResponseAdapter.adapt(data);
    }))
  }
  post(
    api_name: string,
    body?: any,
    params?: boolean,
    parse_json?: boolean
  ): any {
    let api_uri = '';

    if (params) {
      api_uri = this.getPostUri(api_name, body);
    } else {
      api_uri = this.getPostUri(api_name);
    }
    // console.log(localStorage.getItem('USER_TOKEN'));
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

    let api_uri = this.getFetchUri(api_name, params);
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
  public getByObservable(api_name: string, params?: any): Observable<BaseResponse<Campaign>> {
    let api_uri = this.getFetchUri(api_name, params);
    return this.http.get<BaseResponse<Campaign>>(api_uri).pipe(

      // map((data: any) => {
      //   console.log('Get By Observable:',data);
      //   return this.baseResponseAdapter.adapt(data);
      // }),


    );
  }
  delete(api_name: string, params?: any): any {
    let api_uri = this.getPostUri(api_name, params);
    if (localStorage.getItem('USER_TOKEN')) {
      this.corsHeaders = this.corsHeaders.set(
        'Authorization',
        `Bearer ${localStorage.getItem('USER_TOKEN')}`
      );
    }
    let options = {
      headers: this.corsHeaders,
    };
    return new Promise((resolve) => {
      console.log(api_uri, options);
      this.http.delete(api_uri, options).subscribe(
        (data) => {
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

  put(
    api_name: string,
    body?: any,
    params?: boolean,
    parse_json?: boolean
  ): any {
    let api_uri = '';

    if (params) {
      api_uri = this.getPostUri(api_name, body);
    } else {
      api_uri = this.getPostUri(api_name);
    }

    if (localStorage.getItem('USER_TOKEN')) {
      this.corsHeaders = this.corsHeaders.set(
        'Authorization',
        'Bearer ' + localStorage.getItem('USER_TOKEN')
      );
    }

    if (localStorage.getItem('USER_TOKEN')) {
      this.corsHeaders.set(
        'Authorization',
        'Bearer ' + localStorage.getItem('USER_TOKEN')
      );
    }

    let options = {
      headers: this.corsHeaders,
    };

    return new Promise((resolve) => {
      this.http.put(api_uri, body, options).subscribe(
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
  putByObservable(
    api_name: string,
    body?: any,
    params?: boolean,
    parse_json?: boolean
  ): any {
    let api_uri = '';

    if (params) {
      api_uri = this.getPostUri(api_name, body);
    } else {
      api_uri = this.getPostUri(api_name);
    }
    return this.http.put<any>(api_uri, body).pipe(map(data=>{
    return   this.baseResponseAdapter.adapt(data);
    }))
  }
}
