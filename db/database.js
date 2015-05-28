var mongoose = require('mongoose');


var port = process.env.APP_PORT;
 
var db_name = 'czDTYQiuXZVMDYvelPvy';                  // 数据库名，从云平台获取
var db_host =  process.env.BAE_ENV_ADDR_MONGO_IP;      // 数据库地址
var db_port =  +process.env.BAE_ENV_ADDR_MONGO_PORT;   // 数据库端口
var username = process.env.BAE_ENV_AK;                 // 用户名
var password = process.env.BAE_ENV_SK;                 // 密码


global.db = mongoose.createConnection();
var host, database, port, options;

    host = db_host;
    database = db_name;
    port = db_port;
    options = {
        server: {poolSize: 5},
        user: username,
        pass: password,
    };

db.on('error', function(err) {
    //do something..
});
//断线重连.
db.on('disconnected', function() {
    db.open(host, database, port, options);
});
db.open(host, database, port, options);