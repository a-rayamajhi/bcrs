/*
============================================
; Title: error-response.js
; Author: Professor Krasso
; Date:  17 Apr 2021
; Modified by: Devan Wong, Anil Rayamajhi
;===========================================
*/

// Creating an error response for proper QA testing
class ErrorResponse {
  constructor(httpCode, message, data) {
    this.httpCode = httpCode;
    this.message = message;
    this.data = data;
  }

  toObject() {
    return {
      'httpCode': this.httpCode,
      'message': this.message,
      'data': this.data,
      'timestamp': new Date().toLocaleDateString()
    }
  }
}

module.exports = ErrorResponse;
