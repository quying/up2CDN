const User = require('../models/user.js');

const crypto = require('crypto');

module.exports = {
	login: async (ctx, next) => {
		// if(ctx.session.username) {
		// 	ctx.status = 303;
		// 	ctx.redirect('/');
		// } else {
			ctx.body = await ctx.render('login');
		// }	

		next();
	},
	register: async (ctx, next) => {
		ctx.body = await ctx.render('register');

		next();
	},
	loginHandler: async (ctx, next) => {
		const body = ctx.request.body;
		const username = body.oaName;
		let password = body.password;

		const md5 = crypto.createHash('md5');
		try {
			const user = await User.findOne({username: username});
			if(!user) {
				ctx.body = {
					code: 0,
					detail: '登录失败，用户不存在'
				};
				return;
			}
			if(!user.registered) {
				ctx.body = {
					code: 0,
					detail: '未验证，请联系管理员通过注册申请'
				};
				return;
			}

			password = md5.update(`${password}:${user.salt}`, 'utf8').digest('base64');

			if(password === user.password) {
				ctx.session.username = username;
				ctx.body = {
					code: 1
				}
			} else {
				ctx.body = {
					code: 0,
					detail: '密码错误'
				};
			}
		} catch(e) {
			
			console.log(e);
		}
		next();
	},
	registerHandler: async (ctx, next) => {
		try {
			const body = ctx.request.body;
			const user = {
				username: body.oaName,
				password: body.password
			}
			const md5 = crypto.createHash('md5');
			user.salt = new Date();			//md5 salt
			user.password = md5.update(`${user.password}:${user.salt}`, 'utf8').digest('base64'); //md5加盐加密

			const hasUser = await User.find({username: user.username});
			if(hasUser.length === 0) {
				if(user.username==='super') {
					user.registered = true;
				}
				await User.create(user);
				console.log(`User ${user.username} has create!`)
				ctx.body = {
					code: 1,
					detail: ''
				}
			} else {
				ctx.body = {
					code: 0,
					detail: '用户名已注册'
				};
			}
		} catch(e) {
			console.log(e);
			ctx.body = {
				code: 0,
				detail: '注册失败'
			}
		}
		next();
	}
}

