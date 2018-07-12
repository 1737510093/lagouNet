var express = require('express');
var router = express.Router();
var UserController = require("../controllers/UserController");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//用户是否登录路由
router.get("/check",UserController.checkLogin);



//实现用户登录路由
router.post("/login", UserController.login);
//退出路由
router.get("/logout",UserController.logout);

// 用户注册路由，使用控制器中的 register 方法
router.post("/register", UserController.register);




module.exports = router;
