/*
============================================
; Title: User API profile
; Author: Professor Krasso
; Date:  16 Apr 2021
; Modified by: Devan Wong
;===========================================
*/
const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const ErrorResponse = require('../services/error-response');
const BaseResponse = require('../services/base-response');
// Configurations
const router = express.Router();
const saltRounds = 10; //Hashing algorithms.

/*
FindAll - Devan
*/
router.get('/', async(req, res) => {
  try
  {
    User.find({})
    .where('isDisables')
    .equals(false)
    .exec(function(err,users){
      if(err)
      {
        console.log(err);
        const findAllMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
        res.status(500).send(findAllMongodbErrorResponse.toObject());
      }
      else
      {
        console.log(users);
        const findAllMongodbUsersResponse = new BaseResponse(200, 'Query Successful', users);
        res.json(findAllMongodbUsersResponse.toObject());
      }
    })
  }
  catch (e)
  {
    const findAllMongodbCatchErrorResponse = new ErrorResponse(500, 'Internal server error', err);
    res.status(500).send(findAllMongodbCatchErrorResponse.toObject());
  }
})

/*
FindById - Anil
*/

/*
CreateUser - Anil
*/

/*
UpdateUser - Devan
*/
router.put('/:id', async(req, res) => {
  try
  {
    User.findOne({'_id': req.params.id}, function(err, user){
      if (err)
      {
        console.log(err);
        const updateUserMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
        res.status(500).send(updateUserMongodbErrorResponse.toObject());
      }
      else
      {
        console.log(user);
        user.set({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          phoneNumber: req.body.phoneNumber,
          address: req.body.address,
          email: req.body.email
        })
        user.save(function(err, savedUser){
          if(err)
          {
            console.log(err);
            const savedUserMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
            res.status(500).send(savedUserMongodbErrorResponse.toObject());
          }
          else
          {
            console.log(savedUser);
            const savedUserResponse = new BaseResponse(200, 'Query Successful', savedUser)
            res.json(savedUserResponse.toObject());
          }
        })
      }
    })
  }
  catch (e)
  {
    console.log(e);
    const updateUserCatchErrorResponse =  new ErrorResponse(500, 'Internal server error', e.message);
    res.status(500).send(updateUserCatchErrorResponse.toObject());
  }
})

/*
DeleteUser - Erica
*/
