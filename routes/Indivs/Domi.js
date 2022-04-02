import * as express from "express";
import mongoose from "mongoose";
import Domi from "../../models/indivs/Domi.js";
import { getItem} from "./Item.js";


const router = express.Router();

function lvltoMNC(lvl){

  return Math.floor(3+(lvl/2))

}

// getting all
router.get("/", async (req, res) => {
  try {
    const domi = await Domi.find().sort("name");
    res.send(domi);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// getting one
router.get("/byid/:id", getDomi, (req, res) => {
  res.json(res.domi);
});

// getting one by name
router.get("/byname/:name", getDomi, (req, res) => {
  res.json(res.domi);
});

//create one
router.post("/", DomiExist, async (req, res) => {
  
  const domi = new Domi({name: req.body.name})
  
  if(req.body.level){
    domi.level=req.body.level,
    domi.MNC= lvltoMNC(req.body.level)
  }
  try {
    const newDomi = await domi.save();
    res.status(201).json(newDomi);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

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

// updating ones name and level by name
router.patch('/byname/:name',DomiExist,getDomi, async (req,res)=>{
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
        res.status(400).json({message: ["could not save domi via update by name",error.message]})
    }
    
})

// adding an item to the item bank
router.patch('/additem',getDomi,getItem, async (req,res)=>{
  let bank = res.domi.itemBank
  let newitems = [res.item]

  for(let n of newitems){
    n.dateMade = Date.now()
    bank.push(n)
  }

  res.domi.itembank = bank
  // console.log(res.domi)
  try {
    const updomi = await res.domi.save()
    res.json(updomi)
} catch (error) {
    res.status(400).json({message: ["could not save domi via add item by name",error.message]})
}

})


// deleteing one
router.delete('/byid/:id',getDomi, async (req,res)=>{
  try {
      await res.domi.remove()
      res.json({message: " domi deleted and removed"})
  } catch (error) {
      res.status(500).json({message: ["Could not remove domi by id",error.message]})
      
  }
  
})

// deleteing one
router.delete('/byname/:name',getDomi, async (req,res)=>{
    try {
        await res.domi.remove()
        res.json({message: " domi deleted and removed"})
    } catch (error) {
        res.status(500).json({message: ["Could not remove domi by name",error.message]})
        
    }
    
})


async function getDomi(req, res, next) {
  let domi;
  try {
    if (req.params.id) {
        try {
            let Objectid = mongoose.Types.ObjectId
            console.log('welp')
            let verify = Objectid(req.params.id)
            console.log('welp')
            if(verify == req.params.id){
                domi = await Domi.findById(req.params.id);
                if (domi == null) {
                    return res.status(404).json({ message: "Cannot Find domi by this id" });
                }
            }
            
        } catch (error) {
            return res.status(400).json({ messages: ["Id Provided is not a valid id check formatting",error.message] });
        }
    } else if (req.params.name || req.body.dominame){
      let searchname = req.params.name?req.params.name:req.body.dominame
        domi = await Domi.find({ name: searchname });
        if (domi == null || domi.length==0) {
            return res.status(404).json({ message: "Cannot Find domi by this name" });
        }
        if(domi.length>1){
          return res.status(400).json({ message: "More then one Domi found" });
        }
        domi = domi[0]

    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.domi = domi;
  next();
}

async function DomiExist(req, res, next) {
  let domi;
  try {

    if(req.body.name){
      domi = await Domi.findOne({ name: req.body.name });
    }
    if (domi) {
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
