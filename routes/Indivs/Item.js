import * as express from "express";
// import mongoose from "mongoose";
import Item from "../../models/indivs/Items.js";

const router = express.Router();






// getting all
router.get("/", async (req, res) => {
    try {
      const item = await Item.find().sort("name");
      res.send(item);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


  // getting one
  router.get("/byid/:id", getItem, (req, res) => {
    res.json(res.item);
  });


  // getting one by name
  router.get("/byname/:name", getItem, (req, res) => {
    res.json(res.item);
  });


  //create one
  router.post("/", ItemExist, async (req, res) => {
    const item = new Item({...req.body})
    try {
      const newItem = await item.save();
      res.status(201).json(newItem);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
/*
  // updating ones name and level by id
  router.patch('/byid/:id', DomiExist,getDomi, async (req,res)=>{
    if(req.body.name != null){
        res.domi.name = req.body.name
    }
    if(req.body.level != null){
      if(req.body.level>res.domi.level){
        res.domi.level = req.body.level
        res.domi.MNC = Math.floor(3+(res.domi.level/2))
      }
    }
    console.log(res.domi)
    try {
        const updomi = await res.domi.save()
        res.json(updomi)
    } catch (error) {
        res.status(400).json({message: ["could not save domi via update by id",error.message]})
    }
    
  })
  */

  // updating one by name
  router.patch('/byname/:name',ItemExist,getItem, async (req,res)=>{
    //   if(req.body.name != null){
    //       res.item.name = req.body.name
    //   }
    //   if(req.body.level != null){
    //     if(req.body.level>res.domi.level){
    //       res.domi.level = req.body.level
    //       res.domi.MNC = Math.floor(3+(res.domi.level/2))
    //     }
    //   }

    let keylist = Object.keys(req.body)
    for(let k of keylist){
        res.item[k]=req.body[k]
    }
      console.log(res.item)
      try {
          const upitem = await res.item.save()
          res.json(upitem)
      } catch (error) {
          res.status(400).json({message: ["could not save item via update by name",error.message]})
      }
      
  })
  
  
  // deleteing one
  router.delete('/byid/:id',getItem, async (req,res)=>{
    try {
        await res.item.remove()
        res.json({message: " item deleted and removed"})
    } catch (error) {
        res.status(500).json({message: ["Could not remove item by id",error.message]})
        
    }
    
  })
  

  // deleteing one
  router.delete('/byname/:name',getItem, async (req,res)=>{
      try {
          await res.item.remove()
          res.json({message: " item deleted and removed"})
      } catch (error) {
          res.status(500).json({message: ["Could not remove item by name",error.message]})
          
      }
      
  })
  
  
  export async function getItem(req, res, next) {
    let item;
    try {
      if (req.params.id) {
          try {
              let Objectid = mongoose.Types.ObjectId
              let verify = Objectid(req.params.id)
              if(verify == req.params.id){
                  item = await Item.findById(req.params.id);
                  if (item == null) {
                      return res.status(404).json({ message: "Cannot Find item by this id" });
                  }
              }
              
          } catch (error) {
              return res.status(400).json({ messages: ["Id Provided is not a valid id check formatting",error.message] });
          }
      } else if (req.params.name || req.body.itemname){
        let searchname = req.params.name?req.params.name:req.body.itemname
          item = await Item.find({ name: searchname });
          if (item == null || item.length==0) {
              return res.status(404).json({ message: "Cannot Find item by this name" });
          }
          if(item.length>1){
            return res.status(400).json({ message: "More then one item found" });
          }
          item = item[0]
  
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
    res.item = item;
    next();
  }
  
  
  async function ItemExist(req, res, next) {
    let item;
    try {
  
      if(req.body.name){
        item = await Item.findOne({ name: req.body.name });
      }
      if (item) {
        return res
          .status(400)
          .json({ message: "This Name Seems to be taken, try another" });
      }
      
    }
    catch (error) {
      return res.status(500).json({ message: error.message });
    }
    next();
  }
  

  export default router;
  