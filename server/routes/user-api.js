/*
============================================
; Title: User API profile
; Author: Professor Krasso
; Date:  28 Apr 2021
; Modified by: Devan Wong, Anil Rayamajhi, Erica Perry
; Description: user aoi routes and controller
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

/**
 * FindAll API
 * Method: GET
 *
 * @return JSON object with array of all users with isDisabled set to false
 */
router.get('/', async (req, res) => {
  try {
    User.find({})
      .where('isDisabled')
      .equals(false)
      .exec(function (err, users) {
        if (err) {
          // handle mongoDB error
          console.log(err);
          const findAllMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
          res.status(500).send(findAllMongodbErrorResponse.toObject());
        }
        else {
          // return users array with isDisabled set to false
          console.log(users);
          const findAllMongodbUsersResponse = new BaseResponse(200, 'Query Successful', users);
          res.json(findAllMongodbUsersResponse.toObject());
        }
      })
  }
  catch (e) {
    // Server error
    const findAllMongodbCatchErrorResponse = new ErrorResponse(500, 'Internal server error', err);
    res.status(500).send(findAllMongodbCatchErrorResponse.toObject());
  }
})

/**
 * FindById API
 * Method: GET
 *
 * @return JSON object matching params id
 */
router.get('/:id', async (req, res) => {
  let status = 200;
  try {
    User.findOne({ '_id': req.params.id }, function (err, securityQuestion) {
      // handle mongoDB error
      if (err) {
        console.log(err);
        status = 500
        const findByIdMongodbErrorResponse = new ErrorResponse(status, 'Internal server error', err);
        return res.status(status).send(findByIdMongodbErrorResponse.toObject());

      }

      // user object matching params id
      console.log(securityQuestion);
      const findByIdResponse = new BaseResponse(status, 'Query successful', securityQuestion);
      return res.status(status).send(findByIdResponse.toObject());


    })
  } catch (e) {
    // Server error
    console.log(e);
    status = 500
    const findByIdCatchResponse = new ErrorResponse(status, 'Internal server error', e.message);
    res.status(status).send(findByIdCatchResponse.toObject());
  }
})

/**
 * Create CreateUser API
 * Method: POST
 *
 * @return Security Question
 */
router.post('/', async (req, res) => {
  let status = 201;
  try {
    // salt hash password
    const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
    // Set Standard as default role
    const standardRole = {
      role: 'standard'
    }

    // Scaffold User with request data
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

      // persisted new User
      console.log(user);
      const createUserResponse = new BaseResponse(status, 'Query Successful', user);
      return res.status(status).send(createUserResponse.toObject());


    })
  }
  catch (error) {
    // Server error
    console.log(error);
    status = 500;
    const createUserCatchErrorResponse = new ErrorResponse(status, 'Internal server error', error.message);
    res.status(status).send(createUserCatchErrorResponse.toObject());
  }
});

/**
 * UpdateUserAPI
 * Method: PUT
 *
 * @return Update User
 */
router.put('/:id', async (req, res) => {
  try {
    User.findOne({ '_id': req.params.id }, function (err, user) {
      // handle mongoDB error
      if (err) {
        console.log(err);
        const updateUserMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
        res.status(500).send(updateUserMongodbErrorResponse.toObject());
      }
      else {
        console.log(user);
        // Scaffold User with request data
        user.set({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          phoneNumber: req.body.phoneNumber,
          address: req.body.address,
          email: req.body.email
        })
        user.save(function (err, savedUser) {
          // handle mongoDB error
          if (err) {
            console.log(err);
            const savedUserMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
            res.status(500).send(savedUserMongodbErrorResponse.toObject());
          }
          else {
            // return Saved User
            console.log(savedUser);
            const savedUserResponse = new BaseResponse(200, 'Query Successful', savedUser)
            res.json(savedUserResponse.toObject());
          }
        })
      }
    })
  }
  catch (e) {
    // Server error
    console.log(e);
    const updateUserCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
    res.status(500).send(updateUserCatchErrorResponse.toObject());
  }
})

/**
 * DeleteUser API
 * Method: DELETE
 *
 * @return Delete User matching request params id
 */
router.delete('/:id', async (req, res) => {
  try {

    User.findOne({ '_id': req.params.id }, function (err, user) {
      // handle mongoDB error
      if (err) {
        console.log(err);
        const deleteUserMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
        return res.status(500).send(deleteUserMongodbErrorResponse.toObject());

      }

      // handle User is not found in Database
      if (!user) {
        console.log('User not found');
        const notFoundResponse = new BaseResponse(401, 'User not found');
        return res.status(401).send(notFoundResponse.toObject());
      }

      console.log(user);

      // Scaffold User with request data
      user.set({
        isDisabled: true
      });

      user.save(function (err, savedUser) {
        // handle mongoDB error
        if (err) {
          console.log(err);
          const savedUserMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
          return res.status(500).send(savedUserMongodbErrorResponse.toObject());


        }

        console.log(savedUser);
        // Return deleted User id
        const deleteSecurityQuestionResponse = new BaseResponse(200, 'Query successful', req.params.id);
        return res.json(deleteSecurityQuestionResponse.toObject());

      })
    })
  } catch (e) {
    // Server error
    console.log(e);
    const deleteUserCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
    return res.status(500).send(deleteUserCatchErrorResponse.toObject());

  }

});

/**
 * FindSelectedSecurityQuestion API :
 * Method: GET
 *
 * @return
 */
router.get('/:userName/security-questions', async (req, res) => {

  try {
    User.findOne({ 'userName': req.params.userName }, function (err, user) {
      // handle mongoDB error
      if (err) {
        console.log(err);
        const findSelectedSecurityQuestionsMongodbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
        res.status(500).send(findSelectedSecurityQuestionsMongodbErrorResponse.toObject());

      }
      else
      {

      // user object matching params id
      console.log(user);
      const findSelectedSecurityQuestionsResponse = new BaseResponse('200', 'Query successful', user.selectedSecurityQuestions);
      res.json(findSelectedSecurityQuestionsResponse.toObject());
      }


    })
  } catch (e) {
    // Server error
    console.log(e);
    const findSelectedSecurityQuestionsCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e);
    res.status(500).send(findSelectedSecurityQuestionsCatchErrorResponse.toObject());
  }
})


 /**
 * findUserRole - Erica
 */



module.exports = router;
