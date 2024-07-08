const mongoose = require("mongoose")
const {Schema} = mongoose

const registrationSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    emailVerify: {
        type: Boolean,
        default: false
    }
  },{ timestamps: true }
)

module.exports = mongoose.model("User",registrationSchema)

