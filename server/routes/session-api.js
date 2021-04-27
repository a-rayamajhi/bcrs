/*
============================================
; Title: session-api.js
; Author: Professor Krasso
; Date:  21 Apr 2021
; Modified by: Anil Rayamajhi, Erica Perry
;===========================================
*/

const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const ErrorResponse = require("../services/error-response");
const BaseResponse = require("../services/base-response");
const user = require("../models/user");

const router = express.Router();
const saltRounds = 10; //Hashing algorithms.

/**
 * Method: POST
 *
 * SignIn Route and Controller
 * @return User object
 */
router.post("/signin", async (req, res) => {
  let status = 200;
  try {
    User.findOne(
      { userName: req.body.userName, isDisabled: false },
      function (err, user) {
        if (err) {
          console.log("Error finding userName", err);
          status = 500;
          const signinMongoDBErrorResponse = new ErrorResponse(
            status,
            "Internal server error",
            err
          );
          return res.status(status).send(signinMongoDBErrorResponse.toObject());
        }

        // handle falsey user
        if (!user) {
          console.log("User not found", req.body.userName);
          status = 401;
          const invalidUserNameResponse = new BaseResponse(
            status,
            "User not found"
          );
          return res.status(status).send(invalidUserNameResponse.toObject());
        }

        console.log("User Object", user);
        // bcrypt library to compare saved hashed password against request password
        let passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );

        // if password is invalid
        if (!passwordIsValid) {
          console.log("Invalid password", user.userName);
          status = 401;
          const invalidPasswordResponse = new BaseResponse(
            status,
            "Invalid username and/or password"
          );
          return res.status(status).send(invalidPasswordResponse.toObject());
        }

        console.log("Login Successful");

        const signinResponse = new BaseResponse(
          status,
          "Login successful",
          user
        );
        return res.status(status).send(signinResponse.toObject());
      }
    );
  } catch (error) {
    // Server error
    console.log(error);
    status = 500;
    const signinCatchErrorResponse = new ErrorResponse(
      status,
      "Internal server error",
      error.message
    );
    return res.status(status).send(signinCatchErrorResponse.toObject());
  }
});

/**
 * Method: POST
 *
 * Register
 * @return createUser
 */
router.post("/register", async (req, res) => {
  try {
    User.findOne({ userName: req.body.userName }, function (err, user) {
      if (err) {
        console.log(err);
        const registerUserMongodbErrorResponse = new ErrorResponse(
          "500",
          "Internal server error",
          err
        );
        res.status(500).send(registerUserMongodbErrorResponse.toObject());
      } else {
        if (!user) {
          let hashedPassword = bcrypt.hashSync(req.body.password, saltRounds); //salt/hash the password
          standardRole = {
            role: "standard",
          };
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
            selectedSecurityQuestions: req.body.selectedSecurityQuestions,
          };

          User.create(registeredUser, function (err, newUser) {
            if (err) {
              console.log(err);
              const newUserMongodbErrorResponse = new ErrorResponse(
                "500",
                "Internal server error",
                err
              );
              res.status(500).send(newUserMongodbErrorResponse.toObject());
            } else {
              console.log(newUser);
              const registeredUserResponse = new BaseResponse(
                "200",
                "Query Successful",
                newUser
              );
              res.json(registeredUserResponse.toObject());
            }
          });
        } else {
          console.log("This provided username already exists in our system");
          const userAlreadyExistsErrorResponse = new ErrorResponse(
            "500",
            "User already exists in our system",
            null
          );
          res.status(500).send(userAlreadyExistsErrorResponse.toObject());
        }
      }
    });
  } catch (e) {
    // Server error
    console.log(e);
    const registerUserCatchErrorResponse = new ErrorResponse(
      "500",
      "Internal server error",
      e.message
    );
    res.status(500).send(registerUserCatchErrorResponse.toObject());
  }
});

/**
 * Method: POST
 *
 * Reset Password
 * @return
 */
