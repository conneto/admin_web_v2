import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingServiceService {

  constructor() { }
  public isLoading:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  public getApiGetLink:BehaviorSubject<string>=new BehaviorSubject<string>('');
}
