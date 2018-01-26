const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 用户模式
const projectSchema = new Schema({
    projectname: String,	//项目名称
    server: String,			//server域名
    prefix: String,			//cdn路径
    path: String,			//目标路径
    username: String,		//ftp用户名
    password: String,		//密码
});


// 绑定模型
const Project = mongoose.model('Project', projectSchema);


// 导出模型
module.exports = Project;
