/*
============================================
; Title: selected-security-role.js
; Author: Professor Krasso
; Date:  17 Apr 2021
; Modified by: Anil Rayamajhi
;===========================================
*/


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const selectedSecurityQuestionSchema = new Schema({
  questionText: { type: String },
  answerText: { type: String }
})

module.exports = selectedSecurityQuestionSchema
