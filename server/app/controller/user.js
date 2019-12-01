'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async register() {
    const { ctx } = this;
    const { userName = '', passWord = '' } = ctx.request.body;
    try {
      ctx.body = ctx.helper.notNull(userName, passWord)
        ? ctx.helper.sucess(await ctx.service.user.register(userName, passWord))
        : ctx.helper.error('username or password is not exist!');
    } catch (error) {
      ctx.body = ctx.helper.error(error);
    }
  }
  async login() {
    const { ctx } = this;
    const { userName = '', passWord = '' } = ctx.request.body;
    try {
      ctx.body = ctx.helper.notNull(userName, passWord)
        ? ctx.helper.sucess(await ctx.service.user.login(userName, passWord))
        : ctx.helper.error('username or password is not exist!');
    } catch (error) {
      console.log(error);
      ctx.body = ctx.helper.error(error);
    }
  }

}

module.exports = HomeController;
