// db.js 
// 输出创建的数据库连接

var settings =require('../settings'),
		Db = require('mongodb').Db,
		Connection = require('mongodb').Connection,
		Server = require('mongodb').Server;

module.exports = new Db(settings.db, new Server(settings.host, Connection.DEFAULT_PORT, {}), {safe: true})