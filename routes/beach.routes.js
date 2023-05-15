const express = require("express");
const router = express.Router();

const axios = require("axios");

router.get("/beaches", (req, res) => {
  // Call the Google Maps Geocoding API with the search query
  axios
    .get("https://maps.googleapis.com/maps/api/place/textsearch/json", {
      params: {
        query: "beaches in Portugal",
        key: process.env.API_KEY,
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
