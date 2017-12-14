const home = require('../controller/index.js');
const login = require('../controller/login.js');
const admin = require('../controller/admin.js');
const koaBody = require('koa-body');


module.exports = function (router) {
	router.get('/', home.index);
	
	router.get('/login', login.login);
	router.post('/login/submit', koaBody(), login.loginHandler);

	router.get('/register', login.register);
	router.post('/register/submit', koaBody(), login.registerHandler);

	router.get('/admin', admin.admin);
	router.post('/admin/user', admin.userManage);
}