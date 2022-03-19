import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseResponse, BaseResponseAdapter } from 'src/app/models/base-response/base-response';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  corsHeaders: HttpHeaders;
  private uri = "https://955d-14-187-37-7.ngrok.io/fetch_data/api/v1";
  constructor(private http: HttpClient, private baseResponseAdapter: BaseResponseAdapter) {
    this.corsHeaders = new HttpHeaders();
    this.corsHeaders = this.corsHeaders.set('Access-Control-Allow-Origin', '*');
  }
  getFullUri(api_name: string, params: any) {
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
  get(api_name: string, params?: any): any {
    let api_uri = this.getFullUri(api_name, params);
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

