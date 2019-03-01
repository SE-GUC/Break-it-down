// Dependencies
const express = require('express');
const Joi = require('joi');

const coworkingSpace = require('./routes/api/coworkingSpace')
const coworkingSpace2 = require('./routes/api/coworkingSpace2')

const validator = require('./validations/validations')
//const uuid = require('uuid');



const app = express()
app.use(express.json())


app.get('/', (req, res) => {
    res.send(`<h1>Welcome to Partner Coworking Space Profile</h1>
    <a href="/api/coworkingSpace">Partner Coworking Space</a>
    <a href="/api/rooms">Rooms</a>
    `);
})

// Direct routes to appropriate files 
app.use('/api/coworkingSpace', coworkingSpace)
app.use('/api/coworkingSpace2', coworkingSpace2)



// Handling 404
app.use((req, res) => {

    res.status(404).send({err: 'Can not reach what you are looking for.'});

 })




 const port = 5000
 app.listen(port, () => console.log(`Server up and running on port ${port}`))
 









 

