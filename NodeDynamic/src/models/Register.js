require("dotenv").config();
const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  fname: {
    type: String,
    require: true,
    trim: true,
  },

  lname: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    lowercase: true,
    unique: [true, "Email Already Exist...."],
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Please Enter A Valid Email");
      }
    },
  },
  pass: {
    type: String,
    require: true,
    trim: true,
  },

  phone: {
    type: Number,
    require: true,
    validate(value) {
      if (value < 0) {
        throw new Error("Negatives not Allowed");
      }
    },
  },

  address: {
    type: String,
    require: true,
    trim: true,
  },

  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

/* Creating Token via middleware */

UserSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign(
      { _id: this._id.toString() },
      process.env.SECRET_KEY
    );
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (error) {
    console.log(`There Is An Error ` + error);
  }
};

/* Create Collection */

const Adduser = new mongoose.model("Adduser", UserSchema);

module.exports = Adduser;
