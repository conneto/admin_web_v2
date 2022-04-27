import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }


  public convertType(type: any): string {
    switch (type) {
      case 'donate':
      case 'donation':
        return 'Quyên góp';
      case 'participate':
        return 'Tham gia';
      case 'recruitment':
        return 'Tuyển TNV';
      default:
        return '';
    }
  }
}