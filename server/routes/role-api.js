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
const express = require("express");
const Role = require("../models/role");
const User = require("../models/user");
const ErrorResponse = require("../services/error-response");
const BaseResponse = require("../services/base-response");

const router = express.Router();

/**
 * FindAll API
 * Method: GET
 *
 * @return JSON object with array of all roles with isDisabled set to false
 */
router.get("/", async (req, res) => {
  try {
    Role.find({})
      .where("isDisabled")
      .equals(false)
      .exec(function (
        err,
        roles // handle mongoDB error
      ) {
        if (err) {
          console.log(err);
          const findAllRolesMongodbErrorResponse = new ErrorResponse(
            "500",
            "Internal server error",
            err
          );
          res.status(500).send(findAllRolesMongodbErrorResponse.toObject());
        }
        // return roles with isDisabled set to false
        else {
          console.log(roles);
          const findAllRolesResponse = new BaseResponse(
            "200",
            "Query Successful",
            roles
          );
          res.json(findAllRolesResponse.toObject());
        }
      });
  } catch (
    e
    // Server error
  ) {
    console.log(e);
    const findAllRolesCatchErrorResponse = new ErrorResponse(
      "500",
      "Internal Server Error",
      e.message
    );
    res.status(500).send(findAllRolesCatchErrorResponse.toObject());
  }
});

/**
 * Find By Id API
 * Method: GET
 *
 * @return JSON object
 */
router.get("/:roleId", async (req, res) => {
  try {
    Role.findOne({ _id: req.params.roleId }, function (err, role) {
      if (err) {
        console.log(err);
        const findRoleByIdMongodbErrorResponse = new ErrorResponse(
          "500",
          "Internal server error",
          err
        );
        return res
          .status(500)
          .send(findRoleByIdMongodbErrorResponse.toObject());
      }

      // handle Role is not found in Database
      if (!role) {
        console.log("Role not found");
        const notFoundResponse = new BaseResponse(404, "Role not found");
        return res.status(404).send(notFoundResponse.toObject());
      }

      console.log(role);
      const findRoleByIdResponse = new BaseResponse(
        "200",
        "Query Successful",
        role
      );
      return res.status(200).send(findRoleByIdResponse.toObject());
    });
  } catch (error) {
    console.log(error);
    const findRoleByIdCatchErrorResponse = new ErrorResponse(
      "500",
      "Internal Server Error",
      error.message
    );
    return res.status(500).send(findRoleByIdCatchErrorResponse.toObject());
  }
});

/**
 * Create Role API
 * Method: POST
 *
 * @return Role Object
 */
router.post("/", async (req, res) => {
  try {
    const newRole = {
      text: req.body.text,
    };

    Role.create(newRole, function (err, role) {
      if (err) {
        console.log(err);
        const createRoleMongodbErrorResponse = new ErrorResponse(
          "500",
          "Internal server error",
          err
        );
        return res.status(500).send(createRoleMongodbErrorResponse.toObject());
      }

      console.log(role);
      const createRoleResponse = new BaseResponse(
        "200",
        "Query successful",
        role
      );
      return res.status(200).send(createRoleResponse.toObject());
    });
  } catch (error) {
    console.log(error);
    const createRoleCatchErrorResponse = new ErrorResponse(
      "500",
      "Internal Server Error",
      error.message
    );
    return res.status(500).send(createRoleCatchErrorResponse.toObject());
  }
});

/**
 * UpdateRoleAPI
 * Method: PUT
 *
 * @return Updated Role Object
 */
router.put("/:roleId", async (req, res) => {
  try {
    Role.findOne({ _id: req.params.roleId }, function (
      err,
      role // handle mongoDB error
    ) {
      if (err) {
        console.log(err);
        const updateRoleMongodbErrorResponse = new ErrorResponse(
          "500",
          "Internal server error",
          err
        );
        res.status(500).send(updateRoleMongodbErrorResponse.toObject());
      } else {
        console.log(role);
        // Scaffold Role with request data
        role.set({
          text: req.body.text,
        });
        // Persist new Role
        role.save(function (
          err,
          updatedRole // handle mongoDB error
        ) {
          if (err) {
            console.log(err);
            const updatedRoleMongodbErrorResponse = new ErrorResponse(
              "500",
              "Internal server error",
              err
            );
            res.status(500).send(updatedRoleMongodbErrorResponse.toObject());
          }
          // return Saved Security Question
          else {
            console.log(updatedRole);
            const updateRoleResponse = new BaseResponse(
              "200",
              "Query Successful",
              updatedRole
            );
            res.json(updateRoleResponse.toObject());
          }
        });
      }
    });
  } catch (e) {
    // Server error
    console.log(e);
    const updatedRoleCatchErrorResponse = new ErrorResponse(
      "500",
      "Internal server error",
      e.message
    );
    res.status(500).send(updatedRoleCatchErrorResponse.toObject());
  }
});

/**
 * DeleteRole API
 * Method: DELETE
 *
 * @return deleted role
 */
router.delete("/:roleId", async (req, res) => {
  try {
    Role.findOne({ _id: req.params.roleId }, function (err, role) {
      if (err) {
        console.log(err);
        const deleteRoleMongodbErrorResponse = new ErrorResponse(
          "500",
          "Internal server error",
          err
        );
        return res.status(500).send(deleteRoleMongodbErrorResponse.toObject());
      }

      // handle Role is not found in Database
      if (!role) {
        console.log("Role not found");
        const notFoundResponse = new BaseResponse(404, "Role not found");
        return res.status(404).send(notFoundResponse.toObject());
      }

      console.log(role);

      User.aggregate(
        [
          {
            $lookup: {
              from: "roles",
              localField: "role.role",
              foreignField: "text",
              as: "userRoles",
            },
          },
          {
            $match: {
              "userRoles.text": role.text,
            },
          },
        ],
        function (err, users) {
          if (err) {
            console.log(err);
            const usersMongodbErrorResponse = new ErrorResponse(
              "500",
              "Internal server error",
              err
            );
            return res.status(500).send(usersMongodbErrorResponse.toObject());
          }

          if (users.length > 0) {
            console.log(
              `Role <${role.text}> is already in use and cannot be deleted`
            );
            const userRoleAlreadyInUseResponse = new BaseResponse(
              "200",
              `Role <${role.text}> is already in use and cannot be deleted`,
              role
            );
            return res
              .status(200)
              .send(userRoleAlreadyInUseResponse.toObject());
          } else {
            console.log(
              `Role <${role.text}> is not an active role and can be safely removed`
            );

            role.set({
              isDisabled: true,
            });

            role.save(function (err, updatedRole) {
              if (err) {
                console.log(err);
                const updateRoleMongodbErrorResponse = new ErrorResponse(
                  "500",
                  "Internal server error",
                  err
                );
                return res
                  .status(500)
                  .send(updateRoleMongodbErrorResponse.toObject());
              }

              console.log(updatedRole);
              const roleDeletedResponse = new BaseResponse(
                "200",
                `Role <${role.text}> has been removed successfully`,
                updatedRole
              );
              return res.status(200).send(roleDeletedResponse.toObject());
            });
          }
        }
      );
    });
  } catch (error) {
    console.log(error);
    const deleteRoleCatchErrorResponse = new ErrorResponse(
      "500",
      "Internal Server Error",
      error.message
    );
    return res.status(500).send(deleteRoleCatchErrorResponse.toObject());
  }
});

module.exports = router;
