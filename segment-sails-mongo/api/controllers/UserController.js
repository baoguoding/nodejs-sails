User = require('../models/User');
function formatDate(date) {
    return date.toLocaleDateString()+' '+date.toLocaleTimeString();
}
module.exports = {
    /**
     * `UsersController.zhuce()`
     */
    zhuce: function (req, res) {
        var user = {id:5,email:'zz',pwd:'zz',nicheng:'我不知道'};
        user.createtime=formatDate(new Date());
        User.create(user).exec(function (err,created){
            if(err){
                var errStr = err.message;
                res.send(errStr);
                return;
            }
            res.send("注册成功");
        })
    },
    login: function (req, res) {
        /*
         User.find({email:'aa',pwd:'aa'},function(err,rs){
         console.log(rs);
         res.send('查到:'+rs);
         });
         */
        User.findOne({email:'aa',pwd:'aa'},function(err,rs){
            console.log(rs);
            res.send('查到:'+rs);
        });
    }
};