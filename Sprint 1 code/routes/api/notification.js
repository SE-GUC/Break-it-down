const express= require('express');
const router= express.Router();


//const notification = require('../../models/Notification');
const Joi = require('joi')


//------------------------------create notification------------------------------------------------------------------------Lina


router.post('/', (req, res)=> {

    const Notid = req.body.Notid;
    const senderID = req.body.senderID;
    const recieverID = req.body.recieverID;
    const notificationText = req.body.notificationText;

    const schema = {
        Notid: Joi.number().required(),
       senderID: Joi.number().required(),
       recieverID: Joi.number().required(),
       notificationText: Joi.string().min(1).required()
    };
   const result = Joi.validate(req.body, schema);
   if(result.error){
     return  res.status(400).send(result.error.details[0].message)
    }

   const newNotif= {
        Notid,
        senderID,
        recieverID,
        notificationText
    }

    notification.push(newNotif)
 
   // res.json(newNotif)
    res.json(notification)
});


//-----------------------------update notification------------------------------------------------------------------------- Janna


router.put('/:ID', (req, res)=> {
    
  const NotID =parseInt(req.params.ID)

  const schema = {
     recieverID:Joi.number().required(),
     notificationText:Joi.string().min(1).required()
  }

 const result = Joi.validate(req.body, schema);


 if(result.error){
   return  res.status(400).send(result.error.details[0].message)
  }


    const recieverID = req.body.recieverID;
    const notifText = req.body.notificationText;
    const updatedNotif = notification.find( notification=> notification.Notid === NotID)
    const index=notification.indexOf(updatedNotif)


     updatedNotif.recieverID = recieverID;
     
     updatedNotif.notificationText = notifText;
     

     res.json(updatedNotif)


});


//----------------------------delete notification--------------------------------------------------------------------------Eman


router.delete('/:id', (req, res)=> {
    const id = req.params.id;
    const delNotif = notification.find(notification => notification.Notid === parseInt(id)); 

    const index = notification.indexOf(delNotif);
    notification.splice(index,1);

    res.json(notification);
});
//------------------------------------------------------------------------------------------------------
router.get('/', (req, res) => res.json({ data: Notification }));





module.exports = router;
