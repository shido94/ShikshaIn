const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cloudinary = require('cloudinary');
const saltRounds = 15;
const jwt = require('jsonwebtoken');
mongoose.Promise = Promise;
const Admin = require('../model/registration');
const Branch = require('../model/branch');
const process = require('../../keys/jwt');
//
// const admin = {
//   name: 'Rupesh yadav',
//   email: 'rupeshyadav94.ry@gmail.com',
//   password: 'Rupesh94$',
//   role: 'admin',
//   Profession: { type: 'student', default: 'student' },
//   college: 'KIET'
// };

router.post('/verify', (req,res) =>{
  const secret_number = '8953048565';
  const value = req.body;

  if(secret_number === value.number) {
    return res.status(200).json({
      success: true
    })
  }
  else{
    return res.status(404).json({
      success: false,
      message: 'Wrong Credential'
    })
  }
});

router.post('/register', (req,res) =>{
  const adminForm = req.body;
  if (adminForm.password === adminForm.conf_password){

    bcrypt.hash(adminForm.password, saltRounds, (err,hash) =>{
      const admin = new Admin({
        name: adminForm.username,
        email: adminForm.email,
        role: 'admin',
        Profession: adminForm.profession,
        college: adminForm.college,
        password: hash,
      });

      admin.save((err, result)=>{
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
  const admin = req.body;

  const hash = await Admin.findOne({email: admin.email});

  if (hash) {
    bcrypt.compare(admin.password, hash.password, (err,result) =>{
      if (!result && hash.role !== 'admin/data' ) {
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
          username: hash.name,
          admin: hash.role
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

router.post('/branch-data', async (req,res) =>{
  const body = req.body;
  console.log(body);

  const data= {
    branchImg: body.branchImg,
    branch_name: body.branch_name,
    semester_name: [{
      semester: body.semester,
      subject: body.subject
    }]
  };
  // console.log(data);

  const branch = await Branch.findOne({branch_name: data.branch_name});
  if(branch) {
    let value = false;
    await branch.semester_name.forEach((semester) => {
      if (semester.semester === data.semester_name[0].semester) {
        return value = true;
      }
    });
    if(value){
      return res.status(404).json({
        success: false,
        message: 'Data already exist'
      });
    }
    else{
      Branch.update({_id: branch._id},{
        $push: {
          semester_name: data.semester_name
        }
      },(err) => {
        if(err) {
          return res.status(404).json({
            success: false,
            message: 'Some error'
          });
        }
        else{
          return res.status(200).json({
            success: true
          });
        }
      });
    }
  }
  else {
    const new_branch = new Branch(data);
    new_branch.save((error) =>{
      if(!error){
        return res.status(200).json({
          success: true
        });
      }
    });
  }
});

router.get('/data', (req,res) =>{
  Branch.find({branch_name: 'it'}, (err,result) =>{
    console.log(result[0].semester_name.subject_name)
  })
});









module.exports = router;