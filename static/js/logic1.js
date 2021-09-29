
//URL for past day, all earthquakes
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

// Create map center
var myMap = L.map("map", {
    center: [
      37.09, -95.71],
    zoom: 5
  });

  //Get mapbox 
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: "pk.eyJ1IjoibXdpbGxpYW1zMTkiLCJhIjoiY2t1NjUyM2M5MXE0eTMwbmllbTZyMzQ4MSJ9.MH06qu2yrlDwSRNysxtvBA"
  }).addTo(myMap);
  

// Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {
    console.log(data.features);

//Create sizes and colors for each earthquake point that demonstrate depth and magnitude with functions
    // Once we get a response, send the data.features object to the createFeatures function.
    function circleSize (mag) {
        return mag * 3;

    };
  });

   
  
  
  
  
  
  