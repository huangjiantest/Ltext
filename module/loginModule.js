var loginModule = function(){}
loginModule.prototype.login = function( ep,data ) {
	//触发数据库连接事件
	ep.on("conn",function( conn ){
		//查询条件
		var sql = "select * from admin where email = ? and password = ?";
		conn.query(sql,data,ep.done("success"));
		conn.release();
	});
}

module.exports = function() {
	return new loginModule();
}
