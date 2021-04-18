/*
============================================
; Title: session-api.js
; Author: Professor Krasso
; Date:  17 Apr 2021
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
 * Description: SignIn Route and Controller
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
    console.log(error)
    status = 500;
    const signinCatchErrorResponse = new ErrorResponse(status, "Internal server error", error.message)
    return res.status(status).send(signinCatchErrorResponse.toObject());
  }
})


module.exports = router
