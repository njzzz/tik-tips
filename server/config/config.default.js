/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1572837766817_4927';

  // add your middleware config here
  config.middleware = [ 'jwt' ];
  config.jwt = {
    enable: true,
    ignore: [ '/user/register', '/user/login' ], // 哪些请求不需要认证
  };
  config.mysql = {
    client: {
      host: '127.0.0.1',
      port: '3306',
      user: 'root',
      password: '123456',
      database: 'tik_tips',
    },
  };
  config.security = {
    domainWhiteList: [ 'http://localhost:3000' ], // 没有配置的话，错误信息：404
    csrf: {
      enable: false, // 暂时禁用掉 csrf，错误信息：403 missing csrf token
    },
  };


  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };
  // {app_root}/config/config.default.js
  // exports.cors = {
  //   origin: '*',
  //   allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  // };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
