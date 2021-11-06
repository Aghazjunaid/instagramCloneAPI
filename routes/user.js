const User = require("../models/user")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = () => {
    
    //=====================register user api=============================================
    async function registerUser(req, res) {
        var return_response = {
            "status": null,
            "message": null,
            "data": null
        }
        try{
            var user = await User.findOne({email : req.body.email})
            if (user) {
                return_response["message"] = "User already exist!";
                return_response["status"] = 400;
                return res.send(return_response);
            } else {
                var opt = req.body;
                const salt = await bcrypt.genSaltSync(10);
                opt.password = await bcrypt.hashSync(opt.password, salt);
                const token = jwt.sign({
                    email:opt.email,
                }, "gsjkah35gsj546b5t",{
                    expiresIn: "24h"
                });
                user = new User(opt);
                user = await user.save();
                user._doc.token = token;
                return_response["status"] = 200;
                return_response["message"] = "success";
                return_response["data"] = user;
                return res.send(return_response);
            }
        }catch (error) {
            return_response["message"] = String(error);
            return res.status(400).send(return_response);
        }
    }

    //=================login user api====================================================
    async function loginUser(req,res){
        var return_response = {"status": null, "message": null, "data": null}
        try {
            const user = await User.findOne({email:req.body.email});
            if(user) {
                const isMatch = await bcrypt.compare(req.body.password, user.password)
                if(!isMatch){
                    return_response["status"] = 400;
                    return_response["message"] = "Invalid login details";
                }else {
                    const token = jwt.sign({
                        email:user.email,
                        id:user._id,
                    }, "gsjkah35gsj546b5t",{
                        expiresIn: "24h"
                    });
                    user._doc["token"] = token;
                    return_response["status"] = 200;
                    return_response["message"] = "Login Success";
                    return_response["data"] = user;
                }
            }
            else {
                return_response["status"] = 400;
                return_response["message"] = "User not found";
            }
        } catch (error) {
            return_response["message"] =  "Invalid credentials";
            return_response["status"] = 400;
        }
        return res.status(return_response["status"]).json(return_response);
    }


    //===============================getOwnProfile=======================================
    async function getOwnProfile(req,res){
        var return_response = { "status": null, "message": null, "data": {} } 
        try {
            const doc = await User.findOne({user:req.user.id});
            return_response.status = 200;
            return_response.message = "Success";
            return_response.data = doc;
        } catch (error) {
            return_response.status = 400;
            return_response.message = String(error);
        }
        res.json(return_response);
    }

    //================================upload Profile Image=================================
    async function updateProfileImage(req, res){
        var return_response = {"status": 200,"message": "Success","data": null}
        try {
            var file = req.file; 
            const user = await User.findOne({_id: req.user.id});
            if(user){
                var imageUrl = await utils.dropboxUpload(file);
                if(imageUrl) {
                    user.profileImage = imageUrl;
                    let doc = await user.save();
                    return_response["status"] = 200;
                    return_response["message"] = "success";
                    return_response["data"] = doc;
                } else {
                    return_response["status"] = 400;
                    return_response["message"] = "Invalid request!";
                }
            } else {
                return_response["status"] = 404;
                return_response["message"] = "This User does not exist!";
            }
        } catch (error) {
            return_response["message"] = String(error);
            return_response["status"] = 400;
        }
        return res.status(400).send(return_response);
    }

    return {
        registerUser,
        loginUser,
        getOwnProfile,
        updateProfileImage
    }
}