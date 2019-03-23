


const validator = require('./validations/validations')
const express = require('express')
const mongoose = require('mongoose')
const Joi = require('joi');

<<<<<<< HEAD


// DB Config
const db = require('./config/keys_dev').mongoURI

// Connect to mongo
=======
const admins = require('./routes/api/admins');


const Joi = require('joi');
const mongoose = require('mongoose');
const db = require('./config/keys_dev').mongoURI;

mongoose.connect(db,{ useNewUrlParser: true }).then(() => console.log('Connected to MongoDB')).catch(err => console.log(err));
>>>>>>> 7a07011ccde3696cb3c8ca6261149b40b472ebc9

mongoose
    .connect(db)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err))


const app = express()

// Init middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))




const coworkingSpace = require('../Sprint 1 code/routes/api/coworkingSpace')
const coworkingSpace2 = require('../Sprint 1 code/routes/api/coworkingSpace2')
const consultancyAgency = require('../Sprint 1 code/routes/api/consultancyAgency');




app.use(express.json())



app.get('/', (req, res) => {


    res.send(`<h1>Home page</h1>

    <a href="/api/admin">Admin</a>

    <a href="/api/coworkingSpace">Partner Coworking Space</a>
    <a href="/api/member">Member</a>
    <a href="/api/rooms">Rooms</a>
    <a href="/api/admin">admin</a>
    <a href="/api/notification">notfication</a>

    `);



})

// Direct routes to appropriate files 

app.use('/api/coworkingSpace', coworkingSpace)
app.use('/api/coworkingSpace2', coworkingSpace2)
app.use('/api/consultancyAgency', consultancyAgency);
// Handling 404

app.use((req, res) => {

    res.status(404).send({err: 'We can not find what you are looking for'});

 })

const port = 4000


app.listen(port, () => console.log(`Server up and running on port ${port}`))
