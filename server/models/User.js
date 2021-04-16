/*
============================================
; Title: User modal
; Author: Professor Krasso
; Date:   16 Apr 2021
; Modified by: Anil Rayamajhi
; Description: User Schema and methods to
; make DB query to users collection
;===========================================
*/

var mongoose = require("mongoose");

/*
 *    Fields username, password, and email
 */
var userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
});

const User = (module.exports = mongoose.model("User", userSchema));

/**
 * @param {*} user
 * @param {*} callback
 *
 * Database queries to add new user
 */
module.exports.add = (user, callback) => {
  user.save(callback);
};

module.exports.getById = (id, callback) => {
  var query = { _id: id };
  User.findById(query, callback);
};

module.exports.getOne = (email, callback) => {
  var query = { email: email };
  User.findOne(query, callback);
};
