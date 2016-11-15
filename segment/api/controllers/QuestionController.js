/**
 * QuestionController
 *
 * @description :: Server-side logic for managing questions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
Question = require('../models/Question');
var async = require('async');
var multiparty = require('multiparty');
var fs = require('fs');
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
  },


    queList:function(req,res){
        page = 1;
        if(req.query['page']!=undefined){
            page = parseInt(req.query['page']);
            if(page<1){
                page=1;
            }
        }
        pageSize = 2;
        pointStart = (page-1)*pageSize;
        count=0;
        countPage=0;
        async.series({
            one: function(callback){
                Question.count({}).exec(function (err,rs){
                    count=rs;
                    countPage = Math.ceil(count/pageSize);
                    if(page>countPage){
                        page=countPage;
                        pointStart = (page-1)*pageSize;
                        param = [pointStart,pageSize];
                    }
                    callback(null, rs);
                });
            },
            two: function(callback){
                Question.query('select qid,title,looknum,renum,finished,updtime,createtime from question order by qid desc limit ?,?',[pointStart,pageSize],function(err,rs){
                    callback(null, rs);
                })

            }
        },function(err, results) {
            //console.log(results);
            var loginbean = req.session.loginbean;
            rs=results['two'];
            res.view('index', {loginbean:loginbean,page:page,rs:rs,count:count,countPage:countPage});
        });
    },


    uploadImg:function(req,res){
        req.file('filedata').upload({
            dirname: '../public/images/upload/'
        },function (err, uploadedFiles){
            if (err){
                console.log(err);
                res.send('{"err":"上传错误","msg":""}');
            }

            console.log(uploadedFiles);
            var tmpPath = uploadedFiles[0].fd;  //上传临时文件url
            var pathArr = tmpPath.split('\\');
            var newFileName = pathArr[pathArr.length - 1];
            console.log(newFileName);
            var uploadurl = '../../images/upload/'+newFileName;
            console.log(uploadedFiles[0].size);
            console.log(uploadedFiles[0].filename);
            var savePath = './assets/images/upload/'+newFileName;
            var fileReadStream = fs.createReadStream(tmpPath);
            var fileWriteStream = fs.createWriteStream(savePath);
            fileReadStream.pipe(fileWriteStream); //管道流
            fileWriteStream.on('close',function(){
                //fs.unlinkSync(tmpPath);    //删除临时文件夹中的图片
                console.log('copy over');
                res.send('{"err":"","msg":"'+uploadurl+'"}');
            });
            //res.send('{"err":"","msg":"'+uploadurl+'"}');
            //return res.ok;
        })
        //return res.ok;
    },
    detail:function(req, res){
        qid = req.query['qid'];
        if(qid!=undefined){
            sqlupd = 'update question set looknum=looknum+1 where qid=?';
            sqldetail = "select qid,title,content,uid,nicheng,looknum,renum,finished,updtime,date_format(createtime,'%Y-%c-%d') as createtime from question where qid=?";
            param=[qid];
            sqlReply="select rpid,content,uid,nicheng,date_format(createtime,'%Y-%c-%d') as createtime from replies where qid=?";
            async.series({
                one: function(callback){
                    Question.query(sqlupd,param,function(err,rs){
                        callback(err, rs);
                    })
                },
                two: function(callback){
                    Question.query(sqldetail,param,function(err,rs){
                        callback(null, rs);
                    })
                },
                three:function(callback){
                    Question.query(sqlReply,param,function(err,rs){
                        callback(null, rs);
                    })
                }
            },function(err, results) {
                //console.log(results);
                rs=results['two'];
                rsReply = results['three'];
                loginbean = req.session.loginbean;
                res.render('queDetail', {loginbean:loginbean,rs:rs,rsReply:rsReply});
                //res.send('查完');
            });
        }else{
            res.send('没传入qid');
        }
    }
};

