var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
        collection.find({},{},function(e,docs){
        res.render('user/index',{error:"error_1"});
    });
});
/* GET users listing. */
router.get('/signin', function(req, res) {
  res.render('user/signin', { title: 'Signin - Create new user' });
});

/* Add new user . */
router.post('/signin', function(req, res) {
	var db = req.db;
    var collection = db.get('usercollection');
	/* var form */ 
	var username = req.body.user , 
	email = req.body.email , 
	password = req.body.password;
	
    collection.insert({"username": username,"password": password,"email": email},
    	function(err,doc){
    		if(err)
    		{ 
    			res.render('user/signin',{error:"error_1"});
    		}else
    		{
    			res.redirect("/");
    		}
    	}
    	);
});

/* GET users listing. */
router.get('/login', function(req, res) {
  res.render('user/login', { title: 'Login - Form' });
});

/* Post Login Form Process */
router.post('/login', function(req, res) {
	/* login action */ 
});




module.exports = router;
