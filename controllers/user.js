const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', async (request, response) =>{
    const users = await User
        .find({}).populate('blogs', {title: 1, author: 1, url: 1, like: 1})

    response.json(users.map((user) => user.toJSON()))
})

userRouter.post('/', async (request, response) => {
    const body = request.body
    const users = await User.find({})
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const correctNameLength = await body.userName.length >= 3

    const correctPasswordLength = await body.password.length >= 3

    const containsName = await users.some((user) => user.userName === body.userName)

    console.log('is this unique', containsName);
    
    if(!correctNameLength || !correctPasswordLength){
        return response.status(401).json({error: 'Invalid Username or Password'})
    } else if(containsName){
        return response.status(401).json({error: 'This name already exists'})
    }

    const user = new User({
        userName: body.userName,
        name: body.name,
        passwordHash
    })

    const savedUser = await user.save()

    response.json(savedUser)
})

module.exports = userRouter