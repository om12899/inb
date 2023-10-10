const express = require('express');

const User = require('../models/User');
const router = express.Router();

const user = User

router.post('/',(req,res)=>{
   console.log(req.body);
   const user=User(req.body);
   user.save()
   res.send("hello bhai")
})

module.exports = router