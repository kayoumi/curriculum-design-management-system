'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx, app } = this;
    // ctx.body = 'hi, egg';

    const params = {
      include: [
        { model: app.model.UserInfo }
      ]
    }

    const data = await ctx.model.User.findAll(params);
    // console.log(data)
    ctx.body = {
      data
    }
  }
}

module.exports = HomeController;
