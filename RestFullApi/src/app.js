const express = require("express");
const app = express();
require("./db/conn");
const Student = require("./models/students");
const StudentRouter = require("./routers/studentRouters");
const port = process.env.PORT || 8000;
app.use(express.json());
app.use(StudentRouter);

/* Create A New Student */
// app.post("/students" , (req, res)=>
// {
//     console.log(req.body);
//     const user = Student(req.body);
//     user.save().then(()=>
//     {
//         res.status(201).send(user);
//     }).catch((err)=>
//     {
//         res.status(400).send(err);
//     })

// })

// /* Challenge 1: Build Your Own REST API using Async-Await with Nodejs Express and MongoDB */

// app.post("/students", async (req, res) => {
//   try {
//     const user = Student(req.body);
//     const createUSer = await user.save();
//     res.status(201).send(createUSer);
//     console.log(createUSer);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

// /* #3: Build RESTFul API ✌ Handling Get Request in REST API using NodeJS & MongoDB */

// /* Read Data of all students */

// app.get("/students" , async(req , res)=>
// {
//     try {
//         const studentsdata = await Student.find();
//         console.log(studentsdata);
//         res.status(200).send(studentsdata);
//     } catch (error) {
//         res.status(400).send(error)
//     }
// }
// )

// /* Get Data Of Single Student By ID */

// app.get("/students/:id" , async(req , res)=>
// {
//     try {

//         const _id = req.params.id;
        
//         const studentdata = await Student.findById(_id);
//         console.log(studentdata);
//         if (!studentdata)
//         {
//             res.status(400).send(`Student Does't exist`);
//         }
//         else
//        {
//         res.status(200).send(studentdata);
//        }
//     } catch (error) {
//         res.status(400).send(error)
//     }
// }
// )

// /* Patch Or update data of student  */

// app.patch("/students/:id" , async(req , res)=>
// {
//     try {

//     const _id = req.params.id;
//       const updatedData = await Student.findByIdAndUpdate(_id , req.body , {
//           new:true,
//       })
//       console.log(updatedData);
//       res.status(200).send(updatedData)
      
        
//     } catch (error) {
//         res.status(400).send(error)
//     }
// }
// )

// /* #5: Build RESTFul API ✌ Handling DELETE Request in REST API using NodeJS & MongoDB */

// app.delete("/students/:id" , async(req , res)=>
// {
//     try {

//     const _id = req.params.id;
//     const DeletedData = await Student.findByIdAndDelete(_id)
//       console.log(DeletedData);
//     if(!_id)
//       {
//         res.status(400).send()
//       }
//       res.status(200).send(DeletedData)
      
        
//     } catch (error) {
//         res.status(400).send(error)
//     }
// }
// )
app.listen(port, () => {
  console.log(`Connection is established at port ${port}`);
});