var dataSource = function(){
	//创建数据库连接池
	this.pool = mysql.createPool({
		connectionLimit : 10,
		host : "localhost",
		user : "root",
		password : "",
		database : "epay",
		dateStrings:true
	});
}
dataSource.prototype.getConn = function( ep ) {
	this.pool.getConnection(ep.done("conn"));
}

module.exports = function() {
	return new dataSource();
}
