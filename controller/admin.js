const Project = require('../models/project.js');
const User = require('../models/user.js');

module.exports = {
	admin: async (ctx, next) => {
		const username = ctx.session.username;
		if (!username || username !== 'super') {
			ctx.status = 303;
			ctx.redirect('/login');
			
		} else {
			
			const users = await User.find({});
			const projects = await User.find({});
			
			ctx.body = await ctx.render('index', {
				username: username,
				users: users
			});
		}	

		next();
	},
	userManage: async (ctx, next) => {

	}

}