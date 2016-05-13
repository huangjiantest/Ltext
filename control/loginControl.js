var loginControl = function() {};
//判断登录
loginControl.prototype.login = function( req,res,next ) {
	var ep = new EventProxy();
	//第一步，获取数据库连接
	dataSource.getConn( ep );
	//第二步，执行SQL命令
	loginModule.login( ep,[req.body.username,req.body.password] );
	//第三步，处理SQL执行的操作
	ep.on("success",function( rows ) {
		req.session.admin = rows[0];
		if( rows.length ) {
			res.json(config.info.loginsuc).end();
		} else {
			res.json(config.error.loginerr).end();
		}
	});
	//第四步，处理异常情况
	ep.fail(function(err){
		next(err);//交给500处理器处理异常
	});
}

loginControl.prototype.logout = function( req,res,next ) {
	delete req.session.admin;
	res.redirect("/login.html");
}
//输出控制器
module.exports = function() {
	return new loginControl();
};
