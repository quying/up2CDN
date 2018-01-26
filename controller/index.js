const Project = require('../models/project.js');
const User = require('../models/user.js');
const fs = require('fs');
const ftp = require('ftp');
const path = require('path');

const log = console.log;

let client;

function rename (fileName) {
	const stamp = Date.now() + Math.random().toString(16).substr(2);
  	return fileName.replace(/(.+)\.(\w)/, `${stamp}.$2`);
}

function removeTemImage (path) {
  	fs.unlink(path, (err) => {
		if (err) {
			throw err;
		}
  	})
}

function connect(project) {
	client.connect({
		host: project.server,
		user: project.username,
		password: project.password,
		keepalive: 1000
	});
}

module.exports = {
	index: async (ctx, next) => {
		if (!ctx.session.username) {
			ctx.status = 303;
			ctx.redirect('/login');
		} else {			
			const username = ctx.session.username;
			const projects = await Project.find({}, {projectname: 1}); 
			const user = await User.findOne({username: username});
			const records = user.resource;

			ctx.body = await ctx.render('index', {
				username: username,
				projects: projects,
				records: records
			});
		}	
	},
	upload: async (ctx, next) => {
		const fields = ctx.request.body.fields;
		const file = ctx.request.body.files.img;
		
		const username = ctx.session.username;
		const project = await Project.findById(fields.project, (err, doc) => {
			if(err) {
				log(err);
			}
		});
		
		client = new ftp();

		let body = await (() => {
			return new Promise((resolve, reject) => {
				client.on('ready', async () => {
					log('---------连接cdn服务器成功----------');
					//上传
					const rs = fs.createReadStream(file.path);
					
					const newName = rename(file.name);
					const destpath = project.path + newName;
					
					client.put(rs, destpath, false, (err) => {
						if (err) {
							log('upload error: ' + err);
							return resolve({
								code: 0,
								detail: '上传失败'
							});
						}
						log('upload:' + newName);
					
						// 存库
						const resUrl = project.prefix + project.path + newName;
						const resource = {
							filename: file.name,
						    time: new Date(),
						    url: resUrl
						}
						User.update({username: username}, { '$addToSet':{resource: resource} }, (err) => {
							if(err) {
								client.delete(destpath, () => {
									log('delete cdn\'s file.')
								})
								log('database error: ' + err);
								return resolve({
									code: 0,
									detail: '上传失败'
								});
							}
						});
						return resolve({
							code: 1,
							detail: ''
						});
					});
		
					client.end();
				});

				client.on('error', function(e) {
					log('---------重新连接----------');
					connect();
				});
				client.on('end', function() {
					
					log('---------断开连接----------');
				});

				connect(project);
				
			});
		})()

		ctx.body = body;
		removeTemImage(file.path);
	}
}
