import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private fetchUri=environment.api_fetch;
  constructor() { }
  public isNewTab:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  public isLoading:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  public getApiGetLink:BehaviorSubject<string>=new BehaviorSubject<string>(this.fetchUri);
  public getOrganizationId:BehaviorSubject<string>=new BehaviorSubject<string>('');
  public projectId:BehaviorSubject<string>=new BehaviorSubject<string>('');
  public isSkeleton:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
}
