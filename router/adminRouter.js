var adminRouter = express.Router();

adminRouter.all("/index",adminIndexControl.index);//调用控制器的longin函数
adminRouter.get("/admin",adminIndexControl.adminList);
adminRouter.post("/admin",adminIndexControl.adminAdd);
adminRouter.delete("/admin/:id",adminIndexControl.adminDel);


adminRouter.get("/producttype",productTypeControl.typeList);
adminRouter.get("/producttype/:pid",productTypeControl.typeList);
adminRouter.post("/producttype",productTypeControl.typeAdd);
adminRouter.delete("/producttype/:id",productTypeControl.typeDel);


adminRouter.get("/product",productControl.proList);
adminRouter.post("/product",upload.single("upfile"),productControl.proAdd);
adminRouter.delete("/product/:pid",productControl.proDel);

module.exports = adminRouter;//输出路由