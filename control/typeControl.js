var productTypeControl=function (){};

productTypeControl.prototype.typeList=function(req,res,next){
	var ep = new EventProxy();
	dataSource.getConn(ep)
	if (req.params.pid) {
		adminModule.typeList(ep,[req.params.pid]);
	} else{
		adminModule.typeList(ep);
	}
	
	ep.on("success",function(data){
		res.json(data);
//		res.render("admin/adminList.html",{admins:data});
	});
	
}
productTypeControl.prototype.typeAdd=function(req,res,next){
	var ep = new EventProxy();
	dataSource.getConn(ep);
	adminModule.typeAdd(ep,[req.body.tname,req.body.typeinfo,req.body.pid]);
	ep.on("success",function(data){
		if(data.insertId){
			res.json(config.info.suc).end();
		}else{
			res.json(config.error.typeAddErr).end();
		}
		
	});
}
productTypeControl.prototype.typeDel = function  (req,res,next) {
	var ep = new EventProxy();
	dataSource.getConn(ep);
	adminModule.typeDel(ep,[req.params.id]);
	ep.on("success",function  (data) {
		if(data.insertId){
			res.json(config.info.suc).end();
		}else{
			res.json(config.error.typeAddErr).end();
		}
	});
}
module.exports=function  () {
	return new productTypeControl();
}