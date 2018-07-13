//引入mongose模块
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/symbol");

//保存职位时集合结构
const schema = mongoose.Schema({
	
	logo:String,
	position:String,
	company:String,
	time:String,
	type:String,
	area:String,
	salary:Number
});
//生成数据库中创建文档的模型
const Position=mongoose.model("position",schema);


const PositionModel = {
	//保存职位数据到数据库
	save:function(positionInfo,success,error){
		const pos = new Position(positionInfo);
		// 调用 save() 方法保存到数据库
		pos.save((err,data)=>{
			if (err){ // 如果有错误，则回调 error() 函数
				error(err);
				return;
			}
			// 保存成功，回调success()函数
			success(data);
		});
	},
	//按页查询
	findByPage:function(pageIndex,success,error){
		//pageSize中保存每页显示文档数量
		const pageSize = 5;
		//query=model.find
		Position.find()
			.limit(pageSize)
			.skip((pageIndex-1)*pageSize)
			.then(success,error);
	},
	
	//删除所在行数据按id删除
	deletePosition:function(dataId,success,error){
		Position.findByIdAndDelete(dataId)
					.then(success,error);
		
	},
	//获取数据，修改
	updatePosition:function(positionInfo,success,error){
//		const pos = new Position(positionInfo);
		//查找源数据  //{_id:id}
		Position.update({_id:positionInfo.id},{$set:positionInfo},(err,data)=>{
			if(err){
				error(err);
				return
			}
			success(data);
		});
		// 调用 findByIdAndUpdate() 方法保存到数据库
//		pos.findByIdAndUpdate(upId,positionInfo).then(success,error);
	}
	
}
module.exports = PositionModel;
