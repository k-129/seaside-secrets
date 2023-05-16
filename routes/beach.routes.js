const express = require("express");
const router = express.Router();
const axios = require("axios");
const Beach = require("../models/Beach.model.js"); 

router.get("/beaches", (req, res) => {
  // Call the Google Maps Places API with the search query
  axios
    .get("https://maps.googleapis.com/maps/api/place/textsearch/json", {
      params: {
        query: "beaches in Portugal",
        key: process.env.API_KEY,
      },
    })
    .then((response) => {
      // Process the places results here
      const results = response.data.results;

      // Save each beach to MongoDB
      results.forEach((beachData) => {
        const beach = new Beach({
          name: beachData.name,
          address: beachData.formatted_address,
          rating: beachData.rating,
          location: beachData.geometry.location
        });

        beach.save()
          .then(() => {
            console.log('Beach saved to MongoDB');
          })
          .catch((error) => {
            console.error('Failed to save beach:', error);
          });
      });

      // Pass the beach data to the view or send a response
      res.render('beaches/beaches-list', { beaches: results });
    })
    .catch((error) => {
      console.error("Places request failed:", error);
      res.status(500).json({ error: "Places request failed" });
    });
});


router.get("/beaches/2", (req, res) => {
  // Call the Google Maps Geocoding API with the search query
  axios
    .get("https://maps.googleapis.com/maps/api/place/textsearch/json", {
      params: {
        query: "beaches in Portugal",
        key: process.env.API_KEY,
        pagetoken: process.env.PAGE_TOKEN,
      },
    })
    .then((response) => {
      // Process the geocoding results here
      const results = response.data.results;
      //console.log(results);

      // Pass into a view
      res.render('beaches/beaches-list', {beaches: results})
    })
    .catch((error) => {
      console.error("Geocoding request failed:", error);
      res.status(500).json({ error: "Geocoding request failed" });
    });
});
router.get("/beaches/3", (req, res) => {
  // Call the Google Maps Geocoding API with the search query
  axios
    .get("https://maps.googleapis.com/maps/api/place/textsearch/json", {
      params: {
        query: "beaches in Portugal",
        key: process.env.API_KEY,
        pagetoken: process.env.PAGE_TOKEN_1,
      },
    })
    .then((response) => {
      // Process the geocoding results here
      const results = response.data.results;
      //console.log(results);

      // Pass into a view
      res.render('beaches/beaches-list', {beaches: results})
    })
    .catch((error) => {
      console.error("Geocoding request failed:", error);
      res.status(500).json({ error: "Geocoding request failed" });
    });
});

  
module.exports = router; 
