var express = require('express');
var Movie = require('../models/member');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  Movie.find(function(err, movies) {
      if (err) {
        return res.send(err);
      }
      // res.json(movies);
      res.render('index',  {title: movies});
      
    });
});

exports.memberAll = router;
