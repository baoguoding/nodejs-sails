/**
 * QuestionController
 *
 * @description :: Server-side logic for managing questions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
Question = require('../models/Question');
function formatDate(date) {
    return date.toLocaleDateString()+' '+date.toLocaleTimeString();
}

module.exports = {



  /**
   * `QuestionController.ask()`
   */
  ask: function (req, res) {
      if(!req.body){
          res.view('ask');
      }else{
          var question = req.allParams();
          question.createtime=formatDate(new Date());
          var loginbean = req.session.loginbean;
          question.uid=loginbean.id;
          question.nicheng=loginbean.nicheng;
          Question.create(question).exec(function (err,created){
              if(err){
                  res.send("出错:"+err.message);
                  return;
              }
              res.redirect('/');
          })
      }
  }
};

