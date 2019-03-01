const express = require('express')

const router = express.Router()

const validator = require('../../validations/updateValidations')

// We will be connecting using database 

const Admin = require('../../models/Admin')

const User = require('../../models/User')


// temporary data created as if it was pulled out of the database ...

const admins = [

    new Admin(1,'Menna', 'Yasser'),

    new Admin(2,'Reem','Khaled')

];

const users=[
    {id:1,firstname:"Nadia",lastname:"Talaat",age:36},
    {id:2,firstname:"Khaled",lastname:"Tahawi",age:50},
    {id:3,firstname:"Somaya",lastname:"Afifi",age:60}
];

const updates=[
    {id:2,firstname:"Yara",status:"pending"},
    {id:1,lastname:"Khaled",status:"pending"},
    {id:3,lastname:"Khaled",status:"approved"}

];

router.get('/', (req, res) => res.json({ data: admins }));

router.get('/viewUpdates', (req, res) => {
    const updt=updates.filter(updt=>updt.status==="pending")
    res.json({ data: updt })
})

router.put('/approveUpdates/:id',(req,res)=>{
     try {
    
         const id =parseInt(req.params.id)
         const uid=parseInt(req.params.id)
    
         const user =  users.findIndex(user => user.id === id);
         const update=updates.findIndex(update => update.id === uid);
    
         if(user===-1 || update===-1) return res.status(404).send({error: 'User does not exist'})
         const isValidated = validator.updateValidation(req.body)
         if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
    
         const userid =  req.body.id   
         const firstname= req.body.firstname
         const lastname= req.body.lastname
         const age= req.body.age 

         if(userid !== undefined )   users[user].id=userid
         if(firstname !== undefined )   users[user].firstname=firstname
         if(lastname !== undefined )   users[user].lastname=lastname
         if(age !== undefined )   users[user].age=age
         updates[update].status="approved"
    
         res.json({msg: 'User updated successfully'})
    
        }
    
        catch(error) {
    
            // We will be handling the error later
    
            console.log(error)  
    
        }  

});

router.delete('/disapproveUpdates/:id',(req,res)=>{
         const uid=parseInt(req.params.id)
    
         const update=updates.findIndex(update => update.id === uid);

         updates.splice(update,1)

         res.json({msg: 'Sorry your update request was disapproved by an admin'})


});
module.exports = router