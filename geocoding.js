const { Client } = require("@googlemaps/google-maps-services-js");
const client = new Client({});

const geoData = await client.geocode({
  params: {
    address: req.body.listing.location,
    key: process.env.MAPS_API_KEY,
  },
});

const coordinates = geoData.data.results[0].geometry.location;
listing.geometry = {
  type: "Point",
  coordinates: [coordinates.lng, coordinates.lat],
};
