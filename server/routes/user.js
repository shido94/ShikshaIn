const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 15;
const jwt = require('jsonwebtoken');
mongoose.Promise = Promise;
const User = require('../model/registration');
const process = require('../../keys/jwt');

router.post('/register', (req,res)=>{
  const userForm = req.body;

  if (userForm.password === userForm.conf_password){

    bcrypt.hash(userForm.password, saltRounds, (err,hash) =>{
      const user = new User({
        name: userForm.username,
        email: userForm.email,
        Profession: userForm.profession,
        password: hash,
        college: userForm.college
      });

      user.save((err, result)=>{
        if(err){
          res.json({
            success: false,
            message: 'Incorrect Details'
          });
        }
        else {
          res.json({
            success: true
          });
        }
      });
    });
  }
});

router.post('/login', async (req,res)=>{
  const user = req.body;
  console.log(user);

  const hash = await User.findOne({email: user.email});
  console.log(hash);

  if (hash) {
    bcrypt.compare(user.password, hash.password, (err,result) =>{
      if (!result) {
        res.status(404).json({
          success: false,
          message: 'Wrong Credential'
        });
      }

      else {
        const token = jwt.sign({
            email: hash.email,
            userId: hash._id
          }, process.env.JWT_KEYS ,
          {
            expiresIn: "1 days"
          });
        res.status(200).json({
          success: true,
          token: token,
          username: hash.name
        });
      }
    });
  }
  else{
    res.status(404).json({
      success: false,
      message: 'Wrong Credential'
    });
  }

});



module.exports = router;
