import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingServiceService {

  constructor() { }
  public isNewTab:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  public isLoading:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  public getApiGetLink:BehaviorSubject<string>=new BehaviorSubject<string>('');
  public getOrganizationId:BehaviorSubject<string>=new BehaviorSubject<string>('');
  public projectId:BehaviorSubject<string>=new BehaviorSubject<string>('');
  public isSkeleton:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
}
 