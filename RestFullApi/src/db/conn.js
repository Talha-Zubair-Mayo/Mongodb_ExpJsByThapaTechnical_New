const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/student-api", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true,
    
  })
  .then(() => {
    console.log(`Connected Successfully...... `);
  })
  .catch((err) => {
    console.log(`Connection failed`);
  });