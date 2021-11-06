module.exports = () => {
    const jwt = require('jsonwebtoken');

    function authenticateToken(req, res, next) {
        const token = req.headers['authorization'];
        if (!token){
            return res.status(401).send("Invalid authorization");
        } else {
            jwt.verify(token, "gsjkah35gsj546b5t", (error, user) => {
                if (error){
                    return res.status(400).send(error);
                }
                req.user = user;
                next();
            })
        }
    }

    function validateImage(file) {
        return_value = {"name": "", "status": false}
        try {
          if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
            return_value["name"]=file.originalname;
            return_value["status"] = true
          } else{
            return_value["status"] = false
          }
        } catch (error) {
          return_value["status"] = false
        }
        return return_value
    }
    
      async function dropboxUpload(file){
        let response = validateImage(file)
        if(response.status) {
          let newFilename = `${otpGenerator()}_${response.name}`
          let contents = file.buffer;
          let uploaded = await dbx.filesUpload({ path: `/images/${newFilename}`, contents})
          if(uploaded.status === 200) {
            var result = await dbx.sharingCreateSharedLink({path:`/images/${newFilename}`});
            return result.result.url.split("dl")[0] + 'raw=1';
          } else {
            return null
          }
        }else {
          return null
        }
      }
    
    

    return {
        authenticateToken,
        dropboxUpload
    }
}