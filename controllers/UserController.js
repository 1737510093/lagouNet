/* 用户相关的控制器 */
// 引入用户模型模块
const UserModel = require("../model/userModel");

const UserController = {
	//用户登录
	login : function(req,res,next){
		//获取登录的用户名和密码
		const{username,password}=req.body;
		UserModel.find({username,password},(data)=>{
			if(data.length===1){//登录成功
				//登录成功在session中记录登录成功的用户名
				req.session.loginUser = data[0].username;
				res.json({
					res_code:0,
					res_error:"",
					res_body:{username:data[0].username,email:data[0].email}
				})
			}else{//登录失败
				res.json({
					res_code:-2,
					res_error:"用户名或密码错误",
					res_body:{}
				})
			}
		},(err)=>{
			res.json({
				res_code:-1,
				res_error:err,
				res_body:{}
			})
		})
	},
//退出
	logout:function(req,res,next){
		req.session=null;
		res.json({
			res_code:0,
			res_error:"",
			res_body:{}
		})
	},

	//判断用户是否登录
	checkLogin:function(req,res,next){
		//从session中获取登录用户信息
		var user = req.session.loginUser;
		if(user){
			res.json({
				res_code:0,
				res_error:"",
				res_body:{username:user}
			})
		}else{
			res.json({
				res_code:-1,
				res_error:"用户登录失效",
				res_body:{}
			});
		}
	},

	// 用户注册方法
	register : function(req, res, next){
		/*// 获取 get 请求传递的参数
		const {username, password, email} = req.query;*/
		// 获取 post 请求传递的参数
		const {username, password, email} = req.body;
		// 将数据保存到数据库
		UserModel.save({username, password, email}, (msg)=>{
			res.json({
				res_code : 0,
				res_error : "",
				res_body : msg
			});
		}, (err)=>{
			res.json({
				res_code : -1,
				res_error : err,
				res_body : {}
			});
		});
	},

	check : function(){}
};

// 导出用户控制器
module.exports = UserController;