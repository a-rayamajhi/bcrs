/*
============================================
; Title: invoice modal
; Author: Professor Krasso
; Date:   29 Apr 2021
; Modified by: Devan Wong
; Description: connecting to mongodb
;===========================================
*/
// Import mongoose
const mongoose = require('mongoose');
const LineItemSchema = require('../schemas/line-item');

const Schema = mongoose.Schema;

// invoiceSchema with associated DB collection
let invoiceSchema = new Schema({
  userName: { type: String },
  lineItems: [LineItemSchema],
  partsAmount: { type: Number },
  laborAmount: { type: Number },
  lineItemTotal: { type: Number },
  total: { type: Number },
  orderDate: { type: Date, default: new Date() }
})


module.exports = mongoose.model('Invoice', invoiceSchema);

