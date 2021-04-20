/*
============================================
; Title:  security question Api
; Author: Professor Krasso
; Date:   17 Apr 2021
; Modified by: Devan Wong, Erica Perry, Anil Rayamajhi
; Description: Creating security questions apis
;===========================================
*/

const express = require('express');
const SecurityQuestion = require('../models/security-question');
const ErrorResponse = require('../services/error-response');
const BaseResponse = require('../services/base-response');

// Instance of Express Router
const router = express.Router();

/**
 * FindAll API
 * Method: GET
 *
 * @return JSON object with array of all securityQuestions with isDisabled set to false
 */
router.get('/', async (req, res) => {
  try {
    SecurityQuestion.find({})
      .where('isDisabled')
      .equals(false)
      .exec(function (err, securityQuestions) {
        // handle mongoDB error
        if (err) {
          console.log(err);
          const findAllMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
          res.status(500).send(findAllMongodbErrorResponse.toObject());
        }
        else {
          // return securityQuestions with isDisabled set to false
          console.log(securityQuestions);
          const findAllResponse = new BaseResponse(200, 'Query successful', securityQuestions)
          res.json(findAllResponse.toObject());
        }
      })
  }
  catch (e) {
    // Server error
    console.log(e);
    const findAllCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
    res.status(500).send(findAllCatchErrorResponse.toObject());
  }
});

/**
 * FindById API
 * Method: GET
 *
 * @return JSON object matching params id
 */
router.get('/:id', async (req, res) => {
  try {
    SecurityQuestion.findOne({ '_id': req.params.id }, function (err, securityQuestion) {
      // handle mongoDB error
      if (err) {
        console.log(err);
        const findByIdMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
        res.status(500).send(findByIdMongodbErrorResponse.toObject());

      }
      else {
        // securityQuestion object matching params id
        console.log(securityQuestion);
        const findByIdResponse = new BaseResponse(200, 'Query successful', securityQuestion);
        res.json(findByIdResponse.toObject());

      }
    })
  } catch (e) {
    // Server error
    console.log(e);
    const findByIdCatchResponse = new ErrorResponse(500, 'Internal server error', e.message);
    res.status(500).send(findByIdCatchResponse.toObject());
  }
})

/**
 * Create SecurityQuestion API
 * Method: POST
 *
 * @return Security Question
 */
router.post('/', async (req, res) => {
  let status = 200;
  try {
    const newSecurityQuestion = {
      text: req.body.text
    }
    SecurityQuestion.create(newSecurityQuestion, function (err, securityQuestion) {
      // handle mongoDB error
      if (err) {
        console.log(err);
        status = 500;
        const createSecurityQuestionMongodbErrorResponse = new ErrorResponse(status, 'Internal server error', err);
        return res.status(status).send(createSecurityQuestionMongodbErrorResponse.toObject());
      }

      // persisted new securityQuestion
      console.log(securityQuestion);
      const createSecurityQuestionResponse = new BaseResponse(status, 'Query Successful', securityQuestion);
      return res.status(status).send(createSecurityQuestionResponse.toObject());


    })
  }
  catch (error) {
    // Server error
    console.log(error);
    status = 500;
    const createSecurityQuestionCatchErrorResponse = new ErrorResponse(status, 'Internal server error', error.message);
    res.status(status).send(createSecurityQuestionCatchErrorResponse.toObject());
  }
});

/**
 * UpdateSecurityAPI
 * Method: PUT
 *
 * @return Update Security Question
 */
router.put('/:id', async (req, res) => {
  try {
    SecurityQuestion.findOne({ '_id': req.params.id }, function (err, securityQuestion) {
      // handle mongoDB error
      if (err) {
        console.log(err);
        const updateSecurityQuestionMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
        res.status(500).send(updateSecurityQuestionMongodbErrorResponse.toObject());
      }
      else {
        console.log(securityQuestion);
        // Scaffold SecurityQuestion with request data
        securityQuestion.set({
          text: req.body.text
        });

        // Persist new SecurityQuestion
        securityQuestion.save(function (err, savedSecurityQuestion) {
          // handle mongoDB error
          if (err) {
            console.log(err);
            const savedSecurityQuestionMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
            res.status(500).send(savedSecurityQuestionMongodbErrorResponse.toObject());
          }
          else {
            // return Saved Security Question
            console.log(savedSecurityQuestion);
            const updateSecurityQuestionResponse = new BaseResponse(200, 'Query sucessful', savedSecurityQuestion);
            res.json(updateSecurityQuestionResponse.toObject());
          }
        })
      }
    })
  }
  catch (e) {
    // Server error
    console.log(e);
    const updateSecurityQuestionCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
    res.status(500).send(updateSecurityQuestionCatchErrorResponse.toObject());
  }
});

/**
 * DeleteSecurityQuestionAPI
 * Method: DELETE
 *
 * @return Deleted Security Question id
 */
router.delete('/:id', async (req, res) => {
  try {
    SecurityQuestion.findOne({ '_id': req.params.id }, function (err, securityQuestion) {
      if (err) {
        // handle mongoDB error
        console.log(err);
        const deleteSecurityQuestionMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
        return res.status(500).send(deleteSecurityQuestionMongodbErrorResponse.toObject());

      }

      // handle Question is not found in Database
      if (!SecurityQuestion) {
        console.log('Question not found');
        const notFoundResponse = new BaseResponse(401, 'Question not found');
        return res.status(401).send(notFoundResponse.toObject());
      }

      console.log(SecurityQuestion);

      // Scaffold SecurityQuestion with request data
      securityQuestion.set({
        isDisabled: true
      });

      securityQuestion.save(function (err, savedSecurityQuestion) {
        // handle mongoDB error
        if (err) {
          console.log(err);
          const savedSecurityQuestionMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
          return res.status(500).send(savedSecurityQuestionMongodbErrorResponse.toObject());
        }

        console.log(savedSecurityQuestion);
        // Return deleted security question id
        const deleteSecurityQuestionResponse = new BaseResponse(200, 'Query successful', req.params.id);
        return res.json(deleteSecurityQuestionResponse.toObject());

      })
    })
  } catch (e) {
    // Server error
    console.log(e);
    const deleteSecurityQuestionCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
    return res.status(500).send(deleteSecurityQuestionCatchErrorResponse.toObject());

  }

});


module.exports = router;
