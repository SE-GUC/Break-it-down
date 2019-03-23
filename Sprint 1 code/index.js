

const coworkingSpace = require('./routes/api/coworkingSpace')
const coworkingSpace2 = require('./routes/api/coworkingSpace2')

const validator = require('./validations/validations')

const express = require('express')

const ProfilesAPI = require('./routes/api/Profiles');

const consultatns = require('./routes/api/consultancyAgency');

const Joi = require('joi');



const mongoose = require('mongoose');
const db = require('./config/keys_dev').mongoURI


mongoose.connect(db,{ useNewUrlParser: true })

    .then(() => console.log('Connected to MongoDB'))

    .catch(err => console.log(err))

const member = require('../Sprint 1 code/routes/api/member');


const partner = require('../Sprint 1 code/routes/api/Partner Eman Final');
const notification = require('../Sprint 1 code/routes/api/notification');


const app = express()


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



app.use('/api/member', member);
//app.use('/api/admin',admin)
app.use('/api/coworkingSpace', coworkingSpace)
app.use('/api/coworkingSpace2', coworkingSpace2)
app.use('/api/partner',partner)
app.use('/api/notification',notification)
app.use('/api/ca',consultatns);

app.use('/api/CreateAccount', ProfilesAPI)
// Handling 404

app.use((req, res) => {

    res.status(404).send({err: 'We can not find what you are looking for'});

 })

const port = 4000


app.listen(port, () => console.log(`Server up and running on port ${port}`))
