const express = require('express');
const router = express.Router();


const CV = require('../model/CVcomment')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});




router.post('/comment', function(req, res, next) {
  const db = new CV();
  db.name = req.body.user,
  db.email = req.body.email,
  db.comment = req.body.message,
  db.save((err)=>{
    if(err){
      console.log(err);
    }
    else{res.redirect('/message')}
  })
});




module.exports = router;