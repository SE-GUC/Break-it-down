//---------------------------nourhan-----------------------------------------
var bodyParser = require('body-parser')

var mongoose = require('mongoose');

const Message = require('./models/Message')

var http=require('http')

http.createServer(function(request,response){
                  response.writeHead(200,{"Content-Type": "text/plain"})
                  response.end("Hello World\n")
}).listen(process.env.PORT)


//-----------------------------------------------------------------------------


const coworkingSpace = require('./routes/api/coworkingSpace')
const coworkingSpace2 = require('./routes/api/coworkingSpace2')
const ca = require('./routes/api/consultancyAgency')

const validator = require('./validations/validations')
const express = require('express')
const Joi = require('joi');


// DB Config
const db = require('./config/keys_dev').mongoURI



const admins = require('./routes/api/admins');


const ProfilesAPI = require('./routes/api/Profiles');

const consultatns = require('./routes/api/consultancyAgency');


const partner = require('../Sprint 1 code/routes/api/Partner Eman Final');
const notification = require('../Sprint 1 code/routes/api/notification');

const app = express()
// Connect to mongo

mongoose



    .connect(db)



    .then(() => console.log('Connected to MongoDB'))



    .catch(err => console.log(err));


const member = require('../Sprint 1 code/routes/api/member');

const Event = require('../Sprint 1 code/routes/api/Event')





// Init middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

const consultancyAgency = require('../Sprint 1 code/routes/api/consultancyAgency');


//nourhan
var http = require('http').Server(app);
var io = require('socket.io')(http);
//-----------

app.use(express.urlencoded({extended: false}))



app.get('/', (req, res) => {


    res.send(`<h1>Home page</h1>
<p> REGISTER OR SIGN UP <p>
    <a href="/api/admin">Admin</a>

    <a href="/api/coworkingSpace">Partner Coworking Space</a>
    <a href="/api/member">Member</a>
    <a href="/api/rooms">Rooms</a>
    <a href="/api/notification">notfication</a>
    <a href="/api/partner">Partner</a>
    `);



})

// Direct routes to appropriate files 


app.use('/api/coworkingSpace', coworkingSpace)
app.use('/api/coworkingSpace2', coworkingSpace2)
app.use('/api/consultancyAgency', consultancyAgency);


app.use('/api/member', member);
//app.use('/api/admin',admin)
app.use('/api/admins', admins)
app.use('/api/Events', Event);

app.use('/api/coworkingSpace', coworkingSpace)
app.use('/api/coworkingSpace2', coworkingSpace2)
app.use('/api/partner',partner)
app.use('/api/notification',notification);
app.use('/api/ca',ca);
app.use('/api/CreateAccount', ProfilesAPI);




// Handling 404

app.use((req, res) => {

    res.status(404).send({err: 'We can not find what you are looking for'});

 })

 const port = process.env.PORT || 4000;



app.listen(port, () => console.log(`Server up and running on port ${port}`));
