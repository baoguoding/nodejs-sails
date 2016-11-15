/**
 * MainController
 *
 * @description :: Server-side logic for managing mains
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */



module.exports = {



    /**
     * `MainController.index()`
     */
    index: function (req, res) {
        loginbean = req.session.loginbean;
        console.log(loginbean);
        res.view('index',{loginbean:loginbean});
    },
    logout:function(req,res){
        req.session.destroy(function(err) {
            res.redirect('/');
        })
    },
    test:function(req,res){
        res.send("我是test页面");
    }
};