router.post("/users/:userName/reset-password", async (req, res) => {
  try {
    const password = req.body.password;

    User.findOne({ userName: req.params.userName }, function (err, user) {
      if (err) {
        console.log(err);
        const resetPasswordMondoDBErrorResponse = new ErrorResponse(
          "500",
          "Internal Server Error",
          err
        );
        return res
          .status(500)
          .send(resetPasswordMondoDBErrorResponse.toObject());
      }

      if (!user) {
        const verifyUserNotFound = new ErrorResponse("404", "Record Not Found");
        return res.status(404).send(verifyUserNotFound.toObject());
      }

      console.log(user);
      const hashedPassword = bcrypt.hashSync(password, saltRounds);

      user.set({
        password: hashedPassword,
      });

      user.save((err, updatedUser) => {
        if (err) {
          console.log(err);
          const updatedUserMondoDBErrorResponse = new ErrorResponse(
            "500",
            "Internal Server Error",
            err
          );
          return res
            .status(500)
            .send(updatedUserMondoDBErrorResponse.toObject());
        }

        console.log(updatedUser);
        const updatedUserPasswordResponse = new BaseResponse(
          "200",
          "Query successful",
          updatedUser
        );
        return res.status(200).send(updatedUserPasswordResponse.toObject());
      });
    });
  } catch (error) {
    console.log(error);
    const resetPasswordCatchErrorResponse = new ErrorResponse(
      "500",
      "Internal Server Error",
      e.message
    );
    return res.status(500).send(resetPasswordCatchErrorResponse.toObject());
  }
});

/**
 * Method: GET
 *
 * VerifyUser API
 * @return
 */
router.get("/verify/users/:userName", async (req, res) => {
  try {
    User.findOne({ userName: req.params.userName }, function (err, user) {
      if (err) {
        console.log(err);
        const verifyUserMongoDBErrorResponse = new ErrorResponse(
          "500",
          "Internal Server Error",
          err
        );
        return res.status(500).send(verifyUserMongoDBErrorResponse.toObject());
      }

      if (!user) {
        const verifyUserNotFound = new ErrorResponse("404", "Record Not Found");
        return res.status(404).send(verifyUserNotFound.toObject());
      }

      console.log(user);
      const verifyUserResponse = new BaseResponse(
        "200",
        "Query successful",
        user
      );
      return res.status(200).send(verifyUserResponse.toObject());
    });
  } catch (error) {
    console.log(error);
    const verifyUserCatchErrorResponse = new ErrorResponse(
      "500",
      "Internal Server Error",
      e.message
    );
    return res.status(500).send(verifyUserCatchErrorResponse.toObject());
  }
});

/**
 * Method: POST
 *
 * Verify security Questions API
 * @return
 */
router.post("/verify/users/:userName/security-questions", async (req, res) => {
  try {
    User.findOne({ userName: req.params.userName }, function (err, user) {
      if (err) {
        console.log(err);
        const verifySecurityQuestionsMongodbErrorResponse = new ErrorResponse(
          "500",
          "Internal server error",
          err
        );
        return res
          .status(500)
          .send(verifySecurityQuestionsMongodbErrorResponse.toObject());
      }

      if (!user) {
        const verifyUserNotFound = new ErrorResponse("404", "Record Not Found");
        return res.status(404).send(verifyUserNotFound.toObject());
      }

      console.log(user);

      // Map Question
      const selectedSecurityQuestionOne = user.selectedSecurityQuestions.find(
        (q) => q.questionText === req.body.questionText1
      );
      const selectedSecurityQuestionTwo = user.selectedSecurityQuestions.find(
        (q2) => q2.questionText === req.body.questionText2
      );
      const selectedSecurityQuestionThree = user.selectedSecurityQuestions.find(
        (q3) => q3.questionText === req.body.questionText3
      );

      // Compare responses
      const isValidAnswerOne =
        selectedSecurityQuestionOne.answerText === req.body.answerText1;
      const isValidAnswerTwo =
        selectedSecurityQuestionTwo.answerText === req.body.answerText2;
      const isValidAnswerThree =
        selectedSecurityQuestionThree.answerText === req.body.answerText3;

      // if password is invalid
      if (isValidAnswerOne && isValidAnswerTwo && isValidAnswerThree) {
        console.log(
          `User, ${user.userName} security question was answered correctly`
        );
        const validSecurityQuestionsResponse = new BaseResponse(
          "200",
          "success",
          user
        );
        return res.status(200).send(validSecurityQuestionsResponse.toObject());
      }

      console.log(
        `User ${user.userName} security question was not answered correctly`
      );
      const invalidSecurityQuestionsResponse = new BaseResponse("200", "error");
      return res.status(200).send(invalidSecurityQuestionsResponse.toObject());
    });
  } catch (e) {
    // Server error
    console.log(e);
    const verifySecurityQuestionsCatchErrorResponse = new ErrorResponse(
      "500",
      "Internal server error",
      e.message
    );
    res.status(500).send(verifySecurityQuestionsCatchErrorResponse.toObject());
  }
});

module.exports = router;
