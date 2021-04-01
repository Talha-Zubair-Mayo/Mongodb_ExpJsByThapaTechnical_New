const express = require("express");
const Student = require("../models/students");
const router =  new express.Router();

/* Challenge 1: Build Your Own REST API using Async-Await with Nodejs Express and MongoDB */

router.post("/students", async (req, res) => {
  try {
    const user = Student(req.body);
    const createUSer = await user.save();
    res.status(201).send(createUSer);
    console.log(createUSer);
  } catch (error) {
    res.status(400).send(error);
  }
});

/* #3: Build RESTFul API ✌ Handling Get Request in REST API using NodeJS & MongoDB */

/* Read Data of all students */

router.get("/students" , async(req , res)=>
{
    try {
        const studentsdata = await Student.find();
        console.log(studentsdata);
        res.status(200).send(studentsdata);
    } catch (error) {
        res.status(400).send(error)
    }
}
)

/* Get Data Of Single Student By ID */

router.get("/students/:id" , async(req , res)=>
{
    try {

        const _id = req.params.id;
        
        const studentdata = await Student.findById(_id);
        console.log(studentdata);
        if (!studentdata)
        {
            res.status(400).send(`Student Does't exist`);
        }
        else
       {
        res.status(200).send(studentdata);
       }
    } catch (error) {
        res.status(400).send(error)
    }
}
)

/* Patch Or update data of student  */

router.patch("/students/:id" , async(req , res)=>
{
    try {

    const _id = req.params.id;
      const updatedData = await Student.findByIdAndUpdate(_id , req.body , {
          new:true,
      })
      console.log(updatedData);
      res.status(200).send(updatedData)
      
        
    } catch (error) {
        res.status(400).send(error)
    }
}
)

/* #5: Build RESTFul API ✌ Handling DELETE Request in REST API using NodeJS & MongoDB */

router.delete("/students/:id" , async(req , res)=>
{
    try {

    const _id = req.params.id;
    const DeletedData = await Student.findByIdAndDelete(_id)
      console.log(DeletedData);
    if(!_id)
      {
        res.status(400).send()
      }
      res.status(200).send(DeletedData)
      
        
    } catch (error) {
        res.status(400).send(error)
    }
}
)


module.exports = router;