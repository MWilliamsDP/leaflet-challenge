var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

// Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {
    console.log(data.features);
  // Once we get a response, send the data.features object to the createFeatures function.
  createMap(data.features);
});


// define the createMap function
function createMap(response) {

  // Initial parameters to create map
  var centerCoordinates = [37.0902, -110.7129];
  var mapZoom = 5;

  // Create the map object with options
  var myMap = L.map("map", {
      center: centerCoordinates,
      zoom: mapZoom
  });

  // Create the tile layer that will be the background of our map
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
      tileSize: 512,
      maxZoom: 18,
      zoomOffset: -1,
      id: "mapbox/light-v10",
      accessToken: API_KEY
  }).addTo(myMap);

  // Create a GeoJSON layer containing the features array on the response object
  L.geoJSON(response, {

      // use pointToLayer to create circle markers for each data's coordinates
      pointToLayer: function(feature, latlng) {
          return L.circleMarker(latlng, {
              radius: markerSize(feature.properties.mag),
              fillColor: magColor(feature.properties.mag),
              color: "#000",
              weight: 0.3,
              opacity: 0.5,
              fillOpacity: 1
          });
      },

      // Run the onEachFeature function once for each piece of data in the array
      onEachFeature: onEachFeature
  }).addTo(myMap)

  // Binding a pop-up to each layer
  function onEachFeature(feature, layer) {

      // date formatter for popup
      var format = d3.timeFormat("%d-%b-%Y at %H:%M");

      layer.bindPopup(`<strong>Place: </strong> ${feature.properties.place}<br><strong>Time: </strong>${format(new Date(feature.properties.time))}<br><strong>Magnitude: </strong>${feature.properties.mag}`);
  };



      // push to labels array as list item
      for (var i = 0; i < magnitudes.length; i++) {
          labels.push('<li style="background-color:' + magColor(magnitudes[i] + 1) + '"> <span>' + magnitudes[i] + (magnitudes[i + 1] ? '&ndash;' + magnitudes[i + 1] + '' : '+') + '</span></li>');
      }

      // add each label list item to the div under the <ul> tag
      div.innerHTML += "<ul>" + labels.join("") + "</ul>";

      return div;
  };

 

}; // end createMap function

// Define a markerSize function that will give each city a different marker radius based on earthquake magnitude
function markerSize(magnitude) {
  return magnitude * 5;

let depth = for (var i = 0; i < response.length; i++) {
  var location = response[i].location;

  if (location) {
    L.marker([location.coordinates[1], location.coordinates[0]]).addTo(myMap);
  }
};
// Define a color function that sets the colour of a marker based on earthquake magnitude
function magColor(depth) {
  if (magnitude <= 1) {
      return "green"
  } else if (magnitude <= 2) {
      return "pink"
  } else if (magnitude <= 3) {
      return "#blue"
  } else if (magnitude <= 4) {
      return "#red"
  } else if (magnitude <= 5) {
      return "#orange"
  } else {
      return "#yellow"
  }
};

// Perform an API call to the USGS earthquakes API to get earthquake information. 
d3.json(queryUrl, function(response) {

  // Call createMap with response.features
  createMap(response.features);

});