const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 用户模式
const projectSchema = new Schema({
    name: String,
    path: String,

});


// 绑定模型
const Project = mongoose.model('Project', projectSchema);


// 导出模型
module.exports = Project;
