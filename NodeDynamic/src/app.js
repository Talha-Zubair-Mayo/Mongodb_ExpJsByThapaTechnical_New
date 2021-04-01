require("dotenv").config();
const express = require("express");
const app = express();
require("./db/conn");
const path = require("path");
const hbs = require("hbs");
const Register = require("./models/Register");
const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser');
const auth = require("./middleware/auth");

const port = process.env.PORT || 8080;

/*Setting The Paths */
const staticPath = path.join(__dirname, "../public");
const templatepath = path.join(__dirname, "../src/templates/views");
const Partials = path.join(__dirname, "../src/templates/partials");

/* Middlewares  */
app.use("/css", express.static(path.join(__dirname, "../public/css")));
app.use("/js", express.static(path.join(__dirname, "../public/css")));
app.use(express.static(staticPath));
app.set("view engine", "hbs");
app.set("views", templatepath);
hbs.registerPartials(Partials);
app.use(express.json());
app.use(express.urlencoded({ expexted: false }));
app.use(cookieParser());

/* Routing  */

app.get("/", (req, res) => {
  res.render("Home");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/shop", auth,  (req, res) => {
  res.render("shop");
});
app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/shop-single", auth,  (req, res) => {
  res.render("shop-single");
});

app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/Register", (req, res) => {
  res.render("Register");
});




/* Sign Up post Method */

app.post("/Register", async (req, res) => {
  try {
    const passw = req.body.pass;
    const cpass = req.body.cpass;
    if (passw === cpass) {
      /* Encrypting The PassWord  */

      const Encrypt =  await bcrypt.hash(passw, 10);

      /* Getting data From Form And Saving it in to Our Model  */
      const Register_user = new Register({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        pass: Encrypt,
        phone: req.body.phone,
        address: req.body.address,
      });

      const Tokkk = await Register_user.generateAuthToken();
      const reggg = await Register_user.save();
      res.cookie("MERNCookie", Tokkk , 
      {
         // expires: new Date(date.now()+ 3600000),
          expires: new Date(Date.now()+ 300000),
          httpOnly:true
      });
     
    
      res.render("login");
    } else {
      res.status(404).send("Password Does't Matched");
    }
  } catch (error) {
    res.status(404).render("Something Wrong");
  }
});

/* Login */

app.post("/login", async (req, res) => {
  try {
    const Email = req.body.email;
    const Password = req.body.pass;
    const lower = Email.toLowerCase();
    const UserEmail = await Register.findOne({ email: lower });
    /* Comparing Pass From Front END And From DB */
    const isMatch = await bcrypt.compare(Password, UserEmail.pass);
    
    if(isMatch) {
        const Tokkk = await UserEmail.generateAuthToken();
        //const expiry = 3600000*24;
       
        res.cookie("MERNCookie", Tokkk , 
          {
            //   expires:new Date(Date.now()+3600000),
            expires: new Date(Date.now()+ 5*60000),
              httpOnly:true
          }
          
          );
      res.render("home");
    } else {
      res.send("Email Or Pass is incorrect");
    }
  } catch (error) {
        
        res.status(404).send(`Something Is Wrong please try again`)
    }
});


/* Logout */

app.get("/logout", auth , async (req, res) => {
    
    try {
 
       /* Logout Single User */
       // req.user.tokens =  req.user.tokens.filter((currElement) =>
       // {
       //   return currElement.token !== req.token;
       // })
 
       /* Logout all Sessions*/
 
       req.user.tokens = [];
 
        res.clearCookie("MERNCookie");
       
        await  req.user.save();
        res.render("login");
    } catch (error) {
        
     res.status(404).send(error)
    }
 });
 
 

/* Creating Server  */

app.listen(port, () => {
  console.log(`Server Started At Port ${port}`);
});
