const Project = require('../models/project.js');
const User = require('../models/user.js');

module.exports = {
	admin: async (ctx, next) => {
		const username = ctx.session.username;
		if (!username || username !== 'super') {
			ctx.status = 303;
			ctx.redirect('/');
			
		} else {
			console.log('admin page');
			const users = await User.find({}, {password:0, resource: 0}, {salt: -1});
			// const projects = await User.find({});
			
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

			const res = await User.update({username: username}, {registered: false}).exec((err) => {
				if(err) {
					console.log(err);
				}
			});
			if(res) {
				// console.log(res);
				ctx.body = {
					code: 1
				};
			}
			
		} catch(e) {
			console.log(e);
			ctx.body = {
				code: 0,
				detail: '操作失败'
			}
		}

	}

}