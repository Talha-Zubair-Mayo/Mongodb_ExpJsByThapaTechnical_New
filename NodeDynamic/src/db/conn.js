const mongoose  = require("mongoose");

/* Creating a Database */
mongoose
  .connect( "mongodb://localhost:27017/NodeDynamicWeb" , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log(`Connected To Db Successfully...... `);
  })
  .catch((err) => {
    console.log(`Connection failed`);
  });
