# leaflet-challenge

>  Build an interactive  map to visualize USGS's earthquake data using leaflet library.


## Table of contents
* [Level 1: Basic Visualization](#level-1)
* [Level 2: More Data](#level-2)
* [Setup Instructions](#setup)
* [Data Sources](#data-sources)
* [Technologies](#technologies)
* [Libraries](#libraries)
* [Contact](#Contact)


## Level 1

1.  Create a map using Leaflet that plots all of the earthquakes from the data set based on their longitude and latitude.

2.  Data markers reflect the magnitude of the earthquake by their size and and depth of the earth quake by color. Earthquakes with higher magnitudes appear larger and earthquakes with greater depth appear darker in color.

3.  Added popups that provide additional information about the earthquake: Magnitude, Depth, Location and Date.

4.  Added a legend that provides context for the map data.

![Map 1](images/map1.png)


## Level 2

1.  Create a map using Leaflet with 3 options: Satellite, Grayscale and Outdoors

2.  Plot all of the earthquakes on the map from the data set based on their longitude and latitude.

3.  Plot a second data set on the map to illustrate the relationship between tectonic plates and seismic activity.

4.  Data markers reflect the magnitude of the earthquake by their size and and depth of the earth quake by color. Earthquakes with higher magnitudes appear larger and earthquakes with greater depth appear darker in color.

5.  Added popups that provide additional information about the earthquake: Magnitude, Depth, Location and Date.

6.  Added a legend that provides context for the map data.

![Map 2](images/map2.png)


## Setup
Add your mapbox API key to config.js within the static/js folder in both the Leaflet-Step-1 and Leaflet-Step-2 folders.


## Data Sources
- [Earthquake Data: All Earthquakes from the Past 7 Days](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson)
- [Tectonic Plates](https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json)

## Technologies
* Flask
* Javascript
* HTML/ CSS
* D3
* JSON
* GEOJSON

## Libraries 
**Libraries**
* [Leaflet](https://leafletjs.com/)

**JavaScript Dependencies**
* [Leaflet JS](https://unpkg.com/leaflet@1.6.0/dist/leaflet.js)
* [Marker Cluster JS](https://unpkg.com/leaflet.markercluster@1.0.3/dist/leaflet.markercluster.js)
* [D3 Javascript](https://cdnjs.cloudflare.com/ajax/libs/d3/4.2.3/d3.min.js)
* [Marker Cluster](https://unpkg.com/leaflet.markercluster@1.0.3/dist/leaflet.markercluster.js)

**HTML CSS Dependencies**
* [Leaflet Stylesheet](https://unpkg.com/leaflet@1.6.0/dist/leaflet.css)
* [Marker Cluster Stylesheet](https://unpkg.com/leaflet.markercluster@1.0.3/dist/MarkerCluster.css)

## Contact
Created by [@deepavadakan](https://github.com/)