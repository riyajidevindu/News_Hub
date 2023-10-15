const express=require('express')
const router=express.Router()
const User=require('../models/User')
const bcrypt=require('bcrypt')
const News=require('../models/News')
const Comment=require('../models/Comment')
const verifyToken = require('../verifyToken')


//Create
router.post('/create',verifyToken,async (req,res) =>{
  try{
    const newNews=new News(req.body)
    const savedNews=await newNews.save()
    res.status(200).json(savedNews)
  }
  catch(err){
    res.status(500).json(err)
  }
})


//Update
router.put("/:id",verifyToken,async (req,res)=>{
  try{
   
    const updatedNews = await News.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
    res.status(200).json(updatedNews)

  }
  catch(err){
    res.status(500).json(err)
  }
})


//Delete
router.delete("/:id",verifyToken,async (req,res)=>{
  try{
    await News.findByIdAndDelete(req.params.id)
    await Comment.deleteMany({newsId:req.params.id})
    res.status(200).json("News has been deleted!")
  }
  catch(err){
    res.status(500).json(err)
  }
})


//Get News Details
router.get("/:id",async (req,res)=>{
  try{
    const news = await News.findById(req.params.id)
    res.status(200).json(news)
  }
  catch(err){
    res.status(500).json(err)
  }
})


//Get News 
router.get("/",async (req,res)=>{
  const query=req.query
  try{    
    const searchFilter = {
      title:{$regex:query.search,$options:"i"}
    }
    const newss = await News.find(query.search?searchFilter:null)
    res.status(200).json(newss)
  }
  catch(err){
    res.status(500).json(err)
  }
})

//Get User News 
router.get("/user/:userId",async (req,res)=>{
  try{
    const newss = await News.find({userId:req.params.userId})
    res.status(200).json(newss)
  }
  catch(err){
    res.status(500).json(err)
  }
})

//Search News




module.exports=router
