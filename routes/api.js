var express = require('express'),
apiRouter = express.Router();

utils = require('../utils/utils')();
user = require('./user')();


apiRouter.get('', (req, res) => {
    res.status(200).send("Node api demo")
})

//===============User api===================
apiRouter.post('/register', user.registerUser);
apiRouter.post('/login', user.loginUser);
apiRouter.get('/ownProfile', utils.authenticateToken , user.getOwnProfile);


module.exports = apiRouter;
