const express = require('express');

const bcrypt = require('bcryptjs');

const router = express.Router();

const User = require('../../models/UserProfile');

const validator = require('../../Validations/validations')

router.get('/', (req,res) => res.json({data: 'Users working'}));

router.post('/member', async (req,res) => {

    const {field,memberTasks,name,password,birthday,email,phoneNumber,skills,interests,accomplishments,certificates }  = req.body;

    const isValidated = validator.createAccountValidation(req.body)

    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })

    const user = await User.findOne({email});

    if(user) return res.status(400).json({error: 'Email already exists'});

    const salt = bcrypt.genSaltSync(10);

    const hashedPassword = bcrypt.hashSync(password,salt);

    const newUser = new User({
            type:"member",
            field,
            memberTasks,
            activation:false,
            name,
            password:hashedPassword,
            birthday,
            email,
            phoneNumber,
            skills,
            interests,
            accomplishments,
            certificates,
            updates:[]
        });

    newUser

    .save()

    .then(user => res.json({data: user}))

    .catch(err => res.json({error: 'Can not create user'}));

})

router.post('/partner', async (req,res) => {

    const {name,tasks,password,email,address,website,phoneNumber,field,description,partners,boardMembers,events }  = req.body;

    const isValidated = validator.createAccountValidation(req.body)

    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })

    const user = await User.findOne({email});

    if(user) return res.status(400).json({error: 'Email already exists'});

    const salt = bcrypt.genSaltSync(10);

    const hashedPassword = bcrypt.hashSync(password,salt);

    const newUser = new User({
            type:"partner",
            name,
            activation:false,
            tasks,
            password:hashedPassword,
            email,
            address,
            website,
            phoneNumber,
            field,
            description,
            partners,
            boardMembers,
            events,
            updates:[]
        });

    newUser

    .save()

    .then(user => res.json({data: user}))

    .catch(err => res.json({error: 'Can not create user'}));

})

router.post('/coworkingSpace', async (req,res) => {

    const {name,password,email,address,website,phoneNumber,description,facilities,rooms }  = req.body;

    const isValidated = validator.createAccountValidation(req.body)

    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })

    const user = await User.findOne({email});

    if(user) return res.status(400).json({error: 'Email already exists'});

    const salt = bcrypt.genSaltSync(10);

    const hashedPassword = bcrypt.hashSync(password,salt);

    const newUser = new User({
            type:"coworkingSpace",
            name,
            activation:false,
            password:hashedPassword,
            email,
            address,
            website,
            phoneNumber,
            description,
            facilities,
            rooms,
            updates:[]
        });

    newUser

    .save()

    .then(user => res.json({data: user}))

    .catch(err => res.json({error: 'Can not create user'}));

})

router.post('/educationalOrganization', async (req,res) => {

    const {name,password,email,address,website,phoneNumber,description,trainers,trainingPrograms,certificates }  = req.body;

    const isValidated = validator.createAccountValidation(req.body)

    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })

    const user = await User.findOne({email});

    if(user) return res.status(400).json({error: 'Email already exists'});

    const salt = bcrypt.genSaltSync(10);

    const hashedPassword = bcrypt.hashSync(password,salt);

    const newUser = new User({
            type:"educationalOrganization",
            name,
            activation:false,
            password:hashedPassword,
            email,
            address,
            website,
            phoneNumber,
            description,
            trainers,
            trainingPrograms,
            certificates,
            updates:[]

        });

    newUser

    .save()

    .then(user => res.json({data: user}))

    .catch(err => res.json({error: 'Can not create user'}));

})

router.post('/consultancyAgency', async (req,res) => {

    const {name,password,email,address,website,phoneNumber,description,partners,boardMembers,events,reports }  = req.body;

    const isValidated = validator.createAccountValidation(req.body)

    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })

    const user = await User.findOne({email});

    if(user) return res.status(400).json({error: 'Email already exists'});

    const salt = bcrypt.genSaltSync(10);

    const hashedPassword = bcrypt.hashSync(password,salt);

    const newUser = new User({
            type:"consultancyAgency",
            name,
            activation:false,
            password:hashedPassword,
            email,
            address,
            website,
            phoneNumber,
            description,
            partners,
            boardMembers,
            events,
            reports,
            updates:[]
        });

    newUser

    .save()

    .then(user => res.json({data: user}))

    .catch(err => res.json({error: 'Can not create user'}));

})

router.post('/admin', async (req,res) => {

    const {name,password,email,address,phoneNumber}  = req.body;

    const isValidated = validator.createAccountValidation(req.body)

    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })

    const user = await User.findOne({email});

    if(user) return res.status(400).json({error: 'Email already exists'});

    const salt = bcrypt.genSaltSync(10);

    const hashedPassword = bcrypt.hashSync(password,salt);

    const newUser = new User({
            type:"admin",
            name,
            password:hashedPassword,
            email,
            phoneNumber
        });

    newUser

    .save()

    .then(user => res.json({data: user}))

    .catch(err => res.json({error: 'Can not create user'}));

})


module.exports = router;