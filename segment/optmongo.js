var  mongodb = require('mongodb');
var  server  = new mongodb.Server('localhost', 27017, {auto_reconnect:true});
var  db = new mongodb.Db('segment', server, {safe:true}); //safe:true表示启动安全模式，在执行更新操作之后，驱动都会发送getLastError命令来确保更新成功，false不发送

//连接db
db.open(function(err, db){
    if(!err) {
        console.log('connect db');

        // 连接Collection（可以认为是mysql的table）
        // 第1种连接方式,取一个特定集合
        db.collection('user',{safe:true}, function(err, collection){
             if(err){
                 console.log(err);
             }else{
                 // 删除数据
                 //删除单条记录
                 /*
                 collection.remove({nicheng:'zhangsan'},{safe:true},function(err,result){
                    console.log(result);
                    db.close();                           //关闭连接
                 });*/

                 //删除多条记录
                 /*
                 collection.remove({nicheng:'LISI'},{multi:true},function(err,result){
                     console.log(result);
                     db.close();                           //关闭连接
                 });*/


                 //更新数据
                 //更新单条记录
                 /*
                 collection.update({_id:3}, {$set:{nicheng:'李四'}}, {safe:true}, function(err, result){
                      console.log(result);
                      db.close();                           //关闭连接
                 });*/
                 //多条更新数据
                 /*
                 collection.update({nicheng:'李四'}, {$set:{uname:'aa',pwd:'aa',nicheng:'LISI'}},{multi:true}, function(err, result){
                     console.log(result);
                     db.close();                           //关闭连接
                 });*/

                 //查询一条记录
                 /*
                  collection.findOne({_id:2},function(err,rs){
                      console.log(rs);
                      db.close();                           //关闭连接
                  });*/

                 //查询多条记录
                 /*
                 collection.find({pwd:'bb',uname:'bb'}).toArray(function(err,rs){
                     console.log(rs);
                     db.close(); //关闭连接
                 });*/
             }
        });

        // 第2种连接方式,创建一个特定集合
        /*
        db.createCollection('user', {safe:true}, function(err, collection){
            if(err){
                console.log(err);
            }else{
                //新增数据
                var row = {_id:3,uname:'cc',pwd:'cc',nicheng:'王五'};
                collection.insert(row,{safe:true},function(err, result){
                    console.log(result);
                    db.close();                           //关闭连接
                });
            }
        });*/

    }else{
        console.log("连接出错："+err);
    }
})

