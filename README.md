# What's My District (Redux)

## What is this?

[What's My District?](http://www.whatsmydistrict.org) started off as a National
Day of Civic Hacking project. It essentially allows anyone in Lexington, KY to
input their address and find out all the different districts they are in,
including schools, council districts, magistrate districts, and etc.


It was a Sinatra app using convoluted PostGIS queries and a pain to deploy.
With Mapbox releasing Turf.js I decided to remake What's My District. This
is the tentative results. All client side, all static files, and can be
deployed on GitHub. I'm even adding finding and showing the nearest
hospital, library, post office, and fire station.


The end goal is to break the abstract logic into a small
library with all city/county specific stuff in a lexington.js file. This
way other cities can get a jump start building their own version.

Current Dependencies:

- [Mapbox.js](https://www.mapbox.com/mapbox.js/api/v2.1.5/)
- [Turf.js](http://turfjs.org/)
- [jQuery](https://jquery.com/) (could probably be replaced easily)
- [Handlebars.js](http://handlebarsjs.com/)

## Running locally

Use Python simple server from project root directory.

1. `python -m SimpleHTTPServer`
1. load [localhost:8000](http://localhost:8000)
1. voila!

## Keeping `gh-pages` branch in sync with master

After merging pull-request into master,

1. `git co master`
1. `git pull`
1. `git co gh-pages`
1. `git merge master`
1. `git push`

## How to update geospatial data

1. Download dataset from [Lexington's Open Data Catalog](http://data.lexingtonky.gov)
1. Extract .zip file
1. Convert .shp to .geojson
1. Add / replace geojson in `assets/data`

### Converting .shp to .geojson

Use [gdal](http://www.gdal.org/)'s ogre to convert .shp format to .geojson format.

- There's a [nice writeup](http://ben.balter.com/2013/06/26/how-to-convert-shapefiles-to-geojson-for-use-on-github/) by Ben Balter on how to do this on your mac.
- Or there this [Ogre web client](http://ogre.adc4gis.com/).
