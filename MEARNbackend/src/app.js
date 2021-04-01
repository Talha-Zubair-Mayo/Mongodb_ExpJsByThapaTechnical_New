require("dotenv").config();
const express = require("express");
const app = new express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser')
const path = require("path");
const hbs = require("hbs");
require("../src/db/conn");
const auth = require("./middleware/auth");
const Register = require("./models/user");
const port = process.env.PORT || 8080;

const static_path = path.join(__dirname, "../public");
const Templates_path = path.join(__dirname, "../src/templates/views");
const Partial_path = path.join(__dirname, "../src/templates/partials");
app.use(express.static(static_path));
app.set("views", Templates_path);
app.use(cookieParser());
hbs.registerPartials(Partial_path);

app.use(express.json());
app.use(express.urlencoded({ expexted: false }));

app.set("view engine", "hbs");
app.get("/register", (req, res) => {
  res.render("Register");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/secret", auth , (req, res) => {
    
    res.render("secret");
});
app.get("/logout", auth , async (req, res) => {
    
   try {
     
      console.log(req.user);

      /* Logout Single User */
      // req.user.tokens =  req.user.tokens.filter((currElement) =>
      // {
      //   return currElement.token !== req.token;
      // })

      /* Logout all Sessions*/

      req.user.tokens = [];

       res.clearCookie("MERNCookie");
       console.log(`i am  appear when clicked`);
       await  req.user.save();
       res.render("login");
   } catch (error) {
       
    res.status(404).send(error)
   }
});


app.post("/register", async (req, res) => {
  try {
   
    const password = req.body.pass;
    const confrim_Pass = req.body.cpass;
    if (password === confrim_Pass) {
      const Hashh = await bcrypt.hash(password, 10);
      const Register_Emp = new Register({
        fname: req.body.fname,
        lname: req.body.lname,
        pass: Hashh,
        gender: req.body.gender,
        email: req.body.email,
      });

      /* Registration Form Signing Up User with JWT OAuth Token using NodeJS & MongoDB */
      const Tokkk = await Register_Emp.generateAuthToken();
      const reggg = await Register_Emp.save();
      res.cookie("MERNCookie", Tokkk , 
      {
         // expires: new Date(date.now()+ 3600000),
          expires: new Date(Date.now()+ 300000),
          httpOnly:true
      });
      console.log(reggg);
      res.status(200).render("home");
    } else {
      res.send("Pass Does't Matched");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const Email = req.body.email;
    const Password = req.body.pass;
    const lower = Email.toLowerCase();
    const UserEmail = await Register.findOne({ email: lower });
    const isMatch = await bcrypt.compare(Password, UserEmail.pass);
    const Tokkk = await UserEmail.generateAuthToken();
    //const expiry = 3600000*24;
   
    res.cookie("MERNCookie", Tokkk , 
      {
        //   expires:new Date(Date.now()+3600000),
        expires: new Date(Date.now()+ 5*60000),
          httpOnly:true
      }
      
      );
    if (isMatch) {
      res.render("home");
    } else {
      res.send("Email Or Pass is incorrect");
    }
  } catch (error) {}
});

app.listen(port, () => {
  console.log(`Server running On port ${port}`);
});

/* PAssword Encryption Decryption */

// const Secure = async(pass) =>
// {
//     const Hashh = await bcrypt.hash(pass , 12);
//     console.log(Hashh);

//     const Match = await bcrypt.compare(pass , Hashh);
//     console.log(Match);
// }

// Secure("Talha123123");

// const createtoken = async ()=>
// {
//     const token = await jwt.sign({_id :"60630acdb08a813170b47bfc"} , "helloiamtalhazubairmayofromksr");

//     console.log(token)
// }

// createtoken();
