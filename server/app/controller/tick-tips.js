'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async getAll() {
    const { ctx } = this;
    // console.log(ctx.session.user);
    try {
      const result = await ctx.service.tips.getAll();
      ctx.body = ctx.helper.sucess(result);
    } catch (error) {
      ctx.body = ctx.helper.error(error);
    }
  }
  async get() {
    const { ctx } = this;
    const id = ctx.params.id;
    try {
      ctx.body = ctx.helper.notNull(id)
        ? ctx.helper.sucess(await ctx.service.tips.get(id))
        : ctx.helper.error('id not exist!');
    } catch (error) {
      ctx.body = ctx.helper.error(error);
    }
  }
  async delete() {
    const { ctx } = this;
    const id = ctx.query.id;
    try {
      ctx.body = ctx.helper.notNull(id)
        ? ctx.helper.sucess(await ctx.service.tips.delete(id))
        : ctx.helper.error('id not exist!');
    } catch (error) {
      ctx.body = ctx.helper.error(error);
    }
  }
  async update() {
    const { ctx } = this;
    const { id = '', info = '' } = ctx.request.body;
    try {
      ctx.body = ctx.helper.notNull(id)
        ? ctx.helper.sucess(await ctx.service.tips.update({ id, info }))
        : ctx.helper.error('id not exist!');
    } catch (error) {
      ctx.body = ctx.helper.error(error);
    }
  }
  async addTip() {
    const { ctx } = this;
    try {
      ctx.body = ctx.helper.sucess(await ctx.service.tips.addTip());
    } catch (error) {
      ctx.body = ctx.helper.error(error);
    }
  }
}

module.exports = HomeController;
