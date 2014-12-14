// index.js

var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var User = require('../models/user.js')
var Post = require('../models/post.js')


/* GET home page. */
// 若未登录，首页从新到旧显示所有Posts
router.get('/', function(req, res) {
    Post.get(null, function(err, posts) {
    	if(err) {
    		posts = []
    	}
    	res.render('index', {
    		title: 'Homepage',
    		posts: posts,
    		user: req.session.user,
    		success: req.flash('success').toString(),
    		error: req.flash('error').toString()
    	})
    })
});

/* GET Register page. */
router.get('/reg', checkNotLogin)
router.get('/reg', function (req, res) {
	res.render('reg', {
		title: '用户注册'
	})
})

router.get('/login', checkNotLogin)
router.get('/login', function (req, res) {
	res.render('login', {
		title: '用户登录'
	})
})

router.get('/logout', checkLogin)
router.get('/logout', function (req, res) {
	req.session.user = null;
	req.flash('success', '退出成功')
	res.redirect('/')
})

router.get('/user', function function_name (argument) {
	// body...
})

router.post('/login', checkNotLogin)
router.post('/login', function (req, res) {
	var md5 = crypto.createHash('md5')
	var password = md5.update(req.body.password).digest('base64')

	User.get(req.body.username, function (err, user) {
		if (!user) {
			req.flash('error', '用户不存在')
			return res.redirect('/login')		
		}

		if (user.password != password) {
			req.flash('error', '用户名或密码错误')
			return res.redirect('/login')
		}
		req.session.user = user
		req.flash('success', req.session.user.name + '登录成功！')

		res.redirect('/')
	})
})







module.exports = router;
