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
          followedBy: { type: Schema.Types.ObjectId, ref: "user" },
        },
      ],
      following: [
        {
          fullname:String ,
          username:String ,
          image: String,
          followingBy: { type: Schema.Types.ObjectId, ref: "user" },
        },
      ],
}, {timestamps: true});


module.exports = mongoose.model("user", UserSchema)