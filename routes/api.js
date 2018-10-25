var express = require('express');
var router = express.Router();

router.get('/sayhello',function(req,res){
res.send('hello meetup members');
});

module.exports = router;
