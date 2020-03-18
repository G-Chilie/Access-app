export const environment = {
  production: true,
   // http://gtweb6.gtbank.com/WEBAPIs/PubEncrypt4/GTBAdminUserService/api/Staff/GetStaffWithPicture
   BASE_URL: 'http://gtmt.gtbank.com',
   BASE_URL_APPS: 'http://gtmt.gtbank.com',
   ADMIN_SERVICE: '/GTBAdminUserService_Pilot/api',
   APPS_API: '/Login/AccessManagerLogin',
   UPDATEUSERSEC_API: '/Login/AccessManagerLogin ',
   USERPIC: '/Staff/GetStaffWithPicture',
   RESETBASISPASS: '/AdminUser/ResetBasisPassword',
   KILLMYID: '/AdminUser/ManageBasisProfile',
   ENC_API: '/Auth/DataEncryption',
   VAL_TOKEN: '/Login/ValidateAdminUserToken',
   BASISACCESE: '/AdminUser/BasisAccess',
   Channel: 'AccessManager',
   RandomPrefix: '1011',
   // tslint:disable-next-line: max-line-length
   PUB_AM_ENC_KEY: `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQChzcpFuq/fndmSbjmaNPOSzpSQ
   ACihAzDMMqQb5De3SR6ZQoTct6OavkWshGLIWZP/5BICF0wuNMvf5Hkae9j/P/a2
   7QGl3Q629mriTfKZky+5i+oXHEmKgTJXssEBxAvXkSwudFogqm9wLtLLDZaZjdao
   Wd2FhKrJr9aE1Je5pwIDAQAB`
};
