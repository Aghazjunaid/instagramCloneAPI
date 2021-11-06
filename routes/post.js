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

    //=================List All Posts==========================================
    async function getAllPosts(req,res){
        var return_response = { "status": null, "message": null, "data": {} } 
        try {
            const doc = await Post.find({}).sort({ createdAt: -1 });
            return_response.status = 200;
            return_response.message = "Success";
            return_response.data = doc;
        } catch (error) {
            return_response.status = 400;
            return_response.message = String(error);
        }
        res.json(return_response);
    }

    //=================Get Post By Id==========================================
    async function getPostById(req,res){
        var return_response = { "status": null, "message": null, "data": {} } 
        try {
            const doc = await Post.findOne({_id:req.params.id});
            return_response.status = 200;
            return_response.message = "Success";
            return_response.data = doc;
        } catch (error) {
            return_response.status = 400;
            return_response.message = String(error);
        }
        res.json(return_response);
    }




    return {
        addPost,
        getAllPosts,
        getPostById
    }
}