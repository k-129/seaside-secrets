const express = require("express");
const router = express.Router();
const User = require("../models/User.model.js"); 

 router.post('/add-favorites/:beachId', async (req,res)=>{
try {
    const {beachId} = req.params; 
    const userId = req.session.currentUser._id

    await User.findByIdAndUpdate(userId, {$push: {favorites: beachId}})

    res.redirect(`/beaches/${beachId}`)
    
} catch (error) {
    next(error)
}
 }); 

 router.post('/remove-favorites/:beachId', async (req,res)=>{
try {
    const {beachId} = req.params; 
    const userId = req.session.currentUser._id

    await User.findByIdAndUpdate(userId, {$pull: {favorites: beachId}})

    res.redirect(`/beaches/${beachId}`)
    
} catch (error) {
    next(error)
}
 }); 

 
 // Export Routes
 module.exports = router;

 