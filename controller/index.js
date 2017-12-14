const Project = require('../models/project.js');
const User = require('../models/user.js');

module.exports = {
	index: async (ctx, next) => {
		if (!ctx.session.username) {
			ctx.status = 303;
			ctx.redirect('/login');
		} else {
			console.log('to index page')
			const username = ctx.session.username;
			const projects = await Project.find({}, {name: 1, path: 1, _id: 0});
			const records = await User.findOne({username: username}).resource;
	
			ctx.body = await ctx.render('index', {
				username: username,
				projects: projects
			});
		}	

		next();
	},
	upload: async (ctx, next) => {

	}
}
