var express = require('express'),
apiRouter = express.Router();
var multer  = require('multer');
const upload = multer()

utils = require('../utils/utils')();
user = require('./user')();


apiRouter.get('', (req, res) => {
    res.status(200).send("Node api demo")
})

//===============User api===================
apiRouter.post('/register', user.registerUser);
apiRouter.post('/login', user.loginUser);
apiRouter.get('/ownProfile', utils.authenticateToken , user.getOwnProfile);
apiRouter.post('/upload/ProfileImage', utils.authenticateToken , upload.single('image'), user.updateProfileImage);
apiRouter.post('/editOwnProfile', utils.authenticateToken , user.editOwnProfile);


module.exports = apiRouter;
