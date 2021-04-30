/*
============================================
; Title:  Role Api
; Author: Professor Krasso
; Date:   29 Apr 2021
; Modified by: Devan Wong, Erica Perry, Anil Rayamajhi
; Description: Creating role apis
;===========================================
*/
// Require Statements
const express = require('express');
const Role = require('../models/role');
const User = require('../models/user');
const ErrorResponse = require('../services/error-response');
const BaseResponse = require('../services/base-response');


const router = express.Router();


/**
 * FindAll API
 * Method: GET
 *
 * @return JSON object with array of all roles with isDisabled set to false
 */
router.get('/', async (req, res) => {
  try {
    Role.find({})
      .where('isDisabled')
      .equals(false)
      .exec(function (err, roles)
      // handle mongoDB error
      {
        if (err) {
          console.log(err);
          const findAllRolesMongodbErrorResponse = new ErrorResponse(
            '500',
            'Internal server error',
            err
          );
          res.status(500).send(findAllRolesMongodbErrorResponse.toObject());
        }
        else
        // return roles with isDisabled set to false
        {
          console.log(roles);
          const findAllRolesResponse = new BaseResponse(
            '200',
            'Query Successful',
            roles
          );
          res.json(findAllRolesResponse.toObject());
        }
      })
  }
  catch (e)
  // Server error
  {
    console.log(e);
    const findAllRolesCatchErrorResponse = new ErrorResponse(
      '500',
      'Internal Server Error',
      e.message
    );
    res.status(500).send(findAllRolesCatchErrorResponse.toObject());
  }
});

/**
* Find By Id - Anil
*/


/**
* Create Role - Erica
*/

router.post('/', async (req, res) => {

  try {
    const newRole = {
      text: req.body.text
    }
    Role.create(newRole, function (err, role) {
      if (err) {
        console.log(err);
        const createRoleMongodbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
        res.status(500).send(createRoleMongodbErrorResponse.toObject());
      }
      else {
        console.log(role);
        const createRoleResponse = new BaseResponse('200', 'Query successful', role);
        res, json(createRoleResponse.toObject());

      }
    })
  }
  catch (e) {
    console.log(e);
    const createRoleCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e.message);
    res.status(500).send(createRoleCatchErrorResponse.toObject());
  }
})


/**
 * UpdateRoleAPI
 * Method: PUT
 *
 * @return Update Role
 */
router.put('/:roleId', async (req, res) => {
  try {
    Role.findOne(
      { '_id': req.params.roleId },
      function (err, role)
      // handle mongoDB error
      {
        if (err) {
          console.log(err);
          const updateRoleMongodbErrorResponse = new ErrorResponse(
            '500',
            'Internal server error',
            err
          );
          res.status(500).send(updateRoleMongodbErrorResponse.toObject());
        }
        else {
          console.log(role);
          // Scaffold Role with request data
          role.set({
            text: req.body.text
          });
          // Persist new Role
          role.save(function (err, updatedRole)
          // handle mongoDB error
          {
            if (err) {
              console.log(err);
              const updatedRoleMongodbErrorResponse = new ErrorResponse(
                '500',
                'Internal server error',
                err
              );
              res.status(500).send(updatedRoleMongodbErrorResponse.toObject());
            }
            else
            // return Saved Security Question
            {
              console.log(updatedRole);
              const updateRoleResponse = new BaseResponse(
                '200',
                'Query Successful',
                updatedRole
              );
              res.json(updateRoleResponse.toObject());
            }
          })
        }
      })
  }
  catch (e) {
    // Server error
    console.log(e);
    const updatedRoleCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e.message);
    res.status(500).send(updatedRoleCatchErrorResponse.toObject());
  }
})

/**
 * Delete Role - Anil
 */
