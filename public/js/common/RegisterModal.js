function RegisterModal(){
	this.createDom();
	this.addListener()
}

RegisterModal.template = `<div class="modal fade" id="regModal">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
	        <h4 class="modal-title" id="regModalLabel">用户注册</h4>
	      </div>
	      <div class="modal-body">
	      	<div class="alert alert-danger hide reg_error" role="alert">用户注册失败，请稍后重试...</div>
	        <form class="register_form">
			  <div class="form-group">
			    <label for="regUsername">用户名</label>
			    <input type="text" class="form-control" name="username" id="regUsername" placeholder="请输入用户名">
			  </div>
			  <div class="form-group">
			    <label for="regPassword">密码</label>
			    <input type="password" class="form-control" name="password" id="regPassword" placeholder="请输入密码">
			  </div>
			  <div class="form-group">
			    <label for="regConfPassword">确认密码</label>
			    <input type="password" class="form-control" id="regConfPassword" placeholder="请再次输入密码">
			  </div>
			  <div class="form-group">
			    <label for="regEmail">邮箱</label>
			    <input type="text" class="form-control" name="email" id="regEmail" placeholder="请输入电子邮箱">
			  </div>
			</form>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
	        <button type="button" class="btn btn-primary" id="btn_register">注册</button>
	      </div>
	    </div>
	  </div>
	</div>`;

$.extend(RegisterModal.prototype, {
	// 创建DOM元素
	createDom : function() {
		$(RegisterModal.template).appendTo("body");
	},
	// 注册事件监听
	addListener : function() {
		// 用户注册
		$("#btn_register").on("click",this.handleRegister)
	},
	// 处理用户注册的事件方法
	handleRegister : function(){
		// 异步 ajax 将注册用户信息保存到服务器
		$.post("/api/users/register", $(".register_form").serialize(), function(data){

			if (data.res_code === 0) { // 成功
				$("#regModal").modal("hide");
				
			} else {
				$(".reg_error").removeClass("hide");
			}
		}, "json");
	}
});