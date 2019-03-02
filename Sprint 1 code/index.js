const express = require('express')

const UserProfile = require('./models/UserProfile');
const ProfilesAPI = require('./routes/api/Profiles');


const app = express()

app.use(express.json())



app.get('/', (req, res) => {

    res.send(`<h1>Create an account</h1>

    <a href="/api/CreateAccount">  </a>


    `);

})




// Direct routes to appropriate files 

app.use('/api/CreateAccount', ProfilesAPI)



// Handling 404

app.use((req, res) => {

    res.status(404).send({err: 'We can not find what you are looking for'});

 })



const port = 3000

app.listen(port, () => console.log(`Server up and running on port ${port}`))