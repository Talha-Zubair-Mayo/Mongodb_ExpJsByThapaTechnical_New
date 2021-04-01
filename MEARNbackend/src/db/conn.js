require('dotenv').config();
const mongoose = require("mongoose");
const DB = process.env.CONNECTION_URL

mongoose
  .connect( "mongodb://localhost:27017/Registration" , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log(`Connected Successfully...... `);
  })
  .catch((err) => {
    console.log(`Connection failed`);
  });
