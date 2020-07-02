const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://rohithpalagiri:${password}>@cluster0-hjlgz.mongodb.net/bloglist?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

const post = new Blog({
    title: 'New Post',
    author: 'Rohith',
    url: 'http://rohith.io',
    likes: 50
})

Blog.find({}).then(result => {
    result.forEach(post => {
        console.log(post)
    })
    mongoose.connection.close()
})