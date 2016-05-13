$(function() {
	var router = new Router({
		container: '#container'
	});

	var adminList = {
		url: '/adminList',
		className: "adminList",
		ajaxData: function() {
			var that = this;
			return $._ajax({
				url: '/admin/admin',
				type: 'get'
			}).done(function(data) {
				that.data = data;
			});
		},
		render: function() {
			return ejs.render($("#adminList").html(), {admins: this.data});
		}
	}
	var adminAdd = {
		url: "/adminAdd",
		render: function() {
			return $("#adminAdd").html();
		},
		bind: function() {
			var t = $(this);
			t.find("#sub").click(function() {
				var aname = t.find("#aname").val();
				var email = t.find("#email").val();
				var password = t.find("#password").val();

				if ($.yanzheng.isEmpty(aname) == false) {
					return t.find(".alert").alterMes({
						message: "用户名不能为空的!"
					});
				}
				if ($.yanzheng.isEmpty(email) == false) {
					return t.find(".alert").alterMes({
						message: "email不能为空的!"
					});
				}
				if ($.yanzheng.isEmpty(password) == false) {
					return t.find(".alert").alterMes({
						message: "密码不能为空的!"
					});
				}
				if ($.yanzheng.isEmail(email) == false) {
					return t.find(".alert").alterMes({
						message: "email格式错误"
					});
				}
				//提交ajax
				$._ajax({
					url: "/admin/admin",
					data: {
						"aname": aname,
						"email": email,
						"password": password
					}
				}).done(function(obj) {
					if (obj.code) {
						//如果增加成功就返回列表
						location.href = "/admin/index#/adminList";
					} else {
						t.find(".alert").alterMes({
							type: "danger",
							message: obj.msg
						});
					}
				})
			})
		}
	}
	var adminDel={
		url : "/adminDel/:id",
		ajaxData : function(){
			var t = this;
			$._ajax({
				url : "/admin/admin/"+t.params.id,
				type : "delete"
			}).done(function  () {
				location.href = "/admin/index#/adminList";
			});
			return false;
		}
	}
	
	
	var typeList = {
		url: '/typeList',
		ajaxData: function() {
			var that = this;
			return $._ajax({
				url: '/admin/producttype/0',
				type: 'get'
			}).done(function(data) {
				that.data = data;
			});
		},
		render: function() {
			return ejs.render($("#typeList").html(), {types: this.data});
		}
	}
	var typeAdd = {
		url: "/typeAdd",
		ajaxData: function() {
			var that = this;
			return $._ajax({
				url: '/admin/producttype/0',
				type: 'get'
			}).done(function(data) {
				that.data = data;
			})
		},render: function() {
			return ejs.render($("#typeAdd").html(), {types: this.data});
		},
		bind: function() {
			var t = $(this);
			t.find("#sub").click(function() {
				var tname = t.find("#tname").val();
				var typeinfo = t.find("#typeinfo").val();
				var pid = t.find("#pid").val();

				if ($.yanzheng.isEmpty(tname) == false) {
					return t.find(".alert").alterMes({
						message: "商品不能为空的!"
					});
				}
				if ($.yanzheng.isEmpty(typeinfo) == false) {
					return t.find(".alert").alterMes({
						message: "描述不能为空的!"
					});
				}
				if ($.yanzheng.isEmpty(pid) == false) {
					return t.find(".alert").alterMes({
						message: "密码不能为空的!"
					});
				}
				
				//提交ajax
				$._ajax({
					url: "/admin/producttype",
					data: {
						"tname": tname,
						"typeinfo": typeinfo,
						"pid": pid
					}
				}).done(function(obj) {
					if (obj.code) {
						//如果增加成功就返回列表
						location.href = "/admin/index#/typeList";
					} else {
						t.find(".alert").alterMes({
							type: "danger",
							message: obj.msg
						});
					}
				})
			})
		}
	}
	var typeDel={
		url : "/typeDel/:id",
		ajaxData : function(){
			var t = this;
			$._ajax({
				url : "/admin/producttype/"+t.params.id,
				type : "delete"
			}).done(function  () {
				location.href = "/admin/index#/typeList";
			});
			return false;
		}
	}


	var proList = {
		url: '/proList',
		ajaxData: function() {
			var that = this;
			return $._ajax({
				url: '/admin/product',
				type: 'get'
			}).done(function(data) {
				that.data = data;
			});
		},
		render: function() {
			return ejs.render($("#proList").html(), {products: this.data});
		}
	}
	var proAdd = {
		url: "/proAdd",
		ajaxData: function() {
			var that = this;
			return $._ajax({
				url: '/admin/producttype',
				type: 'get'
			}).done(function(data) {
				that.data = data;
			})
		},render: function() {
			return ejs.render($("#proAdd").html(), {types: this.data});
		},
		
		bind: function() {
			var t = $(this);
			t.find("#sub").click(function() {
				var pname = t.find("#pname").val();
				var price = t.find("#price").val();
				var stock = t.find("#stock").val();
				var type = t.find("#type").val();
				
				var data = new FormData();
				data.append("pname",pname);
				data.append("price",price);
				data.append("stock",stock);
				data.append("type",type);
				data.append("upfile",t.find("#imgpath").get(0).files[0]);
				
				//提交ajax
				$._ajax({
					url: "/admin/product",
					data:data,
					cache:false,
					processData:false,
					contentType:false
				}).done(function(obj) {
					if (obj.code) {
						//如果增加成功就返回列表
						location.href = "/admin/index#/proList";
					} else {
						t.find(".alert").alterMes({type: "danger",message: obj.msg});
					}
				})
			})
		
			t.find("#imgpath").change(function() {
				var file = this.files[0];
				if(file.type.indexOf("image")==-1){
					t.find(".alter").alterMes({type:"danger",message:"只能上传图片"});
					return;
				}
				if(file.size>(1024*512)){
					t.find(".alter").alterMes({type:"danger",message:"只能上传小于512k的图片"});
					return;
				}
				var fr = new FileReader();
				fr.readAsDataURL(file);
				fr.onload = function(e) {
					$("#showimg").attr("src",fr.result);
				}
			});
		
		}
	}
	var proDel={
		url : "/proDel/:pid",
		ajaxData : function(){
			var t = this;
			$._ajax({
				url : "/admin/product/"+t.params.pid,
				type : "delete"
			}).done(function  () {
				location.href = "/admin/index#/proList";
			});
			return false;
		}
	}

	var home = {
		url: "/",
		render: function() {
			return '<h1>欢迎</h1>';
		}
	}
	
	
	
	
	
	router.push(adminList)
		
		.push(adminAdd)
		.push(adminDel)
		.push(typeList)
		.push(typeAdd)
		.push(typeDel)
		.push(proList)
		.push(proAdd)
		.push(proDel)
		.push(home)
		.setDefault('/')
		.init();
});