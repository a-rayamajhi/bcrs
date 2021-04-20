/*
============================================
; Title: user-role.js
; Author: Professor Krasso
; Date:  17 Apr 2021
; Modified by: Anil Rayamajhi
; Description: User Role Schema Definition
;===========================================
*/



const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userRoleSchema = new Schema({
  role: { type: String, default: 'standard' }
})

module.exports = userRoleSchema
