const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 用户模式
const projectSchema = new Schema({
    projectname: String,
    server: String,
    prefix: String,
    path: String,
    username: String,
    password: String,
});


// 绑定模型
const Project = mongoose.model('Project', projectSchema);


// 导出模型
module.exports = Project;
