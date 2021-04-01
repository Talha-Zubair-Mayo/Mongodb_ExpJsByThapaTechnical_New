/* Build Complete RESTful API with NodeJS, Express, MongoDB, Mongoose & Postman */

const express = require("express");
const app = express();
require("../src/db/connection");
const Routers = require("../src/routers/mensrouter");
app.use(Routers);
const port = process.env.PORT || 3000;
app.use(express.json());
app.listen(port , ()=>
{
    console.log(`Connection Successfull At Port ${port}`);
})