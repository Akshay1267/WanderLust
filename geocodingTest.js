const { Client } = require("@googlemaps/google-maps-services-js");
require("dotenv").config(); // to read your .env file

const client = new Client({});

async function testGeocode() {
  try {
    const response = await client.geocode({
      params: {
        address: "Meerut, India", // test address
        key: process.env.MAPS_API_KEY,
      },
    });

    console.log("Coordinates:", response.data.results[0].geometry.location);
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
  }
}

testGeocode();
