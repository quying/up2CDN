const Project = require('../models/project.js');
const User = require('../models/user.js');
const fs = require('fs');
const ftp = require('ftp');
const path = require('path');
const URL = require('url');
// const crypto = require('crypto');
const log = console.log;

let client;

function rename (fileName) {
	const stamp = Date.now() + Math.random().toString(16).substr(2);
  	return fileName.replace(/(\w+)\.(\w)/, `$1_${stamp}.$2`);
}

function removeTemImage (path) {
  	fs.unlink(path, (err) => {
		if (err) {
			throw err
		}
  	})
}
function start(file) {
	client = new ftp();
	connect();
	
	client.on('ready', function() {
		log('---------连接cdn服务器成功----------');

		send(file);
	})
	client.on('error', function(e) {
		log('---------重新连接----------');
		connect();
	})
	client.on('end', function() {
		removeTemImage(file.path);
		log('---------断开连接----------');
	})
}

function connect() {
	const url = URL.parse('10.126.91.142');
	client.connect({
		host:  url.path,
		user: '58jr_chejinrong_static',
		password: 'ICBYRybhXAi',
		keepalive: 1000
	});
}

function send(file) {
	const rs = fs.createReadStream(file.path);
	const proPath = '/static/picTest/'
	const destpath = proPath + rename(file.name);
		

	client.put(rs, destpath, false, function(err) {
		if (err) {
			log('put error: ' + err);
		}
		log('upload:' + file.name);
		client.end();
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
			const records = await User.findOne({username: username}).resource;

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
		
		start(file);
	}
}
