/*
============================================
; Title: User API profile
; Author: Professor Krasso
; Date:  17 Apr 2021
; Modified by: Devan Wong, Anil Rayamajhi
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
router.get('/', async (req, res) => {
  try {
    User.find({})
      .where('isDisabled')
      .equals(false)
      .exec(function (err, users) {
        if (err) {
          console.log(err);
          const findAllMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
          res.status(500).send(findAllMongodbErrorResponse.toObject());
        }
        else {
          console.log(users);
          const findAllMongodbUsersResponse = new BaseResponse(200, 'Query Successful', users);
          res.json(findAllMongodbUsersResponse.toObject());
        }
      })
  }
  catch (e) {
    const findAllMongodbCatchErrorResponse = new ErrorResponse(500, 'Internal server error', err);
    res.status(500).send(findAllMongodbCatchErrorResponse.toObject());
  }
})

/*
* FindById
*/
router.get('/:id', async (req, res) => {
  let status = 200;
  try {
    User.findOne({ '_id': req.params.id }, function (err, securityQuestion) {
      if (err) {
        console.log(err);
        status = 500
        const findByIdMongodbErrorResponse = new ErrorResponse(status, 'Internal server error', err);
        return res.status(status).send(findByIdMongodbErrorResponse.toObject());

      }

      console.log(securityQuestion);
      const findByIdResponse = new BaseResponse(status, 'Query successful', securityQuestion);
      return res.status(status).send(findByIdResponse.toObject());


    })
  } catch (e) {
    console.log(e);
    status = 500
    const findByIdCatchResponse = new ErrorResponse(status, 'Internal server error', e.message);
    res.status(status).send(findByIdCatchResponse.toObject());
  }
})


/**
 * CreateUser
 */
router.post('/', async (req, res) => {
  let status = 201;
  try {
    // salt hash password
    const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
    const standardRole = {
      text: 'standard'
    }

    const newUser = {
      userName: req.body.userName,
      password: hashedPassword,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      email: req.body.email,
      role: standardRole
    }

    User.create(newUser, function (err, user) {
      if (err) {
        console.log(err);
        status = 500;
        const createUserMongodbErrorResponse = new ErrorResponse(status, 'Internal server error', err);
        return res.status(status).send(createUserMongodbErrorResponse.toObject());
      }

      console.log(user);
      const createUserResponse = new BaseResponse(status, 'Query Successful', user);
      return res.status(status).send(createUserResponse.toObject());


    })
  }
  catch (error) {
    console.log(error);
    status = 500;
    const createUserCatchErrorResponse = new ErrorResponse(status, 'Internal server error', error.message);
    res.status(status).send(createUserCatchErrorResponse.toObject());
  }
});
/*
UpdateUser
*/
router.put('/:id', async (req, res) => {
  try {
    User.findOne({ '_id': req.params.id }, function (err, user) {
      if (err) {
        console.log(err);
        const updateUserMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
        res.status(500).send(updateUserMongodbErrorResponse.toObject());
      }
      else {
        console.log(user);
        user.set({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          phoneNumber: req.body.phoneNumber,
          address: req.body.address,
          email: req.body.email
        })
        user.save(function (err, savedUser) {
          if (err) {
            console.log(err);
            const savedUserMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
            res.status(500).send(savedUserMongodbErrorResponse.toObject());
          }
          else {
            console.log(savedUser);
            const savedUserResponse = new BaseResponse(200, 'Query Successful', savedUser)
            res.json(savedUserResponse.toObject());
          }
        })
      }
    })
  }
  catch (e) {
    console.log(e);
    const updateUserCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
    res.status(500).send(updateUserCatchErrorResponse.toObject());
  }
})


/*
* DeleteUser API
*/
router.delete('/:id', async (req, res) => {
  try {

    User.findOne({ '_id': req.params.id }, function (err, user) {
      if (err) {
        console.log(err);
        const deleteUserMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
        return res.status(500).send(deleteUserMongodbErrorResponse.toObject());

      }

      if (!user) {
        console.log('User not found');
        const notFoundResponse = new BaseResponse(401, 'User not found');
        return res.status(401).send(notFoundResponse.toObject());
      }

      console.log(user);
      User.set({
        isDisabled: true
      });

      User.save(function (err, savedUser) {
        if (err) {
          console.log(err);
          const savedUserMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
          return res.status(500).send(savedUserMongodbErrorResponse.toObject());


        }

        console.log(savedUser);
        const deleteSecurityQuestionResponse = new BaseResponse(200, 'Query successful', req.params.id);
        return res.json(deleteSecurityQuestionResponse.toObject());

      })
    })
  } catch (e) {
    console.log(e);
    const deleteUserCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
    res.status(500).send(deleteUserCatchErrorResponse.toObject());

  }

});

module.exports = router;
