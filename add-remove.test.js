const deleteTask = require('../Add-remove.js')

describe("this is a mock function test for adding and removing", () => {
    test("testing the delete function", () => {
        const tasks = [
            {
                descripiton: 'string',
                completed: false,
                index: 0
            },
            {
                descripiton: 'string',
                completed: false,
                index: 1
            },
            {
                descripiton: 'string',
                completed: false,
                index: 2
            }
        ]
        deleteTask(1)

        expect(tasks.length).toBe(2)
    })
}
   
)