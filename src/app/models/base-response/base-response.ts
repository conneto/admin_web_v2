
import { Injectable } from '@angular/core';
import { Adapter } from 'src/app/interface/adapter';

export class BaseResponse<T> {
    constructor(
        public status: number,
        public message: string,
        public data: T
    ) { }
}

@Injectable({
    providedIn: 'root',
})
export class BaseResponseAdapter implements Adapter<BaseResponse<Array<Object>>> {
    adapt(item: any): BaseResponse<Array<Object>> {

        return new BaseResponse(item.status, item.message, item.data);
    }
}
