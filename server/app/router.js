'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const jwt = app.middleware.jwt();
  router.get('/tickTips/getAll', jwt, controller.tickTips.getAll);
  // ctx.params.id;
  router.get('/tickTips/get/:id', jwt, controller.tickTips.get);
  router.get('/tickTips/addTip', jwt, controller.tickTips.addTip);
  // ctx.query.id;
  router.get('/tickTips/delete', jwt, controller.tickTips.delete);
  router.post('/tickTips/update', jwt, controller.tickTips.update);

  router.post('/user/register', controller.user.register);
  router.post('/user/login', controller.user.login);
};
