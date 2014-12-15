// post.js

var mongodb = require('./db')

// Post constructor
function Post(username, post, time) {
	this.user = username
	this.post = post

	if (time) {
		this.time = time
	}
	else {
		this.time = new Date()
	}
};

// 将post保存至MongoDB
Post.prototype.save = function save(callback) {

	var post = {
		user: this.user,
		post: this.post,
		time: this.time
	}

	mongodb.open(function(err, db) {
		if (err) {
			return callback(err)
		}

		// 读取 post集合
		db.collection('post', function(err, collection) {
			if (err) {
				mongodb.close()
				return callback(err)
			}

			collection.ensureIndex('user' ,function(err, post){})

			collection.insert(post, {safe: true}, function(err, post) {
				mongodb.close()
				callback(err, post)
			})
		})
	})
};

Post.get = function get(username, callback) {
	mongodb.open( function (err, db) {
		if(err) {
			return callback(err)
		}

		db.collection('posts', function (err, collection) {
			if (err) {
				mongodb.close()
				return callback(err)
			}

			// 查找user 属性为 username的文档， 如果 username 是 null 则匹配全部
			var query = {}
			if (username) {
				query.user = username;
			}
			// 按时间从近到远排序
			collection.find(query).sort({time: -1}).toArray(function (err, docs) {
				mongodb.close()
				if (err) {
					callback(err, null)
				}

				var posts = []
				docs.forEach(function (doc, index) {
					// 封装文档为 Post 对象
					var post = new Post(doc.user, doc.post, doc.time)
					posts.push(post)
				})
				callback(null, posts)
			})
		})
	})
}


module.exports = Post