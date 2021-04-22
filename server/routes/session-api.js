/*
============================================
; Title: session-api.js
; Author: Professor Krasso
; Date:  21 Apr 2021
; Modified by: Anil Rayamajhi
;===========================================
*/


const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const ErrorResponse = require('../services/error-response');
const BaseResponse = require('../services/base-response');


const router = express.Router();

/**
 * Method: POST
 *
 * SignIn Route and Controller
 * @return User object
 */
router.post('/signin', async (req, res) => {
  let status = 200;
  try {
    User.findOne({ 'userName': req.body.userName, 'isDisabled': false }, function (err, user) {
      if (err) {
        console.log('Error finding userName', err)
        status = 500;
        const signinMongoDBErrorResponse = new ErrorResponse(status, "Internal server error", err)
        return res.status(status).send(signinMongoDBErrorResponse.toObject());
      }

      // handle falsey user
      if (!user) {
        console.log('User not found', req.body.userName);
        status = 401;
        const invalidUserNameResponse = new BaseResponse(status, "User not found")
        return res.status(status).send(invalidUserNameResponse.toObject());
      }

      console.log('User Object', user)
      // bcrypt library to compare saved hashed password against request password
      let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

      // if password is invalid
      if (!passwordIsValid) {
        console.log('Invalid password', user.userName)
        status = 401;
        const invalidPasswordResponse = new BaseResponse(status, "Invalid username and/or password")
        return res.status(status).send(invalidPasswordResponse.toObject());
      }

      console.log('Login Successful');

      const signinResponse = new BaseResponse(status, "Login successful", user)
      return res.status(status).send(signinResponse.toObject());

    })
  } catch (error) {
    // Server error
    console.log(error)
    status = 500;
    const signinCatchErrorResponse = new ErrorResponse(status, "Internal server error", error.message)
    return res.status(status).send(signinCatchErrorResponse.toObject());
  }
})

/**
 * Method: POST
 *
 * Register
 * @return createUser
 */
 router.post('/register', async(req, res) => {
   try
   {
     User.findOne({'userName': req.body.userName}, function(err, user)
     {
       if(err)
       {
         console.log(err);
         const registerUserMongodbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
         res.status(500).send(registerUserMongodbErrorResponse.toObject());
       }
       else
       {
         if(!user)
         {
           let hashedPassword = bcrypt.hashSync(req.body.password, saltRounds); //salt/hash the password
           standardRole = {
             role: 'standard'
           }
           //user Object
           let registeredUser = {
             userName: req.body.userName,
             password: hashedPassword,
             firstName: req.body.firstName,
             lastName: req.body.lastName,
             phoneNumber: req.body.phoneNumber,
             address: req.body.address,
             email: req.body.email,
             role: standardRole,
             selectedSecurityQuestions: req.body.selectedSecurityQuestions
           };

           User.create(registeredUser, function(err, newUser)
           {
             if(err)
             {
               console.log(err);
               const newUserMongodbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
               res.status(500).send(newUserMongodbErrorResponse.toObject());
             }
             else
             {
               console.log(newUser);
               const registeredUserResponse = new BaseResponse('200', 'Query Successful', newUser);
               res.json(registeredUserResponse.toObject());
             }
           })
         }
         else
         {
           console.log('This provided username already exists in our system');
           const userAlreadyExistsErrorResponse = new ErrorResponse('500', 'User already exists in our system', null);
           res.status(500).send(userAlreadyExistsErrorResponse.toObject());
         }
       }
     })
   }
   catch(e)
   {
     // Server error
     console.log(e);
     const registerUserCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e.message);
     res.status(500).send(registerUserCatchErrorResponse.toObject());
   }
 });


 /**
 * Method: POST
 *
 * Reset Password: DEVAN
 * @return
 */


/**
 * Method: GET
 *
 * VerifyUser: ANIL
 * @return
 */


 /**
 * Method: POST
 *
 * Verify security - ERICA
 * @return
 */




module.exports = router
