const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resourceSchema = new Schema({
    filename: String,
    time: Date,
    url: String
})
// 用户模式
const userSchema = new Schema({
    username: String,
    password: String,
    salt: String,
    registered: {
    	type: Boolean,
    	default: false
    },
    resource: [resourceSchema]
});


// 绑定模型
const User = mongoose.model('User', userSchema);


// 导出模型
module.exports = User;
