var express = require('express');
var router = express.Router();
var multer = require('multer')
var upload = multer()

var queryService = require('../service/queryService');

/* POST handle query */
router.post('/opt1', function(req, res, next) {
  var fields = req.body
  console.log(JSON.stringify(fields, null, 2))

  queryService.query1(fields)
      .then(result => {
        // console.log(result)
        res.json({ result: result })
      })
      .catch(err => {
        console.log(err)
        res.json({ error: err })
      })
  
});

/* POST handle query */
router.post('/opt2', upload.array(), function(req, res, next) {
  var fields = req.body
  console.log(JSON.stringify(fields, null, 2))
  
  queryService.query1(fields)
  .then(result => {
    // console.log(result)
    res.json({ result: result })
  })
  .catch(err => {
    console.log(err)
    res.json({ error: err })
  })
})

module.exports = router;
