var express = require('express');
var router = express.Router();
var fs = require('fs')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'hello' });
});

router.get('/image1', function(req, res, next) {
  // res.send(fs.readFileSync('./public/images/query01.png', 'utf8'))
  fs.createReadStream('./public/images/query01.png').pipe(res)
})


module.exports = router;
