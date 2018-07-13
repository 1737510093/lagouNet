const PositionModel = require("../model/positionModel");

const PositionController = {
	//添加职位信息
	add:function(req, res, next) {
		//获取请求中传递的职位信息
		//get:req.query;post:req.body
		const{position,company,time,type,area,salary}=req.body;
//		console.log("上传文件:"+req.file.filename);
		let logo="";
		if(req.file){//有文件上传
			logo="/upload/"+req.file.filename;
		}
		//调用模型中的保存数据的方法
		PositionModel.save({logo,position,company,time,type,area,salary},(data)=>{
			res.json({
				res_code:0,
				res_error:"",
				res_body:data
			});
		},(err)=>{
			//error回调函数
			res.json({
				res_code:-1,
				res_error:err,
				res_body:{}
				
			});
		});
		//success回调函数
		
		
//	  res.send('在控制器中添加职位信息');
//		res.json({logo,position,company,time,type,area,salary});
	},
	//查询职位
	list:function(req,res,next){
		//从请求中获取查询的页码
		const{pageIndex}=req.query;
		PositionModel.findByPage(pageIndex,(data)=>{
			//data中存放的是查询成功的数据
			res.json({
				res_code:0,
				res_error:"",
				res_body:data
			})
			
		},(err)=>{
			res.json({
				res_code:-1,
				res_error:err,
				res_body:{}
			})
		});
	},
	
	//查询指定删除职位信息
	del:function(req,res,next){
		//从请求中获取查询的职位id
		const{dataId}=req.query;
		PositionModel.deletePosition(dataId,(data)=>{
			res.json({
				res_code:0,
				res_error:"",
				res_body:data
			})
		},(err)=>{
			res.json({
				res_code:-1,
				res_error:err,
				res_body:{}
			})
		});
	},
	
	
	//修改职位信息
	update:function(req,res,next){
//		const{upId}=req.query;
		
		const info = {id,position,company,time,type,area,salary}=req.body;
//		console.log("上传文件:"+req.file.filename);
		let logo="";
		if(req.file){//有文件上传
			logo="/upload/"+req.file.filename;
			info ={id,logo,position,company,time,type,area,salary};
		}
		
		PositionModel.updatePosition(info,(data)=>{
			res.json({
				res_code:0,
				res_error:"",
				res_body:data
			})
		},(err)=>{
			res.json({
				res_code:-1,
				res_error:err,
				res_body:{}
			})
		});
	},
	
};
module.exports = PositionController;
