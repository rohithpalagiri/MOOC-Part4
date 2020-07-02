const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {

  const blogs = await Blog
    .find({}).populate('user', {userName: 1, name: 1})

  response.json(blogs.map((blog) => blog.toJSON()))
})

blogRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then(post => {
      if (post) {
        response.json(post.toJSON())
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

blogRouter.post('/', async (request, response, next) => {
  const body = request.body

  const user = await User.findById(body.userId)

  console.log('This is the user that was found', user);

  const post = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedPost = await post.save()
  console.log('This is the savedpost', savedPost);
  
  user.blogs = user.blogs.concat(savedPost._id)
  await user.save()

  response.json(savedPost.toJSON())

})

blogRouter.delete('/:id', (request, response, next) => {
  Blog.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

blogRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const post = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  Blog.findByIdAndUpdate(request.params.id, post, { new: true })
    .then(updatedPost => {
      response.json(updatedPost.toJSON())
    })
    .catch(error => next(error))
})

module.exports = blogRouter