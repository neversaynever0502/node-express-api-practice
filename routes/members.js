var Movie = require('../models/member');
var express = require('express');
var router = express.Router();

router.route('/members')
  .get(function(req, res) {
    Movie.find(function(err, movies) {
      if (err) {
        return res.send(err);
      }
      res.json(movies);
    });
  })

  .post(function(req, res) {
    var movie = new Movie(req.body);
    
    movie.save(function(err) {
      if (err) {
        return res.send(err);
      }
      res.send({ message: 'Member Added:'+req.body.email });
    });
  });

router.route('/members/:id').put(function(req,res){

  Movie.findOne({ _id: req.params.id }, function(err, movie) {
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

router.route('/members/:id').get(function(req, res) {
  Movie.findOne({ _id: req.params.id}, function(err, movie) {
    if (err) {
      return res.send(err);
    }

    res.json(movie);
  });
});


router.route('/members/:id').delete(function(req, res) {
  Movie.remove({
    _id: req.params.id
  }, function(err, movie) {
    if (err) {
      return res.send(err);
    }

    res.json({ message: 'Successfully deleted' });
  });
});


module.exports = router;