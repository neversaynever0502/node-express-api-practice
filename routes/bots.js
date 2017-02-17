var express = require('express');
var router = express.Router();
var robot = require('../func/bot');

router.route('/').post(function(req, res) {
    robot()
  });


// const app2 = express();
// const linebotParser = bot.parser();
// app2.post('/bot', linebotParser);