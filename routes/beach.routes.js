const express = require("express");
const router = express.Router();
const axios = require("axios");
const Beach = require("../models/Beach.model.js"); 
const User = require("../models/User.model.js"); 
// Require Auth Middleware
const {isLoggedIn, isLoggedOut} = require('../middleware/route-guard');
const fileUpload = require("../config/cloudinary.config");


router.get('/beaches/create',isLoggedIn, (req, res, next) => {res.render('beaches/beaches-create')});

router.post('/beaches/create',  fileUpload.single("image-upload"), async (req, res, next) => {
  try {
  const { name, address, description, filters  } = req.body;
if(req.file){
  await Beach.create({ name, address, description, filters, imageUrl: req.file.path});
}else{
  await Beach.create({ name, address, description, filters});
}
    res.redirect('/beaches');
  } catch (error) {
    //render again this
    console.log(error);
    next(error);
  }
});

//see all beaches and beaches details

router.get('/beaches', async (req, res, next) => {
  try {
    const allBeaches = await Beach.find();
    console.log(allBeaches)
    res.render('beaches/beaches-list', { allBeaches });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get('/beaches/:id', async (req, res, next) => {
  const beachId = req.params.id;
  try {
    const selectedBeach = await Beach.findById(beachId);
    const currentUser = await User.findById(req.session.currentUser._id)

    if (currentUser.favorites.includes(beachId)){
      const isInFav = true
      res.render('beaches/beach-details', {selectedBeach, isInFav});
    }else{
      res.render('beaches/beach-details', {selectedBeach});
    }

  } catch (error) {
    console.log(error);
    next(error);
  }
});

//Update beaches
router.get('/beaches/edit/:id', isLoggedIn, async (req, res, next) => {
  const beachId = req.params.id;
  try {
    const pickedBeach = await Beach.findById(beachId);
    res.render('beaches/edit-beaches', pickedBeach);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post('/beaches/edit/:id', async (req, res, next) => {
  const beachId = req.params.id;
  const { name, description} = req.body;
  try {
    const pickedBeach = await Beach.findByIdAndUpdate(beachId, { name,description});
    res.redirect(`/beaches/${beachId}`);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//delete beaches 
router.post('/beaches/delete/:id', isLoggedIn, async (req, res, next) => {
  const beachId = req.params.id;
  try {
    await Beach.findByIdAndRemove(beachId);
    res.redirect('/beaches');
  } catch (error) {
    console.log(error);
    next(error);
  }
});
  
module.exports = router; 
