'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  async login() {
    const { ctx } = this
    const { id, password } = ctx.request.body

    console.log(id, password);
  
    // const time = ctx.session.time
    const table = 'User'
    try{
      const isExist = await ctx.service.mysql.findById(id, table)
      
      if(isExist == null || isExist.status === 0) {
        ctx.status = 200
        ctx.body = {
          success: 0,
          message: '账号不存在'
        }
      } else if(isExist.password !== password) {
        ctx.status = 200
        ctx.body = {
          success: 0,
          message: '密码错误'
        }
      } else {
        ctx.status = 200
        const token = await ctx.service.jsonwebtoken.signToken(id)
        ctx.session.userid = isExist.id
        ctx.body = {
          success: 1,
          data: {
            token,
            id: isExist.id,
            password: isExist.password,
            username: isExist.username
          }
        }
      }

    } catch(err) {
      ctx.status = 404
      console.log(err)
      ctx.body = {
        message: '登录失败'
      }
    }
  }

  async loginToken() {
    const { ctx } = this
    const time = Date.now()
    ctx.session.time = time
    ctx.body = {
      success: 1,
      message: time
    }
  }
}

module.exports = LoginController;
