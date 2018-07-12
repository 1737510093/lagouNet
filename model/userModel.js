/* 用户相关的模型(主要处理数据库中的CRUD操作) */

// 引入 mongoose 模块
const mongoose = require("mongoose");
// 连接 "position_project" 数据库
mongoose.connect("mongodb://localhost:27017/symbol");
//用户schema
const schema = mongoose.Schema({
	username : String,
	password : String,
	email : String
});
//创建集合
const User = mongoose.model("user",schema);

//保存用户数据
const UserModel = {
	// 保存用户信息
	save : function(userinfo, success, error) {
		/* 将 userinfo 的用户信息保存到数据库中 */
		// 根据数据库文档模型创建当前待保存的用户文档
		const user = new User(userinfo);
		// 调用 save() 方法保存到数据库
		user.save((err, userinfo)=>{
			if (err){ // 如果有错误，则回调 error() 函数
				error(err);
				return;
			}
			// 保存成功，回调success()函数
			success(userinfo);
		});
	},
	// 查询用户信息
	find : function(userinfo,success,error) {
		User.find(userinfo).then(success,error)
	}
}

module.exports = UserModel;