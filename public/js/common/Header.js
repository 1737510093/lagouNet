//构造函数
function Header(){
	this.createDom();
	this.createLoginModal();
	this.createRegisterModal();
	this.checkLogin();
	this.addListener()
}

//头部布局结构模板
Header.template=`
		<nav class="navbar navbar-default navbar-inverse ">
			<div class="container-fluid">
			    <div class="navbar-header">
			    	<!--响应式布局导航条-->
			    	<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
				        <span class="sr-only">Toggle navigation</span>
				        <span class="icon-bar"></span>
				        <span class="icon-bar"></span>
				        <span class="icon-bar"></span>
				    </button>
			      <a class="navbar-brand" href="#">拉勾网管理系统</a>
			      
			    </div>
	
			    <div class="collapse navbar-collapse" id="position-nav">
			      <ul class="nav navbar-nav">
			        <li class="active"><a href="/">首页 <span class="sr-only">(current)</span></a></li>
			        <li><a href="/html/position.html" target="_blank">职位管理</a></li> 
			      </ul>
			      <ul class="nav navbar-nav navbar-right">
			        <li data-toggle="modal" data-target="#myLogin"><a href="#">登录</a></li>
			        <li data-toggle="modal" data-target="#regModal"><a href="#">注册</a></li>
			      </ul>
			      <ul class="nav navbar-nav navbar-right hide login_success">
			        <li><a href="#">欢迎你:</a></li>
			        <li><a href="#" class="logout_link">退出</a></li>
			      </ul>
			    </div>
			</div>
		</nav>`;


$.extend(Header.prototype,{
	//创建头部dom结构
	createDom:function(){
		$(Header.template).appendTo(".header");
	},
	//创建登录模态框
	createLoginModal:function(){
		new LoginModal();
	},
	//创建注册模态框
	createRegisterModal:function(){
		new RegisterModal();
	},
	
	//退出
	addListener:function(){
		$(".logout_link").on("click",this.handleLogout);
	},
	handleLogout:function(){
		$.get("/api/users/logout",function(){
			location.reload();
		});
		
	},
	
	
	//判断是否有用户登录
	checkLogin:function(){
		$.get("/api/users/check",function(data){
			if(data.res_code===0){
				$(".login_success").removeClass("hide").prev("ul").hide();
				$(".login_success a:first").text("欢迎你："+data.res_body.username);
			}
		},"json")
	}
});