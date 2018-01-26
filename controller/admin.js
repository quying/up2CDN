const Project = require('../models/project.js');
const User = require('../models/user.js');

const log = console.log;

module.exports = {
	admin: async (ctx, next) => {
		const username = ctx.session.username;
		if (!username || username !== 'super') {
			ctx.status = 303;
			ctx.redirect('/');
			
		} else {
			log('admin page');
			const users = await User.find({}, {password:0, resource: 0}, {salt: -1});
			
			ctx.body = await ctx.render('admin', {
				username: username,
				users: users
			});
		}	

	},
	userManage: async (ctx, next) => {
		try {
			const body = ctx.request.body;
			const username = body.oaName;
			
			const user = await User.findOne({username: username});
			if(user) {
				user.registered = true;
				user.save();
				ctx.body = {
					code: 1
				};
			} else {
				ctx.body = {
					code: 0,
					detail: '操作失败'
				}
			}			
		} catch(e) {
			log(e);
			ctx.body = {
				code: 0,
				detail: '操作失败'
			}
		}
	}
}

