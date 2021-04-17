/*
============================================
; Title: Base-response.js
; Author: Professor Krasso
; Date:  16 Apr 2021
; Modified by: Devan Wong
;===========================================
*/

// Creating an base response for proper QA testing
class BaseResponse {
  constructor(httpCode, message, data) {
    this.httpCode = httpCode;
    this.message = message;
    this.data = data;
  }

  toObject(){
    return {
      'httpCode': this.httpCode,
      'message': this.message,
      'data': this.data,
      'timeStamp': new Date().toLocaleDateString()
    }
  }
}

module.exports = BaseResponse;
