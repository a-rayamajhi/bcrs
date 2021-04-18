/*
============================================
; Title:  security question Api
; Author: Erica perry
; Date:   17 Apr 2021
; Modified by: Devan Wong, Erica Perry
; Description: Creating security questions apis
;===========================================
*/

const express = require('express');
const SecurityQuestion = require('../models/security-question');
const ErrorResponse = require('../services/error-response');
const BaseResponse = require('../services/base-response');

// Instance of Express Router
const router = express.Router();

/*
FindAll
*/
router.get('/', async (req, res) => {
  try {
    SecurityQuestion.find({})
      .where('isDisabled')
      .equals(false)
      .exec(function (err, securityQuestions) {
        if (err) {
          console.log(err);
          const findAllMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
          res.status(500).send(findAllMongodbErrorResponse.toObject());
        }
        else {
          console.log(securityQuestions);
          const findAllResponse = new BaseResponse(200, 'Query successful', securityQuestions)
          res.json(findAllResponse.toObject());
        }
      })
  }
  catch (e) {
    console.log(e);
    const findAllCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
    res.status(500).send(findAllCatchErrorResponse.toObject());
  }
});

/*
FindById
*/
router.get('/:id', async (req, res) => {
  try {
    SecurityQuestion.findOne({ '_id': req.params.id }, function (err, securityQuestion) {
      if (err) {
        console.log(err);
        const findByIdMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
        res.status(500).send(findByIdMongodbErrorResponse.toObject());

      }
      else {
        console.log(securityQuestion);
        const findByIdResponse = new BaseResponse(200, 'Query successful', securityQuestion);
        res.json(findByIdResponse.toObject());

      }
    })
  } catch (e) {
    console.log(e);
    const findByIdCatchResponse = new ErrorResponse(500, 'Internal server error', e.message);
    res.status(500).send(findByIdCatchResponse.toObject());
  }
})

/*
CreateSecurityApi - Anil
*/

/*
UpdateSecurityAPI
*/
router.put('/:id', async (req, res) => {
  try {
    SecurityQuestion.findOne({ '_id': req.params.id }, function (err, securityQuestion) {
      if (err) {
        console.log(err);
        const updateSecurityQuestionMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
        res.status(500).send(updateSecurityQuestionMongodbErrorResponse.toObject());
      }
      else {
        console.log(securityQuestion);
        securityQuestion.set({
          text: req.body.text
        });

        securityQuestion.save(function (err, savedSecurityQuestion) {
          if (err) {
            console.log(err);
            const savedSecurityQuestionMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
            res.status(500).send(savedSecurityQuestionMongodbErrorResponse.toObject());
          }
          else {
            console.log(savedSecurityQuestion);
            const updateSecurityQuestionResponse = new BaseResponse(200, 'Query sucessful', savedSecurityQuestion);
            res.json(updateSecurityQuestionResponse.toObject());
          }
        })
      }
    })
  }
  catch (e) {
    console.log(e);
    const updateSecurityQuestionCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
    res.status(500).send(updateSecurityQuestionCatchErrorResponse.toObject());
  }
});

/*
DeleteSecurityAPI
*/
router.delete('/:id', async (req, res) => {
  try {

    SecurityQuestion.findOne({ '_id': req.params.id }, function (err, SecurityQuestion) {
      if (err) {
        console.log(err);
        const deleteSecurityQuestionMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
        res.status(500).send(deleteSecurityQuestionMongodbErrorResponse.toObject());

      } else {
        console.log(SecurityQuestion);

        SecurityQuestion.set({
          isDisabled: true
        });

        SecurityQuestion.save(function (err, savedSecurityQuestion) {
          if (err) {
            console.log(err);
            const savedSecurityQuestionMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
            res.status(500).send(savedSecurityQuestionMongodbErrorResponse.toObject());


          } else {
            console.log(savedSecurityQuestion);
            const deleteSecurityQuestionResponse = new BaseResponse(200, 'Query successful', deletedSecurityQuestion);
            res.json(deleteSecurityQuestionResponse.toObject());

          }

        })
      }
    })
  } catch (e) {
    console.log(e);
    const deleteSecurityQuestionCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
    res.status(500).send(deleteSecurityQuestionCatchErrorResponse.toObject());

  }

});


module.exports = router;
