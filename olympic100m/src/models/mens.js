const mongoose = require("mongoose");

/* Defining The Database  or Cluster Schema */

const mensSchema = new mongoose.Schema({

    rankings:
    {
        type:Number,
        require:true,
        unique:true
    },

    name:
    {
        type:String,
        required:true,
        trim:true,

    }
    ,

    Dob:
    {
        type:Date,
        required:true,
        trim:true,
        
    }
    ,

    country:
    {
        type:String,
        required:true,
        trim:true,
        
    }
    ,
    score:
    {
        type:Number,
        require:true,
        trim:true,
       
    },

    event:
    {
        type:String,
        require:true,
        default: "100M"
    },



})

/* Creating A New Collection */

const MensRanking =  new mongoose.model("MensRanking" , mensSchema);

// Exporting Model/ Collection

module.exports= MensRanking;