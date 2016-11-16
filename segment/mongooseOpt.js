var mongoose = require('mongoose');
///获取mongodb连接
mongoose.Promise = global.Promise;  //不这么写会报错
var db = mongoose.connect('mongodb://localhost/segment');
//注意大坑：如果是user对应的数据集会自动变成users
var User = mongoose.model('users', {
    _id:Number,
    uname: String,
    pwd: String,
    nicheng: String
});
/*
var user = new User({uname:'cc',pwd:'cc'});
user._id=3;
user.nicheng='王五';
user.age=20;            //无效
//-----增加--------------------------

user.save(function(err,rs){
    //console.log(err);
    console.log(rs);
    db.disconnect();    //关闭连接
});*/

//------修改一条-------------------------
/*
 User.update({_id:4},{$set: { nicheng: '张三' }},function(err,rs){
 console.log(rs);
 db.disconnect();    //关闭连接
 });
 */
//-----修改多条-----------------------------
/*
 User.update({nicheng:'李四'},{$set: { nicheng: '张三' }},{multi:true},function(err,rs){
 console.log(rs);
 db.disconnect();    //关闭连接
 });
 */
//-----删除-------------------------
/*
 User.remove({_id:4},function(err,rs){
 console.log(rs);
 db.disconnect();    //关闭连接
 })
 */
//---------查询--------------------
/*
User.find(function(err, rs){
console.log(rs);
     db.disconnect();
});*/
/*
User.find({nicheng:'张三'},function(err,rs){
console.log(rs);
db.disconnect();    //关闭连接
})*/

//--------查一条---------------
/*
User.findOne({},function(err,rs){
    console.log(rs);
    db.disconnect();    //关闭连接
})*/
