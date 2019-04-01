

const funcs = require('./consultancyAgency.functions');
const axios = require('axios');
//jest.mock('axios');
jest.setTimeout(30000);

describe("GET /recommended tasks/1", () => {
test("Gets the recommend tasks for a specific member. Gives tasks of the same field as the member", async () => {
    
    const member = axios.get('http://localhost:4000/api/member/viewMember/5')
    const tasks = axios.get('http://localhost:4000/api/consultancyAgency/filterTasks/5')
expect.assertions(tasks.length)
console.log(tasks)
for (var i = 0; i < tasks.length; i++) {
    expect(tasks[i].field === member.field).toBe(true)
}

//Ask why this code does not perform as the above used one
/*tasks.forEach(function(entry) {
            expect(entry.field===member.field).toBe(true)
});*/

});
});

describe("GET /recommended applicants/1", () => {
    test("Gets the recommend applicants for a specific partner's tasks. Gives members of the same field as the tasks", async () => {
       // jest.setTimeout(30000);
        const tasks = axios.get('http://localhost:4000/api/consultancyAgency/filterApplicants/77')
    const count =0
    console.log(tasks)
    for (var i = 0; i < tasks.length; i++) {
        const field = tasks[i].field
        for(var j = 0; j<tasks[j].applicants.length; j++){
        count++
        expect(field === tasks[i].applicants[j].field).toBe(true)
    }
}   expect.assertions(count)

    
    });
    });

module.exports