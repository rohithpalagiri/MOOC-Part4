const bcrypt = require('bcrypt')
const User = require('../models/user')
const mongoose = require('mongoose')
const helper = require('./test__helpers')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

describe('When there is one user in DB', () =>{
    beforeEach(async () =>{
        await User.deleteMany({})
        const user = new User({
            userName: 'RohithPalagiri',
            name: 'Rohith',
            password: 'secret'
        })
        await user.save()
    })

    test('creation of the single user succeeded', async () =>{
        const initialUsers = await helper.usersInDb()

        console.log('INITIAL USERS', initialUsers);
        

        const newUser = {
            userName: 'User2',
            name: 'Test',
            password: 'newPassword'
        }

        await api
            .post('/api/users')
            ,send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()

        expect(usersAtEnd.length).toBe(initialUsers.length + 1)

        const usernames = usersAtEnd.map(u => u.userName)

        expect(usernames).toContain(newUser.userName)
    })
})

afterAll(() => {
    mongoose.connection.close()
})