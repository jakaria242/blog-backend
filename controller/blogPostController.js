const Blog = require('../model/blogModel')

let blogPostController = (req,res) => {
  const {title, description, image, postedBy} = req.body

  if ([title, description, postedBy].some((field)=> field == "")) {
    return res.json({error : "All field are required", status:400})
  }
  let blog = new Blog({
    title: title,
    description: description,
    image: req.file.path,
    postedBy: postedBy,
  })
  blog.save()
  res.send({message: "Blog post Successfull"})
}

module.exports = blogPostController