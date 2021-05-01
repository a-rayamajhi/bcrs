/*
============================================
; Title: user.js
; Author: Professor Krasso
; Date:   17 Apr 2021
; Modified by: Anil Rayamajhi
; Description: User Schema definition
;===========================================
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// security question and role UserSchema value type
const selectedSecurityQuestionSchema = require("../schemas/selected-security-question");
const userRoleSchema = require("../schemas/user-role");

// UserSchema with associated DB collection
var userSchema = new Schema(
  {
    userName: { type: String, required: true, unique: true, dropDups: true },
    password: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    phoneNumber: { type: String },
    address: { type: String },
    email: { type: String },
    isDisabled: { type: Boolean, default: false },
    role: userRoleSchema,
    selectedSecurityQuestions: [selectedSecurityQuestionSchema],
    dateCreated: { type: Date, default: new Date() },
    dateUpdated: { type: Date },
  },
  { collection: "users" }
);

module.exports = mongoose.model("User", userSchema);
