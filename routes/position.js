var express = require('express');
var router = express.Router();
var PositionController = require("../controllers/PositionController");

//配置文件上传
var multer = require('multer');
var storage = multer.diskStorage({
	//保存到磁盘的目标位置
  destination: function (req, file, cb) {
  	//将上传文件保存到public下的upload子目录中
    cb(null, './public/upload');
  },
  //配置保存文件的
  filename: function (req, file, cb) {
  	//fieldname字段名+当前日期+文件后缀名
    cb(null, file.fieldname + '-' + Date.now()+file.originalname.slice(file.originalname.lastIndexOf(".")));
  }
});
 //创建上传实例
var upload = multer({ storage: storage })

/* post 方式请求/add资源，添加职位. */
//实现文件上传
router.post('/add',upload.single("logo"),PositionController.add);//input-file-name:logo
//路由:查询职位
router.get('/list',PositionController.list);
//删除职位
router.get('/del',PositionController.del);

//修改职位信息
router.post('/update',upload.single("logo"),PositionController.update);

module.exports = router;
