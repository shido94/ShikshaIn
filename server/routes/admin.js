const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cloudinary = require('cloudinary');
const axios = require('axios');
const fs = require('fs');
const saltRounds = 15;
const jwt = require('jsonwebtoken');
mongoose.Promise = Promise;
const process = require('../../keys/jwt');
const config = require('../../keys/cloudinary_keys');
const Admin = require('../model/registration');
const Branch = require('../model/branch');
const WaitForApproval = require('../model/wait-for-approval');
const Document = require('../model/document');
const User = require('../model/registration');

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


cloudinary.config({
  cloud_name: config.cloudName,
  api_key:    config.apiKey,
  api_secret: config.apiSecret
});

router.post('/branch-data', async (req,res) =>{
  const body = req.body;
  console.log(body.branchImg);

  let base64Data = body.branchImg;

  base64Data = base64Data.replace(/^data:image\/jpeg;base64,/, '');
  base64Data = base64Data.replace(/^data:image\/png;base64,/, '');

  const branch = await Branch.findOne({branch_name: body.branch_name});

  fs.writeFile("out.jpg", base64Data, 'base64', function(err) {
    cloudinary.uploader.upload("out.jpg", function(result){
      if (result.url) {
        console.log(result);
        const data= {
          branchImg: result.url,
          branch_name: body.branch_name,
          semester_name: [{
            semester: body.semester,
            subject: body.subject
          }]
        };

        if(branch) {
          let value = false;
          branch.semester_name.forEach((semester) => {
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


      } else {
        return res.status(404).json({
          success: false,
          message: 'Error in cloudinary API'
        })
      }
    });
  });
});

router.get('/api', (req,res) =>{
  let data = [
    {
      userId: 10,
      id: 98,
      title: 'laboriosam dolor voluptates',
      body: 'doloremque ex facilis sit sint culpa{ userId: 10'
    },
    {
      id: 99,
      title: 'temporibus sit alias delectus eligendi possimus magni',
      body: 'quo deleniti praesentium dicta non quod'
    }
  ];

  res.status(200).json(data);

});

router.post('/approval', async (req,res) => {
  const dataId = req.body.approveData;
  const data = await WaitForApproval.findOne({_id: dataId});
  if(data.length === 1) {
    const document= {
      types: data.types,
      branch: data.branch,
      course: data.course,
      university: data.university,
      doc_of_college: data.doc_of_college,
      document: data.document,
      semester: data.semester,
      subject: data.subject,
      unit_covered: data,
      uploadedAt: data.uploadedAt
    };

    const userData = new Document(document);
    userData.save( (err,output) => {
      if(!err) {
        User.update({_id: data.uploadedBy}, {
          $push: {
            uploads: output._id
          }
        }, (error) => {
          if(!error) {
            res.status(200).json({
              success: true,
              message: 'Successfully Approved'
            });
          }
          else{
            res.status(404).json({
              success: false,
              message: 'Approval Failed'
            });
          }
        });
      }
    });
  }
  else{
    res.status(404).json({
      success: false,
      message: 'This data is already handeled'
    });
  }
});

router.post('/disapproval', (req,res) => {
  console.log(req.body);
});





module.exports = router;
