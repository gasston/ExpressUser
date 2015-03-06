var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
        collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

/* GET Create new acount. */
router.get('/signup', function(req, res) {
  var sess = req.session;
   if(sess.mail !== undefined && sess.mail !== "")
       {
         res.render('user/signup', { title: sess+'You are connected !!! ' });
       }else
       {
         res.render('user/signup', { title: 'Signin - Create new user' });
       }
});

/* Add new user . */
router.post('/signup', function(req, res) {
	var db = req.db;
    var collection = db.get('usercollection');
	/* var form */ 
	var username = req.body.user , 
	email = req.body.email , 
	password = req.body.password;
	collection.find({email : email},{},
                        function(e,docs){
                            if(docs.length === 0)
                                {  
                                collection.insert({"username": username,"password": password,"email": email},
    	                            function(err,doc){
    		                            if(err)
    		                                { 
    			                                res.render('user/signup',{error:"error_1"});
    		                                }else
    		                                {
    			                              res.redirect("/");
    		                                }
    	                                               }
    	                          );
                                }else
                                {
                                    res.render('user/signup',{error:'User Exist'});
                                }
});
});
/* GET users listing. */
router.get('/login', function(req, res) {
  res.render('user/login', { title: 'Login - Form' });
});

/* Post Login Form Process */
router.post('/login', function(req, res) {
	/* login action */ 
    var db = req.db;
    var collection = db.get('usercollection');
    sess=req.session;
	/* var form */ 
	var email = req.body.email , password = req.body.password;
    collection.find({ email : email , password :password },{},function(e,docs){
                         if(docs.length > 0)
                             { 
                                 sess.mail = email;
                                 res.json({error:sess.mail});
                      
                             }else
                             {
                                res.json({error:"Nok"});
                             }
                          });
    
});
/* Logout user */ 
/* GET users listing. */
router.get('/logout',function(req,res){
    req.session.destroy(function(err){
        if(err){
        console.log(err);
        }
        else
        {
        res.redirect('/');
        }
    });
});




module.exports = router;
