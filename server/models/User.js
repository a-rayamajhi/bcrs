/*
============================================
; Title: deleteUser api
; Author: Erica Perry
; Date:   16 Apr 2021
; Modified by: Erica Perry
; Description: creating the delete user api
;===========================================
*/



/**
 * DeleteUser
 */

 router.delete('/:id', async (req, res)=> {
   try{

     User.findOne({'_id': req.params.id}, function(err,user) {
       if(err) {
         console.log(err);
         const deleteUserMongodbErrorResponse = new ErrorResponse(500,'Internal server error', err);
         res.status(500).send(deleteUserMongodbErrorResponse.toObject());

   }else {
     console.log(user);

     user.set({
       isDisabled: true
     });

     user.save(function(err, saveUser) {
       if(err) {
         console.log(err);
         const savedUserMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
         res.status(500).send(savedUserMongodbErrorResponse.toObject());


       }else {
         console.log(savedUser);
         const savedUserResponse = new BaseResponse(200, 'Query successful', savedUser);
         res.json(savedUserResponse.toObject());

       }

     })
   }
  })
  } catch(e) {
    console.log(e);
    const deleteUserCatchErrorResponse = new ErrorResponse(500,'Internal server error',e.message);
    res.status(500).send(deleteUserCatchErrorResponse.toObject());

  } 
  
 });

 module.exports = router