/*
============================================
; Title:  security question Api
; Author: Erica perry
; Date:   16 Apr 2021
; Modified by: Erica Perry
; Description: Creating security questions apis
;===========================================
*/





/**
 * FindById
 */

Router.get('/:id', async(req, res) =>{
  try
  {
    get_security_question.findOne({'_id': req.params.id}, function(err, securityQuestion){
      if(err)
      {
        console.log(err);
        const findByIdMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
        res.status(500).send(findByIdMongodbErrorResponse.toObject());

      }
      else{
        console.log(securityQuestion);
        const findByIdResponse = new BaseResponse(200, 'Query successful', securityQuestion);
        res.json(findByIdResponse.toObject());

      }
    })
  } catch(e)
  {
    console.log(e);
    const findByIdCatchResponse = new ErrorResponse(500, 'Internal server error',e.message);
    res.status(500).send(findByIdCatchResponse.toObject());
  }
});



/**
* DeleteSecurityQuestion
*/

router.delete('/:id', async (req, res)=> {
 try{

   SecurityQuestion.findOne({'_id': req.params.id}, function(err,SecurityQuestion) {
     if(err) {
       console.log(err);
       const deleteSecurityQuestionMongodbErrorResponse = new ErrorResponse(500,'Internal server error', err);
       res.status(500).send(deleteSecurityQuestionMongodbErrorResponse.toObject());

 }else {
   console.log(SecurityQuestion);

   SecurityQuestion.set({
     isDisabled: true
   });

   SecurityQuestion.save(function(err, savedSecurityQuestion) {
     if(err) {
       console.log(err);
       const savedSecurityQuestionMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
       res.status(500).send(savedSecurityQuestionMongodbErrorResponse.toObject());


     }else {
       console.log(savedSecurityQuestion);
       const deleteSecurityQuestionResponse = new BaseResponse(200, 'Query successful', deletedSecurityQuestion);
       res.json(deleteSecurityQuestionResponse.toObject());

     }

   })
 }
})
} catch(e) {
  console.log(e);
  const deleteSecurityQuestionCatchErrorResponse = new ErrorResponse(500,'Internal server error',e.message);
  res.status(500).send(deleteSecurityQuestionCatchErrorResponse.toObject());

} 

});

module.exports = router