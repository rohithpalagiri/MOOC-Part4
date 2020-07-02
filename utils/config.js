require('dotenv').config()

let PORT = 3003
let MONGODB_URI = 'mongodb+srv://rohithpalagiri:Rpalagiri12@cluster0-hjlgz.mongodb.net/bloglist?retryWrites=true&w=majority'

module.exports = {
  MONGODB_URI,
  PORT
}