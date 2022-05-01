import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor() {}

  public convertType(type: any): string {
    switch (type) {
      case 'ngo':
        return 'Tổ chức phi chính phủ';
      case 'npo':
        return 'Tổ chức phi lợi nhuận';
      case 'donate':
      case 'donation':
        return 'Quyên góp';
      case 'participate':
        return 'Tham gia';
      case 'recruitment':
        return 'Tuyển TNV';
      case 'volunteer':
        return 'Tình nguyện viên';
      case 'organization_manager':
        return 'Quản lý tổ chức';
        case 'male':
          return 'Nam';
          case 'female':
            return 'Nữ';
      default:
        return '';
    }
  }
}
