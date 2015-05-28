var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var template = require('art-template');
var fs = require('fs')
var mongoose = require('mongoose')

// var session = require('express-session')
// var mongoStore = require('connect-mongo')(express);



var port = process.env.APP_PORT;
 
var db_name = 'lBggzcJePDZUHLwjgtIb';                  // 数据库名，从云平台获取
var db_host = 'mongo.duapp.com';//process.env.BAE_ENV_ADDR_MONGO_IP;      // 数据库地址
var db_port = '8908';//process.env.BAE_ENV_ADDR_MONGO_PORT;   // 数据库端口
var username = 'mKf2GxBioiKEiLG5hsP827Pg';// process.env.BAE_ENV_AK;                 // 用户名
var password = 'SmdGpbtEHR3X8YepAN0Pl1RfbX3tsKo9';// process.env.BAE_ENV_SK;                 // 密码


 
var host, database, port, options;
if (process.env.SERVER_SOFTWARE === 'bae/3.0') {
    host = db_host;
    database = db_name;
    port = db_port;
    options = {
        server: {poolSize: 5},
        user: username,
        pass: password,
    };
} else {
    host = '192.168.0.75';
    database = 'Pos';
    port = 27017;
    username = ''
    password = ''
}
mongoose.connect('mongodb://'+username+':'+password+'@'+host+':'+port+'/'+database);
global.db = mongoose.connection;
//断线重连.
db.on('disconnected', function() {
    db.open(host, database, port, options);
});

// db.once('open')
db.open(host, database, port, options, function() {
   console.log('mongoDB connected!');
 });
db.on('error',function(err){
  console.error.bind(console, 'connection error:');
  db.close();
})
db.on('close',function(){
   db.open(host, database, port, options);
})
// models loading
/*var models_path = __dirname + '/app/models'
var walk = function(path) {
  fs
    .readdirSync(path)
    .forEach(function(file) {
      var newPath = path + '/' + file
      var stat = fs.statSync(newPath)

      if (stat.isFile()) {
        if (/(.*)\.(js|coffee)/.test(file)) {
          require(newPath)
        }
      }
      else if (stat.isDirectory()) {
        walk(newPath)
      }
    })
}
walk(models_path)  */

var app = express();

// view engine setup
template.config('base', '');
template.config('extname', '.html');
template.config('openTag', '<%');
template.config('closeTag', '%>');
template.config('cache', false);
app.engine('.html', template.__express);
app.set('view engine', 'html');
// app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app/views'));
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
 
// app.use(express.session({ 
//   secret:'aika',
//     store: new mongoStore({  
//       mongoose_connection: mongoose.connection 
//     })
//   }));

// 直接解析public文件夹下的静态资源
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname, '/public'));

var routes = require('./routes/index');
// 总路由
routes(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// 启动服务器
var debug = require('debug')('wechat');
app.set('port', 18080);
var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
  console.log(server.address());
  console.log('Express server listening on port ' + server.address().port);
});

module.exports = app;
