var express = require('express');
var router = express.Router();
var Movie2 = require('../models/member2');
var Movie = require('../models/member');
var mailer = require('../func/nodemailer');


router.route('/members2')
  .get(function(req, res) {
    Movie2.find(function(err, movies) {
      if (err) {
        return res.send(err);
      }
      res.json(movies);
    });
  })

  .post(function(req, res) {
  	Movie.findOne({ email: req.body.email}, function(err, movie) {
	    if (err) {
	      return res.send(err);
	    }
	    else if (movie.password = req.body.password){
	    	res.json(movie);

	    	var movie2 = new Movie2(req.body);
   
		    movie2.save(function(err) {
		      if (err) {
		        return res.send(err);
		      }
		      mailer.email2(req.body.email,req.body.password);
		      res.send({ message: 'Real Member Added:'+req.body.email });
		    });
		}
	    else {
	    	return res.json({'message':'password wrong'});
	    }
	  });
    // var movie = new Movie2(req.body);
    
    // movie.save(function(err) {
    //   if (err) {
    //     return res.send(err);
    //   }
    //   mailer.email2(req.body.email,req.body.password);
    //   res.send({ message: 'Member Added:'+req.body.email });
    // });
  });

router.route('/members2/login').post(function(){
	Movie2.findOne({ _id: req.body.email}, function(err, movie) {
    if (err) {
      return res.send(err);
    }
    else if (movie.password = req.body.password){
	  return res.json(movie);
	}
    else {
      res.json({'message':'password wrong'});
    }
  });
});


router.route('/members2/:id').put(function(req,res){

  Movie2.findOne({ _id: req.params.id }, function(err, movie) {
    if (err) {
      return res.send(err);
    }

    for (prop in req.body) {
      movie[prop] = req.body[prop];
    }

    // save the movie
    movie.save(function(err) {
      if (err) {
        return res.send(err);
      }

      res.json({ message: 'Member updated!' });
    });
  });
});

router.route('/members2/:id').get(function(req, res) {
  Movie2.findOne({ _id: req.params.id}, function(err, movie) {
    if (err) {
      return res.send(err);
    }

    res.json(movie);
  });
});


router.route('/members2/:id').delete(function(req, res) {
  Movie2.remove({
    _id: req.params.id
  }, function(err, movie) {
    if (err) {
      return res.send(err);
    }

    res.json({ message: 'Successfully deleted' });
  });
});


module.exports = router;