import * as express from "express"
// const express = require('express');

const router = express.Router();
// const Subs = require('../../models/subs')
import Subs from '../../models/subs.js'


// getting all
router.get('/', async (req,res)=>{
    // res.send('Hello World')
    try {
        const subs = await Subs.find()
        res.send(subs)
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
})
// getting one
router.get('/:id', getSub,(req,res)=>{
    // id = req.params.id
    res.json(res.suber)
    
})
//create one
router.post('/', async (req,res)=>{
    const subs = new Subs({
        name: req.body.name,
        subsToChannel : req.body.subsToChannel
    })
    try {
        const newSubs = await subs.save()
        res.status(201).json(newSubs)
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
    
})
// updating one
router.patch('/:id',getSub, async (req,res)=>{
    if(req.body.name != null){
        res.suber.name = req.body.name
    }
    if(req.body.subsToChannel != null){
        res.suber.subsToChannel = req.body.subsToChannel
    }

    console.log(res.suber)
    try {
        const upsuber = await res.suber.save()
        res.json(upsuber)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
    
})
// deleteing one
router.delete('/:id',getSub, async (req,res)=>{
    try {
        await res.suber.remove()
        res.json({message: " suber deleted and removed"})
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
    
})


async function getSub(req,res,next){
    let suber
    try {
        suber = await Subs.findById(req.params.id)
        if(suber == null){
            return res.status(404).json({message: 'Cannot Find Suber'})
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
    res.suber = suber
    next()
}


export default router;