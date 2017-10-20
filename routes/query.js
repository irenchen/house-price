var express = require('express');
var router = express.Router();

var queryService = require('../service/queryService');

/* GET users listing. */
router.post('/opt1', function(req, res, next) {
  var fields = req.body
  console.log(JSON.stringify(fields, null, 2))

  queryService.query1(fields)
      .then(result => {
        console.log(result)
        res.json({ price: 1000 })
      })
      .catch(err => {
        console.log(err)
        res.json({ error: err})
      })
  
});

module.exports = router;
