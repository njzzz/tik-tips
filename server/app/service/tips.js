'use strict';
const Service = require('egg').Service;

class Tips extends Service {
  async getAll() {
    const { app, ctx } = this;
    try {
      const result = await app.mysql.select('tips', {
        where: { user_name: ctx.session.user.userName },

      });
      return result;
    } catch (error) {
      throw error;
    }
  }
  async get(id) {
    const { app, ctx } = this;
    try {
      const result = await app.mysql.get('tips', {
        where: { id, user_name: ctx.session.user.userName },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
  async delete(id) {
    const { app, ctx } = this;
    try {
      await app.mysql.delete('tips', { id, user_name: ctx.session.user.userName });
      return true;
    } catch (error) {
      throw error;
    }
  }
  async update(data) {
    const { app, ctx } = this;
    const row = {
      info: data.info,
      status: data.status || 0,
    };
    try {
      await app.mysql.update('tips', row, {
        where: { id: data.id, user_name: ctx.session.user.userName },
      });
      return true;
    } catch (error) {
      throw error;
    }
  }
  async addTip() {
    const { app, ctx } = this;
    try {
      await app.mysql.insert('tips', { status: 0, info: '点击编辑，修改内容', user_name: ctx.session.user.userName });
      return true;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Tips;
