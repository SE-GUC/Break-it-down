const express = require("express");

const bcrypt = require("bcryptjs");

const router = express.Router();

const User = require("../../models/UserProfile");

const validator = require("../../Validations/validations");

const jwt = require("jsonwebtoken");

const tokenKey = require("../../config/keys").secretOrKey;

var store = require("store");

router.get("/", (req, res) => res.json({ data: "Users working" }));

router.post("/login", async (req, res) => {
  try {
    console.log("login");
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ email: "Email does not exist" });
    const match = bcrypt.compareSync(password, user.password);
    if (match) {
      const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
        type: user.type
      };
      const token = jwt.sign(payload, tokenKey, { expiresIn: "1h" });
      console.log(token);
      store.set("token", token);
      console.log("added");
      res.json({ token: `Bearer ${token}` });
    } else return res.status(400).send({ password: "Wrong password" });
  } catch (e) {}
});

router.get("/logout", async (req, res) => {
  console.log("logout");
  store.remove("token");
  res.send("logged out");
});

//Check to make sure header is not undefined, if so, return Forbidden (403)
const checkToken = (req, res, next) => {
  const header = store.get("token");
  if (typeof header !== "undefined") {
    req.token = header;
    //next middleware
    next();
  } else {
    //If header is undefined return Forbidden (403)
    res.sendStatus(403);
  }
};

//This is a protected route
router.get("/user/auth", checkToken, (req, res) => {
  //verify the JWT token generated for the user
  jwt.verify(store.get("token"), tokenKey, (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      console.log("ERROR: Could not connect to the protected route");
      res.sendStatus(403);
    } else {
      //If token is successfully verified, we can send the autorized data
      res.json({
        message: "Successful log in",
        authorizedData
      });
      console.log("SUCCESS: Connected to protected route");
    }
  });
});

router.post("/member", async (req, res) => {
  const {
    field,
    memberTasks,
    name,
    password,
    birthday,
    email,
    phoneNumber,
    skills,
    interests,
    accomplishments,
    certificates
  } = req.body;

  const isValidated = validator.createAccountValidation(req.body);

  if (isValidated.error)
    return res
      .status(400)
      .send({ error: isValidated.error.details[0].message });

  const user = await User.findOne({ email });

  if (user) return res.status(400).json({ error: "Email already exists" });

  const salt = bcrypt.genSaltSync(10);

  const hashedPassword = bcrypt.hashSync(password, salt);

  const newUser = new User({
    type: "member",
    field,
    memberTasks,
    activation: false,
    name,
    password: hashedPassword,
    birthday,
    email,
    phoneNumber,
    skills,
    interests,
    accomplishments,
    certificates,
    RoomsBooked: [],
    updates: []
  });

  newUser

    .save()

    .then(user => res.json({ data: user }))

    .catch(err => res.json({ error: "Can not create user" }));
});

router.post("/partner", async (req, res) => {
  const {
    name,
    tasks,
    password,
    email,
    address,
    website,
    phoneNumber,
    field,
    description,
    partners,
    boardMembers,
    events
  } = req.body;

  const isValidated = validator.createAccountValidation(req.body);

  if (isValidated.error)
    return res
      .status(400)
      .send({ error: isValidated.error.details[0].message });

  const user = await User.findOne({ email });

  if (user) return res.status(400).json({ error: "Email already exists" });

  const salt = bcrypt.genSaltSync(10);

  const hashedPassword = bcrypt.hashSync(password, salt);

  const newUser = new User({
    type: "partner",
    name,
    activation: false,
    tasks,
    password: hashedPassword,
    email,
    address,
    website,
    phoneNumber,
    field,
    description,
    partners,
    boardMembers,
    events,
    updates: []
  });

  newUser

    .save()

    .then(user => res.json({ data: user }))

    .catch(err => res.json({ error: "Can not create user" }));
});

router.post("/coworkingSpace", async (req, res) => {
  const {
    name,
    password,
    email,
    address,
    website,
    phoneNumber,
    description,
    facilities,
    rooms
  } = req.body;

  const isValidated = validator.createAccountValidation(req.body);

  if (isValidated.error)
    return res
      .status(400)
      .send({ error: isValidated.error.details[0].message });

  const user = await User.findOne({ email });

  if (user) return res.status(400).json({ error: "Email already exists" });

  const salt = bcrypt.genSaltSync(10);

  const hashedPassword = bcrypt.hashSync(password, salt);

  const newUser = new User({
    type: "coworkingSpace",
    name,
    activation: false,
    password: hashedPassword,
    email,
    address,
    website,
    phoneNumber,
    description,
    facilities,
    rooms,
    updates: []
  });

  newUser

    .save()

    .then(user => res.json({ data: user }))

    .catch(err => res.json({ error: "Can not create user" }));
});

router.post("/educationalOrganization", async (req, res) => {
  const {
    name,
    password,
    email,
    address,
    website,
    phoneNumber,
    description,
    trainers,
    trainingPrograms,
    certificates
  } = req.body;

  const isValidated = validator.createAccountValidation(req.body);

  if (isValidated.error)
    return res
      .status(400)
      .send({ error: isValidated.error.details[0].message });

  const user = await User.findOne({ email });

  if (user) return res.status(400).json({ error: "Email already exists" });

  const salt = bcrypt.genSaltSync(10);

  const hashedPassword = bcrypt.hashSync(password, salt);

  const newUser = new User({
    type: "educationalOrganization",
    name,
    activation: false,
    password: hashedPassword,
    email,
    address,
    website,
    phoneNumber,
    description,
    trainers,
    trainingPrograms,
    certificates,
    updates: []
  });

  newUser

    .save()

    .then(user => res.json({ data: user }))

    .catch(err => res.json({ error: "Can not create user" }));
});

router.post("/consultancyAgency", async (req, res) => {
  const {
    name,
    password,
    email,
    address,
    website,
    phoneNumber,
    description,
    partners,
    boardMembers,
    events,
    reports
  } = req.body;

  const isValidated = validator.createAccountValidation(req.body);

  if (isValidated.error)
    return res
      .status(400)
      .send({ error: isValidated.error.details[0].message });

  const user = await User.findOne({ email });

  if (user) return res.status(400).json({ error: "Email already exists" });

  const salt = bcrypt.genSaltSync(10);

  const hashedPassword = bcrypt.hashSync(password, salt);

  const newUser = new User({
    type: "consultancyAgency",
    name,
    activation: false,
    password: hashedPassword,
    email,
    address,
    website,
    phoneNumber,
    description,
    partners,
    boardMembers,
    events,
    reports,
    updates: []
  });

  newUser

    .save()

    .then(user => res.json({ data: user }))

    .catch(err => res.json({ error: "Can not create user" }));
});

router.post("/admin", async (req, res) => {
  const { name, password, email, address, phoneNumber } = req.body;

  const isValidated = validator.createAccountValidation(req.body);

  if (isValidated.error)
    return res
      .status(400)
      .send({ error: isValidated.error.details[0].message });

  const user = await User.findOne({ email });

  if (user) return res.status(400).json({ error: "Email already exists" });

  const salt = bcrypt.genSaltSync(10);

  const hashedPassword = bcrypt.hashSync(password, salt);

  const newUser = new User({
    type: "admin",
    name,
    password: hashedPassword,
    email,
    phoneNumber
  });

  newUser

    .save()

    .then(user => res.json({ data: user }))

    .catch(err => res.json({ error: "Can not create user" }));
});

module.exports = router;
