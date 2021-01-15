// Creating initial map object
var myMap = L.map("mapid", {
  center: [40.758701, -111.876183],
    zoom: 5
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
var colors = ['#FFEDA0', '#FED976', '#FEB24C', '#FD8D3C', '#FC4E2A', '#E31A1C', '#BD0026', '#800026']
var limits = [-10, 0, 5, 10, 15, 20, 25, 30];

// function to find the color given the Earthquake depth
function getColor(d) {
  for (var i = 0; i < limits.length; i++) {
    if (d < limits[i]) {
      return colors[i];
    }
  }
}

// Grab the data with d3
d3.json(url, function(response) {
  console.log(response);

  var earthquakeData = response.features;

  // Loop through data
  for (var i = 0; i < earthquakeData.length; i++) {

    // Set the data location property to a variable
    var location = earthquakeData[i].geometry;

    //console.log(earthquakeData[i]);
    if (location) {
      L.circle([location.coordinates[1], location.coordinates[0]], {
        fillOpacity: 0.75,
        color: "white",
        weight: 0.5,
        // get color of circle based on earthquake depth
        fillColor: getColor(location.coordinates[2]),
        // Adjust radius based on magnitude
        radius: earthquakeData[i].properties.mag * 12000
      }).bindPopup("<h3>Magnitude: " + earthquakeData[i].properties.mag 
        + "<br>Depth: " + location.coordinates[2] 
        + " kms</h3><hr><strong>Location: </strong>" + earthquakeData[i].properties.place 
        + "<br><strong>Date: </strong>" + new Date(earthquakeData[i].properties.time)).addTo(myMap);
    }
  }

  // Set up the legend
  var legend = L.control({ position: 'bottomright' });

  legend.onAdd = function (myMap) {
    var div = L.DomUtil.create('div', 'info legend');
    
    div.innerHTML = '<h4>Earthquake<br>Depth (kms)</h4>';
    
    for (var i = 0; i < limits.length - 1; i++) {
      
      div.innerHTML +=
        '<i style="background:' + getColor(limits[i] - 1) + '"></i> ' +
        limits[i] + '&ndash;' + limits[i + 1] + '<br>';
    }
    
    div.innerHTML +=
        '<i style="background:' + getColor(limits[limits.length - 1] - 1) + '"></i> ' +
        limits[i] + '+<br>';
    return div;
  }

  // Adding legend to the map
  legend.addTo(myMap)
});