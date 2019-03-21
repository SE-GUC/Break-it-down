const express = require('express')

const UserProfile = require('./models/UserProfile');
const ProfilesAPI = require('./routes/api/Profiles');
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://user:1234@break-it-down-8hjy6.mongodb.net/data?retryWrites=true").
then(()=>console.log('connected to the database'));
const member = require('../Sprint 1 code/routes/api/member');


const app = express();

app.use(express.json());



app.get('/', (req, res) => {

    res.send(`<h1>Create an account</h1>

    <a href="/api/CreateAccount">  </a>


    `);

})




// Direct routes to appropriate files 

app.use('/api/CreateAccount', ProfilesAPI)



app.use('/api/member', member);
// Handling 404

app.use((req, res) => {

    res.status(404).send({err: 'We can not find what you are looking for'});

 })



const port = 3000

app.listen(port, () => console.log(`Server up and running on port ${port}`))