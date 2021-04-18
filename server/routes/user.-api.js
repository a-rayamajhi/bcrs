/*
============================================
; Title:  User Routes
; Author: Professor Krasso
; Date:   16 Apr 2021
; Modified by: Anil Rayamajhi
; Description: Declare User routes and associate correct controller
;===========================================
*/

var express = require("express");
var router = express.Router();

var auth_controller = require("../controllers/userController");
var checkToken = require("../check-token");

/**
 * API Routes
 */

// POST request for registering a user
router.post("/auth/register", auth_controller.register);

// GET request for verifying user tokens
router.get("/auth/token", checkToken, auth_controller.token);

// POST request for login in a user
router.post("/auth/login", auth_controller.login);

// GET request for log out a user
router.get("/auth/logout", auth_controller.logout);

module.exports = router;
