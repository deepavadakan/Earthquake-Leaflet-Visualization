// Set initial zoom level
var zoomlevel = 5;

// Creating initial map object
var myMap = L.map("mapid", {
  center: [40.758701, -111.876183],
  zoom: zoomlevel
});

// Adding a tile layer (the background map image) to the map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/light-v10",
  accessToken: API_KEY
}).addTo(myMap);

// url with geojson data
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// console.log(url);

// set the colors and limits for Earthquake depth 
var colors = ['#4FB361', '#63ff00', '#d6ff00', '#ffc100', '#ff0000', '#800026']
var limits = [-10, 10, 30, 50, 70, 90];

// function to find the color given the Earthquake depth
function getColor(d) {
  for (var i = 0; i < limits.length; i++) {
    if (d < limits[i]) {
      return colors[i-1];
    }
    else if (d > limits[limits.length - 1]) {
      return colors[limits.length - 1];
    }
  }
}

// Grab the data with d3
d3.json(url, function (response) {
  console.log(response);

  var earthquakeData = response.features;

  // create group layer for circle
  var circles = L.layerGroup();

  // Loop through data
  for (var i = 0; i < earthquakeData.length; i++) {

    // Set the data location property to a variable
    var location = earthquakeData[i].geometry;

    //console.log(earthquakeData[i]);
    if (location) {
      var circle = L.circle([location.coordinates[1], location.coordinates[0]], {
        fillOpacity: 0.75,
        color: "white",
        weight: 0.5,
        // get color of circle based on earthquake depth
        fillColor: getColor(location.coordinates[2]),
        // Adjust radius based on magnitude
        radius: earthquakeData[i].properties.mag * 60000 * (1 / zoomlevel)
      }).bindPopup("<h3>Magnitude: " + earthquakeData[i].properties.mag
        + "<br>Depth: " + location.coordinates[2]
        + " kms</h3><hr><strong>Location: </strong>" + earthquakeData[i].properties.place
        + "<br><strong>Date: </strong>" + new Date(earthquakeData[i].properties.time));
      circle._mag = earthquakeData[i].properties.mag;
      // Add circle to circles group
      circle.addTo(circles);
    }
  }
  // Add circles group to the Earthquake layer
  circles.addTo(myMap);

  // when zoom is changed, alter circle size
  myMap.on('zoomend', function () {
    zoomlevel = myMap.getZoom();
    circles.eachLayer(function (marker) {
      marker.setRadius(marker._mag * 60000 * (1 / zoomlevel));
    });
  });

  // Set up the legend
  var legend = L.control({ position: 'bottomright' });

  legend.onAdd = function (myMap) {
    // create div for legend
    var div = L.DomUtil.create('div', 'info legend');

    // add title for legend
    div.innerHTML = '<h4>Earthquake<br>Depth (kms)</h4>';

    // for each limit except the last
    for (var i = 0; i < limits.length - 1; i++) {

      // get the color and and limits
      div.innerHTML +=
        '<i style="background:' + colors[i] + '"></i> ' +
        limits[i] + '&ndash;' + limits[i + 1] + '<br>';
    }

    // set color for last limit
    div.innerHTML +=
      '<i style="background:' + colors[limits.length - 1]  + '"></i> ' +
      limits[i] + '+<br>';
    return div;
  }

  // Adding legend to the map
  legend.addTo(myMap)
});