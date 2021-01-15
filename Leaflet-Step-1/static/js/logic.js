// Creating our initial map object
// We set the longitude, latitude, and the starting zoom level
// This gets inserted into the div with an id of 'mapid'
var myMap = L.map("mapid", {
  center: [40.758701, -111.876183],
    zoom: 5
  });
  
  // Adding a tile layer (the background map image) to our map
  // We use the addTo method to add objects to our map
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/light-v10",
    accessToken: API_KEY
  }).addTo(myMap);

var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
  
console.log(url);

var colors = ['#FFEDA0', '#FED976', '#FEB24C', '#FD8D3C', '#FC4E2A', '#E31A1C', '#BD0026', '#800026']
var limits = [-10, 0, 5, 10, 15, 20, 25, 30];

function getColor(d) {
  
  for (var i = 0; i < limits.length; i++) {
    if (d < limits[i]) {
      // console.log(d);
      // console.log(colors[i]);
      return colors[i];
    }
    
  }
}

// Grab the data with d3
d3.json(url, function(earthquakeData) {
  console.log(earthquakeData);

  var response = earthquakeData.features;

  // Loop through data
  for (var i = 0; i < response.length; i++) {

    // Set the data location property to a variable
    var location = response[i].geometry;
    //console.log(location);
    //console.log(response[i]);
    if (location) {
      L.circle([location.coordinates[1], location.coordinates[0]], {
        fillOpacity: 0.75,
        color: "white",
        weight: 0.5,
        fillColor: getColor(location.coordinates[2]),
        // Adjust radius
        radius: response[i].properties.mag * 12000
      }).bindPopup("<h3>Magnitude: " + response[i].properties.mag 
        + "<br>Depth: " + location.coordinates[2] 
        + " kms</h3><hr><strong>Location: </strong>" + response[i].properties.place 
        + "<br><strong>Date: </strong>" + new Date(response[i].properties.time)).addTo(myMap);
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