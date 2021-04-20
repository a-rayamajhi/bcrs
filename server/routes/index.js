/*
============================================
; Title: API profile
; Author: Professor Krasso
; Date:  16 Apr 2021
; Modified by: Anil Rayamajhi
;===========================================
*/

var express = require("express");
var router = express.Router();

/**
 * Method: GET
 * Route Name: Base home page.
 */
router.get("/", function (req, res, next) {
  res.json({
    title: "BCRS",
    description: "Bob's Computers & Repairs",
  });
});

module.exports = router;
