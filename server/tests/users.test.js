const expect = require('expect').expect
const { Users } = require('../utils/users')

describe('Users', () => {
    let users;

    beforeEach(() => {
        users = new Users()
        users.users = [
            {
            id: '1',
            name: 'John Doe',
            room: 'Test Room One'
            },
            {
            id: '2',
            name: 'Joe Doe',
            room: 'Test Room Two'
            },
            {
            id: '3',
            name: 'Jane Doe',
            room: 'Test Room One'
            },
    ]
    })

    it('Should add a new user', () => {
        const users = new Users()
        const user = {
            id: '123',
            name: 'John',
            room : 'test-room'
        }
        const resUser = users.addUser(user.id, user.name, user.room)

        expect(users.users).toEqual([user])
    })

    it('Should returns names of user in Test Room One', () => {
        let userList = users.getUserList('Test Room One')
        expect(userList).toEqual(['John Doe', 'Jane Doe'])
    })
    it('Should returns names of user in Test Room Two', () => {
        let userList = users.getUserList('Test Room Two')
        expect(userList).toEqual(['Joe Doe'])
    })

    it('Should remove a user', () => {
        let userId = '2'
        let user = users.removeUser(userId)
        expect(user.id).toBe(userId)
    })
    it('Should not remove a user', () => {
        let userId = '99'
        let user = users.removeUser(userId)

        expect(user).toBe(undefined)
        expect(users.users.length).toBe(3)
    })

    it('Should find a user', () => {
        let userId = '1'
        let user = users.getUser(userId)
        expect(user.id).toEqual(user.id)
    })
    it('Should not find a user', () => {
        let user = users.getUser('123')
        expect(user).toBe(undefined)
    })
})