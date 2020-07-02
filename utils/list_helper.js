const blog = require("../models/blog");

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogPosts) => {

    total = blogPosts.reduce((a, b) => +a + +b.likes, 0)
    
    return total
}

const favoriteBlog = (blogList) => {
    const maxValue = Math.max(...blogList.map((x) => x.likes), 0)

    return maxValue;
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}