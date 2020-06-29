'use strict';

const Service = require('egg').Service;

class MysqlService extends Service {
  // 插入数据
  async create(params, table) {
    const { ctx } = this
    const result = await ctx.model[table].create(params)
    return result
  }
  // 按条件查询
  async findAll(params, table) {
    const { ctx } = this
    const result = await ctx.model[table].findAll(params)
    return result
  }
  // 通过 id 查询数据
  async findById(params, table) {
    const result = await this.ctx.model[table].findByPk(params)
    return result
  }
}

module.exports = MysqlService;
