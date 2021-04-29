/*
============================================
; Title: Roles models
; Author: Professor Krasso
; Date:   29 Apr 2021
; Modified by: Devan Wong
; Description: connecting to mongodb
;===========================================
*/
// Import mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// roleSchema with associated DB collection
let roleSchema = new Schema ({
  text: {
    type: String,
    unique: true
  },
  isDisabled: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Role', Schema);
