const mongoose = require("mongoose");
const validator = require("validator");

/* Creatng A new Schema  */

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
  },
  email: 
  {
      type:String,
      require:true,
      unique:[true, "Email Already Exist...."],
      validate(value)
      {
          if(!validator.isEmail(value))
          {
              throw new Error("Please Enter A Valid Email");
          }
      }
  }
  ,
  phone:
  {
      type:Number,
      require:true,
      validate(value)
      {
          if(value<0)
          {
              throw new Error("Negatives not Allowed")
          }
      },
      unique:[true, "Phone Number Already Exist...."],

  }
  ,
  roll_num:
  {
      type:Number,
      require:true,
      validate(value)
      {
          if(value<0)
          {
              throw new Error("Roll Number Must Be Greater Than Zero")
          }
      }
  },
  address:
  {
    type:String,
      require:true,
     
  }
});

/* creating a New Collection  */

const Student = new mongoose.model("Student" , StudentSchema);

module.exports = Student;
 

