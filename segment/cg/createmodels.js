var  fs=  require('fs');
var mysql  = require('mysql');  //调用MySQL模块
var rootpath = 'D:/github/nodejs-sails/segment/api/models/'; //生成model的绝对路径
//创建一个connection  
var connection = mysql.createConnection({      
    host: 'localhost',       //主机  
    user: 'root',               //MySQL认证用户名  
    password: 'root',        //MySQL认证用户密码  
    database: 'segment',  
    port: '3306'                   //端口号  
});
//创建一个connection  
connection.connect(function(err){  
    if(err){         
        console.log('[query] - :'+err);  
        return;  
    }  
    console.log('[connection connect]  succeed!');  
});
function tableColumn(tablename){
	//return function(){
		var str = "module.exports = {\n";
		str += "  tableName: '"+tablename+"',\n";
		str += "  adapter: 'mysql',\n";
		str += "  autoid:false,\n";
		str += "  autoCreatedAt: false,\n";
		str += "  autoUpdatedAt: false,\n";
		str += "  attributes: {\n";

		sql = 'desc '+tablename;
		connection.query(sql,function(err,rs){
			//console.log(rs);
			str += "    ";
			for(var i=0;i<rs.length;i++){
				str += rs[i].Field;
				str += ":{},";
				//console.log(rs[i].Field);
			}
			str += "\n  }\n";
			str += "};";
			//console.log(str);
			tableName = tablename.replace(/(\w)/,function(v){return v.toUpperCase()});
			path = rootpath+tableName+'.js';
			fs.writeFileSync(path,str);
			//console.log('--------------------------');
		});
	//};
}
//执行查询  
connection.query('show tables', function(err, rs) {  
    if (err) {  
        console.log('[query] - :'+err);  
        return;  
    } 
	//console.log(rs);
	for(var i=0;i<rs.length;i++){
		//console.log('tablename: ', rs[i].Tables_in_test);
		for(var key in rs[i]){
			tablename = rs[i][key];
			tableColumn(tablename);
			break;
		}
	}
	closeConn();
});   

//关闭connection  
function closeConn(){
	connection.end(function(err){  
		if(err){ 
			console.log(err.toString());
			return;  
		}  
		console.log('[connection end] succeed!');  
	});
}
