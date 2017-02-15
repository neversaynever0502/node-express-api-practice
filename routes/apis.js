var express = require('express');
var router = express.Router();

router.get('/images', function(req, res) {
    res.json({ message: "第一個API!" });
});

router.get('/me',function(req,res){
	res.send('<h1>我的FB</h1>' + 'https://www.facebook.com/raja83946993');  
});

router.get('/who/:name?/:nickname?',function(req,res){
	var name = req.params.name;  
  	var nickname = req.params.nickname;  
  	res.send('<p>名稱: ' + name + '<br>綽號: ' + nickname + '</p>');  
});



module.exports = router;