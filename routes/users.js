var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
  res.send('respond with a resource');
});
/* GET users listing. */
router.get('/singin', function(req, res) {
  res.render('user/singin', { title: 'Singin - Create new user' });
});

/* GET users listing. */
router.post('/singin', function(req, res) {
	var db = req.db;
    var collection = db.get('usercollection');
	/* var form */ 
	var username = req.params.user , 
	email = req.params.email , 
	password = req.params.password
	
    collection.insert({"username": username,"password": password,"email": email},
    	function(err,doc){
    		if(err)
    		{ console.log(err);
    			res.render('user/singin',{error:"error_1"});
    		}else
    		{
    			res.redirect("/");
    		}
    	}
    	);
});


module.exports = router;
