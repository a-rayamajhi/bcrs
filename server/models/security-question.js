/*
============================================
; Title: Security question  modal
; Author: Professor Krasso
; Date:   16 Apr 2021
; Modified by: Devan Wong
; Description: connecting to mongodb
;===========================================
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let securityQuestionSchema = new Schema({
  questionId: { type: String, unique: true, dropDups: true },
  text: { type: String },
  isDisabled: {type: Boolean, default: false }
}, { collection: 'securityQuestions'})

module.exports = mongoose.model('SecurityQuestion', securityQuestionSchema);
