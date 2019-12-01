'use strict';
// eslint-disable-next-line no-unused-vars
module.exports = (options, app) => {
  return async function userInterceptor(ctx, next) {
    const authToken = ctx.header.authorization; // 获取header里的authorization
    if (authToken) {
      const { verifyToken } = ctx.helper;
      try {
        const { user_name, pass_word } = await verifyToken(authToken);
        ctx.session.user = {
          userName: user_name,
          passWord: pass_word,
        };
        // const userInfo = { user_name: decoded.user_name, pass_word: decoded.pass_word};
        // const userCount = await app.mysql.get('user', userInfo);
        await next();
      } catch (error) {
        if (error.name === 'TokenExpiredError') {
          ctx.body = ctx.helper.error('登录状态已过期,请重新登陆');
        }
      }

    } else {
      ctx.body = ctx.helper.error('请登陆后再进行操作');
    }
    // await next();
    //   if (authToken) {
    //     authToken = authToken.substring(7)
    //     const res = verifyToken(authToken) // 解密获取的Token
    //     if (res.corpid && res.userid) {
    //       // 如果需要限制单端登陆或者使用过程中废止某个token，或者更改token的权限。也就是说，一旦 JWT 签发了，在到期之前就会始终有效
    //       // 此处使用redis进行保存
    //       const redis_token = await app.redis.get('loginToken').get(res.corpid + res.userid) // 获取保存的token
    //       if (authToken === redis_token) {
    //         ctx.locals.corpid = res.corpid
    //         ctx.locals.userid = res.userid
    //         await next()
    //       } else {
    //         ctx.body = { code: 50012, msg: '您的账号已在其他地方登录' }
    //       }
    //     } else {
    //       ctx.body = { code: 50012, msg: '登录状态已过期' }
    //     }
    //   } else {
    //     ctx.body = { code: 50008, msg: '请登陆后再进行操作' }
    //   }
  };
};
