(function () {

	window.WhatsMyDistrict = window.WhatsMyDistrict || {};

	WhatsMyDistrict.DistrictLayer = function (url, templateId, templateContainer) {
		this.url = url;
		this.templateId = templateId;
		this.templateContainer = templateContainer;
		this.featureLayer = L.mapbox.featureLayer();
		this.init();
	}

	WhatsMyDistrict.DistrictLayer.prototype.init = function(){
		this.featureLayer.loadURL(this.url);
	}

	// Returns the properties of the district polygon the point is in
	WhatsMyDistrict.DistrictLayer.prototype.findDistrict = function(point) {
		var district;
		this.featureLayer.eachLayer(function(layer){
			if (turf.inside(point, layer.feature) ==  true) {
				district = layer;
			}
		});
		return district.feature.properties;
	}

	// Set the Handlebars template
	WhatsMyDistrict.DistrictLayer.prototype.setTemplate = function(props){
		var source = $(this.templateId).html();
		var template = Handlebars.compile(source);
		var html = template(props);
		$(this.templateContainer).html(html);
	}

	WhatsMyDistrict.PointLayer = function(url, markerOptions){
		this.url = url;
		this.markerOptions = markerOptions;
		this.points = L.mapbox.featureLayer();
		this.markerLayer = L.mapbox.featureLayer();
		this.init();
	}

	WhatsMyDistrict.PointLayer.prototype.init = function(){
		this.points.loadURL(this.url);
	}

	// Returns a geojson point of the nearest feature of a featureLayer
	WhatsMyDistrict.PointLayer.prototype.findNearest = function(point) {
		var nearest;
		var geojson = this.points.getGeoJSON();
		nearest = turf.nearest(point, geojson);
		return nearest;
	}

	// Sets the marker properties and adds it to the map
	WhatsMyDistrict.PointLayer.prototype.setMarker = function(map, point) {
		point.properties['marker-color'] = this.markerOptions.color;
		point.properties['marker-symbol'] = this.markerOptions.icon;
		point.properties['marker-size'] = this.markerOptions.size;
		point.properties['title'] = point.properties.NAME;
		point.properties['description'] = point.properties.ADDRESS;
		map.removeLayer(this.markerLayer);
		this.markerLayer.setGeoJSON(point);
		this.markerLayer.addTo(map);
	}
	// Returns the properties of the district polygon the point is in
	WhatsMyDistrict.findDistrict = function(point, districtLayer){
		var district;
		districtLayer.eachLayer(function(layer){
			if (turf.inside(point, layer.feature) ==  true) {
				district = layer;
			}
		});
		return district.feature.properties;
	}

	// Returns a geojson point of the nearest feature of a featureLayer
	WhatsMyDistrict.findNearest = function (featureLayer, point) {
		var nearest;
		var geojson = featureLayer.getGeoJSON();
		nearest = turf.nearest(point, geojson);
		return nearest;
	}

	// Sets the marker properties and adds it to the map
	WhatsMyDistrict.setMarker = function(map, point, markerLayer, options){
		point.properties['marker-color'] = options.color;
		point.properties['marker-symbol'] = options.icon;
		point.properties['marker-size'] = options.size;
		point.properties['title'] = options.title;
		point.properties['description'] = options.description;
		map.removeLayer(markerLayer);
		markerLayer.setGeoJSON(point);
		markerLayer.addTo(map);
	}

	// Get geojson point from a lat and lng pair
	WhatsMyDistrict.getPoint = function(lat, lng){
		var point = {
			"type": "Feature",
			"properties": {},
			"geometry": {
				"type": "Point",
				"coordinates": [lng, lat]
			}
		};
		return point;
	}
})();