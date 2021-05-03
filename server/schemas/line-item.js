/*
============================================
; Title: line-item.js
; Author: Professor Krasso
; Date:  28 Apr 2021
; Modified by: Eica Perry
; Definition: line item schema
;===========================================
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let lineItemSchema = new Schema({
    title: { type: String },
    price: { type: Number }
})
module.exports = lineItemSchema;
