const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resourceSchema = new Schema({
    filename: String,   //原文件名
    time: Date,         //上传时间
    url: String         //访问路径
})
// 用户模式
const userSchema = new Schema({
    username: String,
    password: String,
    salt: String,
    registered: {       //是否通过注册
    	type: Boolean,
    	default: false
    },
    resource: [resourceSchema]
});


// 绑定模型
const User = mongoose.model('User', userSchema);


// 导出模型
module.exports = User;
