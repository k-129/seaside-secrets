const express = require("express");
const router = express.Router();
const axios = require("axios");
const Beach = require("../models/Beach.model.js"); 
// Require Auth Middleware
const {isLoggedIn, isLoggedOut} = require('../middleware/route-guard');


router.get('/beaches/create',isLoggedIn, (req, res, next) => {res.render('beaches/beaches-create')});

router.post('/beaches/create', async (req, res, next) => {
  const { name, address, description, location, filters, rating } = req.body;
  try {
    await Beach.create({ name, address, description, location, filters, rating});
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
    res.render('beaches/beach-details', selectedBeach);
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
  const { name, address, description, location, filters, rating } = req.body;
  try {
    const pickedBeach = await Beach.findByIdAndUpdate(beachId, { name, address, description, location, filters, rating });
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
