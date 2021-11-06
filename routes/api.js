var express = require('express'),
apiRouter = express.Router();
var multer  = require('multer');
const upload = multer()

utils = require('../utils/utils')();
user = require('./user')();
post = require('./post')();

apiRouter.get('', (req, res) => {
    res.status(200).send("Node api demo")
})

//===============User api===================
apiRouter.post('/register', user.registerUser);
apiRouter.post('/login', user.loginUser);
apiRouter.get('/ownProfile', utils.authenticateToken , user.getOwnProfile);
apiRouter.post('/upload/ProfileImage', utils.authenticateToken , upload.single('image'), user.updateProfileImage);
apiRouter.post('/editOwnProfile', utils.authenticateToken , user.editOwnProfile);
apiRouter.get('/getAllUsersPosts', utils.authenticateToken , user.getAllUsersPosts);

//===============posts api==================
apiRouter.post('/addPost', utils.authenticateToken, upload.single('image'), post.addPost);
apiRouter.get('/getAllPosts', utils.authenticateToken , post.getAllPosts);
apiRouter.get('/getPost/:id', utils.authenticateToken , post.getPostById);


module.exports = apiRouter;
