
module.exports = PartnerCoworkingSpace = [
    {
        id: 1,
        name : "vintage",
        rooms : [
        {
            id:1,capacity: 50,schedule: [{id:1, Date:"2017-10-01", time: 7, reserved: true},{id:2, Date:"2017-10-01", time :7, reserved: false}]
        },
        {
            id:2,capacity: 50,schedule: [{id:1, Date:"2017-10-01", time: 8, reserved: false},{id:2, Date:"2017-10-01", time: 7, reserved: false}]
        },
        {
            id:3,capacity: 50,schedule: [{id:1, Date:"2017-10-01", time: 9, reserved: false},{id:2, Date:"2017-10-01", time: 7, reserved: false}]
        },
    ]
    }
]