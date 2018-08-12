const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cloudinary = require('cloudinary');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
const fs = require('fs');
const saltRounds = 15;
const jwt = require('jsonwebtoken');
mongoose.Promise = Promise;
const User = require('../model/registration');
const process = require('../../keys/jwt');
const config = require('../../keys/cloudinary_keys');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: {maxFileSize: 1024*1024*5}}).single('file');
const async = require('async');

const base64 = require('base-64');




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

router.post('/branchSearch', (req,res) =>{
  const value = req.body.branchData;

  const store = [];

  const regex = new RegExp(value, 'i');
  User.find({name: regex}, (err,result) => {
    result.forEach(data => {
      store.push(data.name);
    });
    res.status(200).json({success: true, value: store});
  });
});

cloudinary.config({
  cloud_name: config.cloudName,
  api_key:    config.apiKey,
  api_secret: config.apiSecret
});

router.post('/upload' , (req,res) => {
  let body;
  let base64Data;


  // upload(req,res , (err) => {
  //   if(err){
  //     console.log(err);
  //   }
  //   else{
  //     const body = req.file;
  //     console.log(req.file);
  //
  //     const base64Data = body.buffer.toString("base64");
  //     console.log(base64Data);
  //   }
  // })

  upload(req,res, (err) => {
    if(err) {
      console.log('reaches');
    }
    else{
      async.series([
        function (callback) {
          body = req.file;
          console.log(body);
          callback()
        },
        function (callback) {
          setTimeout(() => {
            base64Data = body.buffer.toString("base64");
            console.log(base64Data);
            callback();
          });
        }
      ],()=>{
        setTimeout( () => {
          fs.writeFile('sample_spreadsheet.xls', base64Data, 'base64' , (err) => {
            if(!err) {
              cloudinary.uploader.upload('sample_spreadsheet.xls', (errs, result) => {
                console.log(errs);
                console.log(result);
                console.log('done');
              })
            }
          });
        });
      });

      // const base64Data = body.buffer.toString("base64");
      //
      // console.log(base64Data);
    }
  });

  // const file = req.file;
  // console.log(file);

  // fs.readFile(file, (file) => {
  //   console.log(file);
  // });

  // const base64Data = body.buffer.toString("base64");
  //
  // console.log(base64Data);


  // const base64Data = body.buffer.toString("base64");
  //
  // console.log(base64Data);

  // let base64Data = body.document;
  // base64Data = base64Data.replace(/^data:image\/jpeg;base64,/, '');
  // base64Data = base64Data.replace(/^data:image\/png;base64,/, '');
  // base64Data = base64Data.replace(/^data:application\/pdf;base64,/,'');
  // base64Data = base64Data.replace(/^data:application\/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,/,'');

  // console.log(base64Data);

  // fs.writeFile('sample_spreadsheet.xls', base64Data, 'base64' , (err) => {
  //   if(!err) {
  //     cloudinary.uploader.upload(file, (errs, result) => {
  //       console.log(errs);
  //       console.log(result);
  //       console.log('done');
  //     })
  //   }
  // });

});

module.exports = router;
