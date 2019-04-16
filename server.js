//--------------------express--------------------
const express = require("express");
const app = express();
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
// const User = require("./models/ChatUser");
// var server = require("http").createServer(app);
// global.io = require("socket.io").listen(server);
// users = [];
// connections = [];
// const messages = require("./models/messages2");
// const f = require("./models/server");
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
//build mode

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

//-----------------cors---------------
app.use(cors());

//--------------------Home Page--------------------
app.get("/", (req, res) => {
  res.send(`<h1>Home page</h1>
    <p> REGISTER OR SIGN UP <p>
    <a href="/api/admin">Admin</a>
    <a href="/api/coworkingSpace">Partner Coworking Space</a>
    <a href="/api/consultancyAgency">consultancyAgency</a>
    <a href="/api/educationalOrganization">Educational Organization</a>
    <a href="/api/member">Member</a>
    <a href="/api/partner">Partner</a>`);
});

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
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/public/index.html"));
});
if (process.env.NODE_ENV === "production") {
  app.use(express.static(client.build));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
//--------------------Handling Error 404--------------------
app.use((req, res) => {
  res.status(404).send({ err: "We can not find what you are looking for" });
});

//--------------------Server--------------------
const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server up and running on port ${port}`));
