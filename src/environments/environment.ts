// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // http://gtweb6.gtbank.com/WEBAPIs/PubEncrypt4/GTBAdminUserService/api/Staff/GetStaffWithPicture
  BASE_URL: 'http://gtweb6.gtbank.com/WEBAPIs/PubEncrypt4',
  BASE_URL_APPS: 'http://gtweb.gtbank.com',
  ADMIN_SERVICE: '/GTBAdminUserService/api',
  APPS_API: '/Login/AccessManagerLogin',
  UPDATEUSERSEC_API: '/Login/AccessManagerLogin ',
  USERPIC: '/Staff/GetStaffWithPicture',
  RESETBASISPASS: '/Login/ResetBasisPassword',
  KILLMYID: '/Login/ManageBasisProfile',
  ENC_API: '/Auth/DataEncryption',
  Channel: 'Access Manager',
  RandomPrefix: '1011',
  // tslint:disable-next-line: max-line-length
  PUB_AM_ENC_KEY: `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCRA67mG4zCbKULFvEyn0UafxPNOO42qk3U0Qg2WOTp6l0EOz9ZiHW4fDMHrOcIlPIvwOjkHWpI1VSi1H/I6zbgkDwRGu/OYQ2Eih9YeYwL9DcmbNoe8uXTIwVLtWS7OW/wtLQz+vup/vHTeIWPs0Y+LDcO7BcOGLli53GwqZC+3QIDAQAB`
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
