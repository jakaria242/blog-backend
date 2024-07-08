const mongoose = require("mongoose")
const {Schema} = mongoose

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }

  },{ timestamps: true }
)

module.exports = mongoose.model("Blog",blogSchema)