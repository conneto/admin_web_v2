import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


@Injectable()
export class CommonInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {


    return next.handle(request.clone({
      setHeaders: {
        [`Access-Control-Allow-Origin`]: '*',
        Authorization: `Bearer ${localStorage.getItem('USER_TOKEN') ? localStorage.getItem('USER_TOKEN') : ''}`,
      }
    })).pipe(
      retry(2), catchError((error: HttpErrorResponse) => {
        alert(error.message);
        return throwError(error);
      })
    );
  }
}
