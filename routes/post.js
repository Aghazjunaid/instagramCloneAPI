const Post = require("../models/posts")
const utils = require('../utils/utils')();
const User = require("../models/user")

module.exports = () =>{

    //=================add Posts===============================================
    async function addPost(req,res){
        var return_response = { "status": null, "message": null, "data": {} } 
        try {
            var file = req.file;
            let opt = req.body;
            const doc = await User.findOne({_id:req.user.id});
            var imageUrl = await utils.dropboxUpload(file);
            const post = new Post({
     
                image: imageUrl,
                title: opt.title,
                postedBy: {
                    fullname: doc.fullname,
                    posterImg: doc.profileImage,
                    id: req.user.id
                }
            });

            let data = await post.save()
            return_response.status = 200;
            return_response.message = "Post Added Successfully";
            return_response.data = data;
        } catch (error) {
            return_response.status = 400;
            return_response.message = String(error);
        }
        res.json(return_response);
    }


    return {
        addPost
    }
}