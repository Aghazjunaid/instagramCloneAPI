const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var UserSchema = new Schema({
    fullname: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    username: { type: String },
    password: {type: String, required:true},
    profileImage: {
        type: String,
      },
     
      bio: {
        type: String,
      },
      followers: [
        {
          fullname:String ,
          username:String ,
          image: String,
          followedBy: { type: ObjectId, ref: "User" },
        },
      ],
      following: [
        {
          fullname:String ,
          username:String ,
          image: String,
          followingBy: { type: ObjectId, ref: "User" },
        },
      ],
}, {timestamps: true});


module.exports = mongoose.model("user", UserSchema)