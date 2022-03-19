
import { Injectable } from '@angular/core';
import { Adapter } from 'src/app/interface/adapter';

export class BaseResponse {
    constructor(
        public resultCode: number,
        public resultMessage: string,
        public data?: any
    ) { }
}

@Injectable({
    providedIn: 'root',
})
export class BaseResponseAdapter implements Adapter<BaseResponse> {
    adapt(item: any): BaseResponse {

        return new BaseResponse(item.status, item.message, item.data);
    }
}
