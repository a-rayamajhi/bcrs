/*
============================================
; Title: Security question  modal
; Author: Professor Krasso
; Date:   16 Apr 2021
; Modified by: Devan Wong, Anil Rayamajhi
; Description: connecting to mongodb
;===========================================
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// securityQuestionSchema with associated DB collection
let securityQuestionSchema = new Schema({
  text: { type: String },
  isDisabled: { type: Boolean, default: false }
}, { collection: 'securityQuestions' })

module.exports = mongoose.model('SecurityQuestion', securityQuestionSchema);
