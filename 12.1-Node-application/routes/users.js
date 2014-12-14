var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

/* user name*/
router.get('/:username', function (req, res) {
	var username = req.params.username
	if (username == 'admin') {
		res.render('userlist',  {
			title: '后台管理'
		})
	}
	else {
		res.send('Your username:' + username)
	}
})


module.exports = router;
