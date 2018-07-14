function Position(){
	this.loadHeader();
	this.addListener();
	this.check();
	
}

$.extend(Position.prototype,{
	//判断用户是否登录，若未登录就跳到首页
	check:function(){
		const that =this;
		$.get("/api/users/check",function(data){
			if(data.res_code===-1){//用户未登录
				location="/index.html"
			}else{
				//默认查询职业数据第一页
				that.listByPage(1);
			}
		},"json")
	},
	
	loadHeader:function(){
		new Header();
		$("#position-nav ul:first li:last").addClass("active").siblings().removeClass("active");
	},
	//注册事件监听
	addListener:function(){
		//添加职位
		$(".btn_add_pos").on("click", $.proxy(this.handleAddPosition,this));
		const that = this;
		
		//点击页码查询该页信息
		$(".pagination").delegate(".li","click",function(){
			//获取当前点击的页码
			const currentPage = $(this).find("a").text();
			//调用listByPage()查询
			that.listByPage(currentPage);
			//激活效果
			$(this).addClass("active").siblings().removeClass("active");
		});
		
		//处理删除职位的方法
		$(".pos_tab").delegate(".del","click",function(){
			//获取当前删除行的数据id
			const dataId = $(this).parents("tr").attr("data-id");
			that.deleteById(dataId)
		});
		
		//获取要修改的职位信息
		$(".pos_tab").delegate(".update","click",function(){
			$("#updatePosLogo").attr("accept",$(this).parents("tr").find("img").attr("src"));
			$("#updatePosName").val($(this).parents("tr").find(".position").text());
			$("#updatePosCompany").val($(this).parents("tr").find(".company").text());
			$("#updatePosTime").val($(this).parents("tr").find(".time").text());
			$("#updatePosType").val($(this).parents("tr").find(".type").text());
			$("#updatePosArea").val($(this).parents("tr").find(".area").text());
			$("#updatePosSalary").val($(this).parents("tr").find(".salary").text());
			const upId = $(this).parents("tr").attr("data-id");
			$("#ID").val(upId);
			
		});
		//点击修改保存
		$(".btn_update_pos").on("click",$.proxy(this.updateById,this));
		
		//前后翻页
		let currentPage = 1;
		const points = $(".li");
		
//		console.log(points);
		$("#prev").click(function(){
			currentPage-=1;
			if(currentPage<1){
				currentPage=1
			}
			$(points[currentPage-1]).addClass("active").siblings().removeClass("active");
			that.listByPage(currentPage);
			
		})
			
		
		$("#next").click(function(){
			currentPage+=1;
			if(currentPage>5){
				currentPage=5
			}
			$(points[currentPage-1]).addClass("active").siblings().removeClass("active");
			that.listByPage(currentPage);
		})
		
	},

	
	//处理添加职位的方法
	handleAddPosition:function(){
		var formData = new FormData($(".add_pos_form").get(0));//获取表单dom元素
		const that =this;
		//利用ajax向服务器传递数据，包括图像资源
		$.ajax({
			type:"post",
			url:"/api/position/add",
			data:formData,//向服务器传递的数据
			processData:false ,//不需要将data转换为查询字符串
			contentType:false,//不设置content-type请求头
			dataType:"json",
			success:function(data){//成功
				if(data.res_code===0){//成功
					$("#addPosModal").modal("hide");
					$("#yes").removeClass("hide").delay(1300).hide(400);//执行成功提示
					that.listByPage(1);
				}
				else{
					$(".add_pos_error").removeClass("hide");
				}
			}
		});
		
//		$.post("/api/position/add",$(".add_pos_form").serialize(),function(data){
//			if(data.res_code===0){//成功
//				$("#addPosModal").modal("hide");
//			}
//			else{
//				$(".add_pos_error").removeClass("hide");
//			}
//		},"json");
	},
	//按页查询职位数据并渲染
	listByPage:function(currentPage){
		//如果没有页码默认第一页
		currentPage = currentPage||1;
		//ajax查询
		$.get("/api/position/list",{pageIndex:currentPage},function(data){
			if(data.res_code===0){//成功
				//利用artTemplate
				const html = template("position_list_temp",{list:data.res_body});
				//显示
				$(".pos_tab").html(html);
			}
		},"json");
	},
	
	//按id查找职位数据并删除
	deleteById:function(dataId){
		//ajax查询
		const that =this;
		$.get("/api/position/del",{dataId:dataId},function(data){
			if(data.res_code===0){//成功
				$("#yes").removeClass("hide").delay(1300).hide(400);//执行成功提示
				that.listByPage(1);
			}
		})
	},
	
	//按当前id查找职位数据并修改
	updateById:function(){
		//ajax查询
		const that =this;
		const formData = new FormData($(".update_pos_form").get(0));//获取表单dom元素
		
		//利用ajax向服务器传递数据，包括图像资源
		$.ajax({
			type:"post",
			url:"/api/position/update",
			data:formData,//向服务器传递的数据
			processData:false ,//不需要将data转换为查询字符串
			contentType:false,//不设置content-type请求头
			dataType:"json",
			success:function(data){//成功
				if(data.res_code===0){//成功
					$("#updatePosModal").modal("hide");
					$("#yes").removeClass("hide").delay(1300).hide(400);//执行成功提示
					that.listByPage(1);
				}
				else{
					$(".update_pos_error").removeClass("hide");
					
				}
			}
		});
//		$.get("/api/position/update",{upId:upId},function(data){
//			if(data.res_code===0){//成功
//				alert("成功");
//				location.reload();
//			}
//		})
	}
});

new Position();
