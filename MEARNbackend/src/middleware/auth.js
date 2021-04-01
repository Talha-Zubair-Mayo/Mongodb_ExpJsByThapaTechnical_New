const jwt = require("jsonwebtoken");
const Register = require("../models/user");

const auth =  async (req , res , next) =>
{
    try {
    
          const token = req.cookies.MERNCookie;
          const verifyUser = await jwt.verify(token , process.env.SECRET_KEY);
          const user = await Register.findOne({_id:verifyUser._id});
          console.log(verifyUser);
          console.log(user.fname);
          req.token = token;
          req.user = user;
          next();
         

    } catch (error) {
        res.status(404).send(error);
    }

}

module.exports = auth;