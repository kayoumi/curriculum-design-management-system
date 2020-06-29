'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const {
    router,
    controller
  } = app;
  router.get('/', controller.home.index);
  router.post('/api/login', controller.login.login); // 用户登录
  router.get('/api/logintoken', controller.login.loginToken); // 登录鉴权信息
  
};