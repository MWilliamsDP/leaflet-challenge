var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

d3.json(queryUrl).then(function (data) {
  
//console log data to inspect it
    console.log(data.features);
  
  createMap(data.features);
});

// define the createMap function
function createMap(response) {

    // Initial parameters to create map
    var centerCoordinates = [39, -105];
    var mapZoom = 5;

    // Create the map object 
    var myMap = L.map("map", {
        center: centerCoordinates,
        zoom: mapZoom
    });

    // Create the tile layer for map
    L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/light-v10",
        accessToken: API_KEY
    }).addTo(myMap);

    // Create a GeoJSON layer 
    L.geoJSON(response, {

        // use pointToLayer to create circle markers for each data's coordinates
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng, {
                radius: markerSize(feature.properties.mag),
                fillColor: circleColor(feature.geometry.coordinates[2]),
                color: "#000",
                weight: 0.9,
                opacity: 0.2,
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

    // Set up the legend
    var legend = L.control({ position: "bottomright" });
    legend.onAdd = function() {
        var div = L.DomUtil.create("div", "info legend");
        var depths = [0, 5, 10, 15, 20, 25];
        var labels = [];
        var legendInfo = "<h5>Depth</h5>";

        div.innerHTML = legendInfo;

        // go through each magnitude item to label and color the legend
        // push to labels array as list item
        for (var i = 0; i < depths.length; i++) {
            labels.push('<li style="background-color:' + circleColor(depths[i] + 1) + '"> <span>' + depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + '' : '+') + '</span></li>');
        }

        // add each label list item to the div under the <ul> tag
        div.innerHTML += "<ul>" + labels.join("") + "</ul>";

        return div;
    };

    // Adding legend to the map
    legend.addTo(myMap);

}; // end createMap function

// Define a markerSize function that will give each city a different marker radius based on earthquake magnitude
function markerSize(magnitude) {
    return magnitude * 10;
}
//Function to base color on the depth of Earthquake
function circleColor(depth) {
    if (depth <5) {
        return "pink"
    }
    else if (depth <10) {
        return "magenta"
    }
    else if (depth <15) {
        return "purple"
    }
    else if (depth <20) {
        return "blue"
    }
    else if (depth <25) {
        return "orange"
    }
    else {
        return "red"
    }
};

// Perform an API call to the USGS earthquakes API to get earthquake information. 
d3.json(queryUrl, function(response) {

    // Call createMap with response.features
    createMap(response.features);

})