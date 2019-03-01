const express = require('express');
const Joi = require('joi');

 const PartnerCoworkingSpace = require('./PartnerCoworkingSpace');
 const cospace = require('../routes/api/coworkingSpace');

 const RoomBookings = require('./RoomBookings');
const RB = require('../routes/api/RoomBookingsAPI');

const app = express()
app.use(express.json())

app.use('/api/coworkingSpace', cospace)


//home page
app.get('/', (req, res) => {
    res.send(`<h1>Partner's home page</h1>
    <a href="/api/coworkingSpace">View Coworking spaces</a>
    <h1>Bookings</h1>

    <a href="/api/RoomBookings"> RoomBookings </a>
    `);

    
});

// Direct routes to appropriate files 

app.use('/api/RoomBookings', RB)

//Get all bookings of a specific user
app.get('/api/RoomBookings/:userID' ,(req, res)=>{
    var RB = RoomBookings.find(p => p.userID === parseInt(req.params.userID));
    if(!RB){
        res.status(404).send('This user has no bookings');

    }
    res.send(RB.bookings);
});

//get the coworking space by id


//view all rooms of a coworking space


//get a room in a specific coworking space by id
app.get('/api/cospace/:id/rooms/:id2' ,(req, res)=>{
    var scheduleroom = PartnerCoworkingSpace.find(p => p.id === parseInt(req.params.id)).rooms.find(s => s.id === parseInt(req.params.id2));
    if(!scheduleroom){
        res.status(404).send('The room with the given id is not found');
        return;
    }
    res.send(scheduleroom.schedule);
});

//book a room , append it to the array of bookings if it is not in my bookings
app.put('/api/cospace/:userid/:id/rooms/:id2/:id3' ,(req, res)=>{
    let scheduleroom = PartnerCoworkingSpace.find(p => p.id === parseInt(req.params.id)).rooms.find(s => s.id === parseInt(req.params.id2));
    if(!scheduleroom){
        res.status(404).send('The room with the given id is not found');
        return;
    };
    const scheduleOfRoom = scheduleroom.schedule;

    const schema = {
        reserved: Joi.boolean()
    };
    const result = Joi.validate(req.body, schema);
    if(result.error){
        res.status(400).send(result.error.details[0].message)
    }

    let h = PartnerCoworkingSpace.find(p => p.id === parseInt(req.params.id)).rooms.find(s => s.id 
        === parseInt(req.params.id2)).schedule.find(r =>r.id === parseInt(req.params.id3));
     let h2 = RoomBookings.find(l2 => l2.userID === parseInt(req.params.userid));

     for(var i = 0;i<h2.bookings.length;i++){
         if(parseInt(req.params.id3) === parseInt(h2.bookings[i].scheduleID) && parseInt(req.params.id2) === parseInt(h2.bookings[i].roomID)){
             res.status(400).send('already reserved');
             return;
         }
        }
     //if(h.id === parseInt())
     const temp = {
        bookingID:h2.bookings.length+1 ,
        coworkingSpaceID:parseInt(req.params.id),
        roomID:parseInt(req.params.id2),
        scheduleID : h.id,
        Date : h.Date,
        time: h.time
    };
    h2.bookings.push(temp);
    var reservation = scheduleOfRoom.find(i => i.id === parseInt(req.params.id3));
    if(reservation.reserved === true){
        res.send('A reserver room');
        return;
    }
    reservation.reserved = req.body.reserved;
    res.send(RoomBookings);
});

//delete booking and set the reservation boolean to false so others can now book it
app.delete('/api/RoomBookings/:userID/:bookingID', (req, res) => {
    const temp = RoomBookings.find(c => c.userID === parseInt(req.params.userID));
    const book = temp.bookings;
    const temp2 = book.find(r => r.bookingID === parseInt(req.params.bookingID));

    if(!temp2){
        res.status(404).send('The room with the given id is not found');
        return;
    };
    let h = PartnerCoworkingSpace.find(p => p.id === parseInt(temp2.coworkingSpaceID)).rooms.find(s => s.id 
        === parseInt(temp2.roomID)).schedule.find(r =>r.id === parseInt(temp2.scheduleID));
    h.reserved = false;
    const index = book.indexOf(temp2);

    book.splice(index,1)

    res.send(RoomBookings)
});

// Handling 404

app.use((req, res) => {

    res.status(404).send({err: 'We can not find what you are looking for'});

 });

const port = 3000
app.listen(port, () => console.log(`Server up and running on port ${port}`))