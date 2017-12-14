// const logger = require('koa-logger');
const config = require('./config');

module.exports = function(app, mongoose) {
	switch(app.env) {
		case 'development':
            mongoose.Promise = global.Promise;
            mongoose.connect(config.mongo.development.connectionString, config.mongo.options);
            break;
        case 'production':
            mongoose.Promise = global.Promise;
            mongoose.connect(config.mongo.production.connectionString, config.mongo.options);
            break;
        default:
            throw new Error(app.env + '是不被连接数据库的执行环境'); 
	}
	
}