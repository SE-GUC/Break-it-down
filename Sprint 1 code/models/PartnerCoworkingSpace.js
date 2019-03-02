const uuid = require('uuid')
//const json = require('json')



module.exports = PartnerCoworkingSpace = [
    {
        id: 1,
        name : "vintage",
        rooms : [

        {
            id:10,capacity: 100, schedule: [{id: 100, user:{name: 'Mariam', ID: 90, field: 'ENG', MemberTasks:[]}, Date:new Date('2019-12-15'), time: 7, reserved: true, },{id: 400,user: {name: 'Eman', ID: 93, field: 'ENG', MemberTasks:[]}, Date:new Date('2019-02-28'), time :7, reserved: true}]
        },
        {
            id:20,capacity: 70, schedule: [{id: 200, user:{name: 'Janna', ID: 91, field: 'ENG', MemberTasks:[]}, Date:new Date('2019-09-11'), time: 8, reserved: true},{id: 500, user: {name: 'Reem', ID: 94, field: 'ENG', MemberTasks:[]}, Date:new Date('2019-03-11'), time: 7, reserved: true}]
        },
        {
            id:30,capacity: 80,schedule: [{id: 300,user:{name: 'Lina', ID: 92, field: 'ENG', MemberTasks:[]}, Date:new Date('2019-04-23'), time: 9, reserved: true},{id: 600, user: {}, Date:new Date('2019-06-15'), time: 7, reserved: false}]
        }
               ]
    },


    {
        id: 2,
        name : "icecairo",
        rooms : [
            {
                id:10,capacity: 150, schedule: [{id: 100, user: {name: 'Omar', ID: 96, field: 'ENG', MemberTasks:[]}, Date:new Date('2019-12-15'), time: 7.30, reserved: true, },{id: 400,user: {}, Date:new Date('2019-02-28'), time :7.45, reserved: true}]
            },
            {
                id:20,capacity: 70, schedule: [{id: 200, user: {}, Date:new Date('2019-03-11'), time: 22.00, reserved: false}]
            },
            {
                id:30,capacity: 90,schedule: [{id: 300,user: {}, Date:new Date('2019-04-23'), time: 9.30, reserved: false},{id: 600, user: {}, Date:new Date('2019-06-15'), time: 20.00, reserved: false}]
            }
                ]
    }

]

//To convert the date format to yyyy/mm/dd
function formatDate(d) {
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

//module.exports = PartnerCoworkingSpace