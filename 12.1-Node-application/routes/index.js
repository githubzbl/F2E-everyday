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

router.post('/reg', checkNotLogin)
router.post('/reg', function (req, res) {
	// 验证两次密码是否一致
	console.log(req.body['password'])
	console.log(req.body['password-repeat'])
	if (req.body['password'] !== req.body['password-repeat']) {
		req.flash('error', '两次密码输入不一致，请重新输入')
		console.log('两次密码输入不一致，请重新输入')
		return res.redirect('/reg')
	}

	// 生成口令的散列值
	var md5 = crypto.createHash('md5')
	var password = md5.update(req.body.password).digest('base64')

	var newUser = new User({
		name: req.body.username,
		password: password
	})

	// 检查用户名是否存在
	User.get(newUser.name, function (err, user) {
		err = null
		success = null
		if (user)
			err = '此用户名已被占用'
		if (err) {
			req.flash('error', err)
			console.log(err)
			return res.redirect('/reg')
		}

		//不存在则新增用户
		newUser.save(function (err) {
			if (err) {
				req.flash('error', err)
				console.log(err)
				return res.redirect('/reg')
			}
			req.session.user = newUser
			req.flash('success', '恭喜你注册成功')
			res.redirect('/')
		})
	})
})

router.get('/login', checkNotLogin)
router.get('/login', function (req, res) {
	res.render('login', {
		title: '用户登录'
	})
})

router.post('/login', checkNotLogin)
router.post('/login', function (req, res) {
	// 生成口令的散列值
	var md5 = crypto.createHash('md5')
	var password = md5.update(req.body.password).digest('base64')

	// 检测用户名是否存在
	User.get(req.body.username, function (err, user) {
		if (!user) {
			req.flash('error', 'Ops...你还没注册')
			return res.redirect('/login')		
		}

		if (user.password != password) {
			req.flash('error', '密码错啦，你再看看')
			return res.redirect('/login')
		}
		req.session.user = user
		req.flash('success', req.session.user.name + '登录成功！')
		console.log('login success!')
		res.redirect('/')
	})
})


router.get('/logout', checkLogin)
router.get('/logout', function (req, res) {
	req.session.user = null;
	req.flash('success', '退出成功')
	res.redirect('/')
})

router.get('/user', function (req, res) {
	res.render('user', {
		title: '我的主页'
	})
})

router.post('/post', checkLogin)
router.post('/post', function (req, res) {
	var currentUser = req.session.user
	var post = new Post(currentUser.name, req.body.post)
	post.save(function (err) {
		if (err) {
			req.flash('error', err)
			return res.redirect('/')
		}
		req.flash('success', '发表成功')
		res.redirect('/u/' + currentUser.name)
	})
})

router.get('/u/:user', function (req, res) {
	User.get(req.params.user, function (err, user) {
		if (!user) {
			req.flash('error', 'Ops...你还没注册')
			return res.redirect('/login')		
		}
		Post.get(user.name, function (err, posts) {
			if(err) {
				req.flash('error', err)
				return res.redirect('/')
			}
			res.render('user', {
				title: user.name,
				posts: posts
			})
		})
	})
})


function checkLogin (req, res, next) {
	if (!req.session.user) {
		req.flash('error', '你还没未登录...')
		return res.redirect('/login')
	}
	next()
}

function checkNotLogin (req, res, next) {
	if (req.session.user) {
		req.flash('error', '你已经登录啦')
		return res.redirect('/')
	}
	next()
}



module.exports = router;
