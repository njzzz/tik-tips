'use strict';
const Service = require('egg').Service;
class Tips extends Service {
  async register(userName, passWord) {
    const { generaterToken } = this.ctx.helper;
    try {
      const userCount = await this.app.mysql.get('user', { user_name: userName });
      const isUserExit = userCount && ('user_name' in userCount);
      if (isUserExit) {
        throw '用户名已存在！';
      }
      const userInfo = { user_name: userName, pass_word: passWord };
      // 生成token
      const token = generaterToken(userInfo);
      // 存入数据库
      await this.app.mysql.insert('user', { ...userInfo, token });
      return token;
    } catch (error) {
      throw error;
    }
  }
  async login(userName, passWord) {
    const { verifyToken, generaterToken } = this.ctx.helper;
    const userInfo = { user_name: userName, pass_word: passWord };
    const userCount = await this.app.mysql.get('user', userInfo);
    const isUserNotExit = !userCount || !('user_name' in userCount);
    if (isUserNotExit) {
      throw '用户名或密码错误！';
    }
    if (userCount.token) {
      const self = this;
      try {
        await verifyToken(userCount.token);
        return { token: userCount.token };
      } catch (error) {
        // token 过期
        if (error.name === 'TokenExpiredError') {
          const token = generaterToken(userInfo);
          await self.app.mysql.update('user', { token }, { where: userInfo });
          return { token };
        }
      }
    }
  }
}

module.exports = Tips;
