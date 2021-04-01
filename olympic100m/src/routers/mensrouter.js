const express = require("express");
const MensRanking = require("../models/mens");
const routers =  new express.Router();

// Post Data 

routers.post("/mens" , async (req , res)=>
{
   try {
    console.log(req.body);
    const AddMensRecords = new MensRanking(req.body);
    const AddedPlayer = await AddMensRecords.save();
    if(!req.body)
    {
        res.status(400).send(`Please Fill Details`)
    }
    res.status(200).send(AddedPlayer);

    
   } catch (error) {
    
    res.status(404).send(error);
    
   }
})

/* Get All Players */
routers.get("/mens" , async (req , res)=>
{
   try {
   
    const GetPlayers = await MensRanking.find().sort({"rankings":1});

    console.log(GetPlayers);
    if(!GetPlayers)
    {
        res.status(400).send(`Please Fill Details`)
    }
    res.status(200).send(GetPlayers);

    
   } catch (error) {
    
    res.status(404).send(error);
    
   }
})

/* Get Single Player By id*/
routers.get("/mens/:id" , async (req , res)=>
{
   try {
    
    const _id = req.params.id;
    const GetPlayer = await MensRanking.findById(_id);
    
    if(!GetPlayer)
    {
        res.status(400).send(`Inavalid ID`)
    }
    res.status(200).send(GetPlayer);

    
   } catch (error) {
    
    res.status(404).send(error);
    
   }
})

/* Get Single Player By id*/
routers.patch("/mens/:id" , async (req , res)=>
{
   try {
    
    const _id = req.params.id;
    const UpdatePlayer = await MensRanking.findByIdAndUpdate(_id, req.body ,
        {
            new:true
    });

    console.log(UpdatePlayer);
    
    if(!_id)
    {
        res.status(400).send(`Inavalid ID`)
    }
    res.status(200).send(UpdatePlayer);

    
   } catch (error) {
    
    res.status(404).send(error);
    
   }
})


/* Delete Player by Id */
routers.delete("/mens/:id" , async (req , res)=>
{
   try {
    
    const _id = req.params.id;
    const DeletePlayer = await MensRanking.findByIdAndDelete(_id);

    console.log(DeletePlayer);
    
    if(!_id)
    {
        res.status(400).send(`Inavalid ID`)
    }
    res.status(200).send(DeletePlayer);

    
   } catch (error) {
    
    res.status(404).send(error);
    
   }
});


module.exports = routers;