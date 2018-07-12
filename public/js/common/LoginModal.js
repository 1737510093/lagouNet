function LoginModal(){
	this.createDom();
	this.addListener();
	
}

//登录模态框渲染
LoginModal.template=`<div class="modal fade" id="myLogin" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		  <div class="modal-dialog" role="document">
		    <div class="modal-content">
		      <div class="modal-header">
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		        <h4 class="modal-title" id="myModalLabel">登录</h4>
		      </div>
		      <div class="modal-body">
		      	<div class="alert alert-danger login_error hide" style="width:100%" role="alert">
		      		用户名或密码错误，请重新登录
		      	</div>
		        <form class="login_form">
				  <div class="form-group">
				    <label for="login_username">用户名</label>
				    <input type="text" class="form-control" name="username" id="login_username" placeholder="Email">
				  </div>
				  <div class="form-group">
				    <label for="login_pwd">密码</label>
				    <input type="password" class="form-control" name="password" id="login_pwd" placeholder="Password">
				  </div>
				  
				</form>
		      </div>
		      <div class="modal-footer">
		        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
		        <button type="button" class="btn btn-primary btn-login">登录</button>
		      </div>
		    </div>
		  </div>
		</div>`;
		
//原型继承
$.extend(LoginModal.prototype,{
	//创建你dom元素
	createDom:function(){
		$(LoginModal.template).appendTo("body");
	},
	//添加事件监听
	addListener:function(){
		$(".btn-login").on("click",this.handleLogin);
	},
	//处理登录
	handleLogin:function(){
		$.post("/api/users/login",$(".login_form").serialize(),function(data){
			if(data.res_code===0){//登录成功	
				$(".login_success").removeClass("hide").prev("ul").hide();
				$(".login_success a:first").text("欢迎你："+data.res_body.username);
				$("#myLogin").modal("hide");
			}else{
				$(".login_error").removeClass("hide");
			}
		},"json")
	}
})
