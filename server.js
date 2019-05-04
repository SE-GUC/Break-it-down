//--------------------express--------------------
// const express = require("express");
// const app = express();

var express = require('express'),
    app = express(),
    server = require('http').createServer(app);
    global.io = require('socket.io').listen(server),
    server.listen(process.env.PORT || 4000);

//--------------------passport--------------------
const passport = require("passport");

//--------------------cors---------------
const cors = require("cors");
const path = require("path");

//--------------------api--------------------
const admin = require("./routes/api/admin");
const coworkingSpace = require("./routes/api/coworkingSpace");
const ca = require("./routes/api/consultancyAgency");
const ProfilesAPI = require("./routes/api/Profiles");
const partner = require("./routes/api/partner");
const notification = require("./routes/api/notification");
const member = require("./routes/api/member");
const Event = require("./routes/api/Event");
const consultancyAgency = require("./routes/api/consultancyAgency");
const eo = require("./routes/api/educationalOrganization");
const posts = require("./routes/api/Posts");

//------------------forChatting------------------------
const User = require("./models/ChatUser");
// var server = require("http").createServer(app);
// global.io = require("socket.io").listen(server);
users = [];
connections = [];
const messages = require("./models/messages2");
const f = require("./models/server");
// server.listen(process.env.port || 4000);





//--------------------Mongoose + DB configuration--------------------
var mongoose = require("mongoose");
const db = require("./config/keys_dev").mongoURI;
// Connect to mongo
mongoose
  .connect(db)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

// //Static file declaration
// app.use(express.static(path.join(__dirname, 'client/build')));
// //production mode
// if(process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, 'client/build')));

//   app.get('*', (req, res) => {
//     res.sendfile(path.join(__dirname = 'client/build/index.html'));
//   })
// }

//const dir = path.join(__dirname, 'client/build');

//build mode
//  if (process.env.NODE_ENV === 'production') {
  // app.use(express.static('client/build'));
  // app.use(express.static(dir));

  // app.get('http://localhost:3000/coworkingSpace/', (req, res) => {
  //   console.log("here ya nour")
  //   res.sendFile(path.join(dir+'/index.html'));
  // });
  // app.get("/**", (req, res) => {
  //   // res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  // });
  // }


//production mode
// if(process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, 'client/build')));
//   app.get('*', (req, res) => {
//     // res.sendfile(path.join(__dirname = 'client/build/index.html'));
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   })
// }

// if(process.env.NODE_ENV === 'production'){
//   //set static folder
//   app.use(express.static('client/build'));
// }
// app.get('/*',(req, res) => {
//   res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
// });



//build mode
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname+'/client/public/index.html'));
// })

//app.use(express.static(path.join(__dirname, 'client/public')))
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname + '/client/public/index.html'))
// })


// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", '*');
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//   res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
//   next();
// });

// app.use(express.static(__dirname));
// app.use(express.static(path.join(__dirname,'client', 'build')));
// app.get('/ping', function (req, res) {
//  return res.send('pong');
// });
// app.get('/*', function (req, res) {
//   res.sendFile(path.join(__dirname,'client', 'build', 'index.html'));
// });

//--------------------Init middleware--------------------
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
//app.use(passport.initialize())

//--------------------Configure passport--------------------
//require('./config/passport')(passport)

//--------------------chat application--------------------
var http = require("http").Server(app);
var io = require("socket.io")(http);

//--------------------Home Page--------------------
// app.get("/", (req, res) => {
//   res.send(`<h1>Home page</h1>
//     <p> REGISTER OR SIGN UP <p>
//     <a href="/api/admin">Admin</a>
//     <a href="/api/coworkingSpace">Partner Coworking Space</a>
//     <a href="/api/consultancyAgency">consultancyAgency</a>
//     <a href="/api/educationalOrganization">Educational Organization</a>
//     <a href="/api/member">Member</a>
//     <a href="/api/partner">Partner</a>`);
// });

//--------------------Direct routes to appropriate files--------------------
app.use("/api/coworkingSpace", coworkingSpace);
app.use("/api/consultancyAgency", consultancyAgency);
app.use("/api/member", member);
app.use("/api/admin", admin);
app.use("/api/Events", Event);
app.use("/api/coworkingSpace", coworkingSpace);
app.use("/api/educationalOrganization", eo);
app.use("/api/partner", partner);
app.use("/api/consultancyAgency", ca);
app.use("/api/CreateAccount", ProfilesAPI);
app.use("/api/posts", posts);
app.use(express.static(path.join(__dirname, "client", "build")))

//-----------------------------------------------------------
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

    // "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"

// app.use(express.static(path.join(__dirname, 'client/build')));

// app.get('*', function(req, res) {
//   res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
// });

//--------------------Handling Error 404--------------------
app.use((req, res) => {
  res.status(404).send({ err: "We can not find what you are looking for" });
});



//--------------------Server--------------------
// const port = process.env.PORT || 4000;
// //const port = 4001;

// app.listen(port, () => console.log(`Server up and running on port ${port}`));
