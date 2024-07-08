const Blog = require('../model/blogModel')

let getAllBlogController = async (req,res) => {
   const data = await Blog.find({}).populate("postedBy")

   res.send(data)
}

module.exports = getAllBlogController