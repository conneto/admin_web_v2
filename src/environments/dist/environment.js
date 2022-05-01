"use strict";
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
exports.__esModule = true;
exports.category = exports.environment = void 0;
exports.environment = {
    production: false,
    api_core: 'http://conneto.org:5000/core/api/v1',
    api_fetch: 'http://conneto.org:5001/fetch_data/api/v1'
};
exports.category = [
    {
        name: 'covid19',
        vietsub: 'Covid-19'
    },
    {
        name: 'children',
        vietsub: 'Trẻ em'
    },
    {
        name: 'woman',
        vietsub: 'Phụ nữ'
    },
    {
        name: 'environment',
        vietsub: 'Môi trường'
    },
    {
        name: 'student',
        vietsub: 'Học sinh'
    },
    {
        name: 'animal',
        vietsub: 'Động vật'
    },
    {
        name: 'disability',
        vietsub: 'Khuyết tật'
    },
    {
        name: 'education',
        vietsub: 'Giáo dục'
    },
    {
        name: 'community',
        vietsub: 'Cộng đồng'
    },
    {
        name: 'social',
        vietsub: 'Xã hội'
    },
    {
        name: 'oldster',
        vietsub: 'Người già'
    }
];
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
