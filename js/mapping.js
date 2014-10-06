//Google Maps API Key: AIzaSyCsYduGpHjEAsMIunGB_Zj2woTby-PybsY

//code used from Chris Pietschmann's blog (http://pietschsoft.com/post/2008/02/01/Calculate-Distance-Between-Geocodes-in-C-and-JavaScript.aspx)
//***START OF CODE***
var GeoCodeCalc = {};
GeoCodeCalc.EarthRadiusInMiles = 3956.0;
GeoCodeCalc.EarthRadiusInKilometers = 6367.0;
GeoCodeCalc.ToRadian = function(v) { 
	return v * (Math.PI / 180);
};

GeoCodeCalc.DiffRadian = function(v1, v2) {
	return GeoCodeCalc.ToRadian(v2) - GeoCodeCalc.ToRadian(v1);
};

GeoCodeCalc.CalcDistance = function(lat1, lng1, lat2, lng2, radius) {
	return radius * 2 * Math.asin( Math.min(1, Math.sqrt( ( Math.pow(Math.sin((GeoCodeCalc.DiffRadian(lat1, lat2)) / 2.0), 2.0) + Math.cos(GeoCodeCalc.ToRadian(lat1)) * Math.cos(GeoCodeCalc.ToRadian(lat2)) * Math.pow(Math.sin((GeoCodeCalc.DiffRadian(lng1, lng2)) / 2.0), 2.0) ) ) ) );
};
//***END OF CODE***

var locationset = new Array();

//parse xml file
$.ajax({
	type: "GET",
	url: "locations.xml",
	dataType: "xml",
	success:function(xml){
		var i = 0;
		
		$(xml).find('marker').each(function(){
			var lat = $(this).attr('lat');
			var lng = $(this).attr('lng');
			var name = $(this).attr('name');
			var address = $(this).attr('address');
			var address2 = $(this).attr('address2');
			var city =  $(this).attr('city');
			var state = $(this).attr('state');
			var postal = $(this).attr('postal');
			var distance = GeoCodeCalc.CalcDistance(orig_lat, orig_lng, lat, lng, GeoCodeCalc.EarthRadiusInKilometers);
			
			locationset[i] = new Array (distance, name, lat, lng, address, address2, city, state, postal);
 
			i++;
		});
		
		//sorting array numerically in ascending order
		locationset.sort(function(a,b){
			var x = a[0];
			var y = b[0];
			
			return ((x < y) ? -1 : ((x > y)? 1:0));
		});
	};
});

//create map
$(function(){
	var map = new GMap2(document.getelementbyId('map'));
	
	map.addControl(new GSmallMapControl());
	map.addControl(new GMapTypeControl());
	var center_location = new GLatLng(orig_lat,orig_lng);
	map.setCenter(center_location, 11);
	 
	// Create a base icon for all of our markers that specifies the shadow, icon dimensions, etc.
	var letter;
	var baseIcon = new GIcon();
	baseIcon.shadow = "http://www.google.com/mapfiles/shadow50.png";
	baseIcon.iconSize = new GSize(20, 34);
	baseIcon.shadowSize = new GSize(37, 34);
	baseIcon.iconAnchor = new GPoint(9, 34);
	baseIcon.infoWindowAnchor = new GPoint(9, 2);
	baseIcon.infoShadowAnchor = new GPoint(18, 25);
	
	for (int i = 0; i < locationset.length; i++)
	{
		var letter = String.fromCharCode("A".charCodeAt(0) + i);
		var point = new GLatLng(locationset[i][2], locationset[i][3]);
		marker = createMarker(point, locationset[i][1], locationset[i][4], letter);
		map.addOverlay(marker);
		markers[i] = marker;
	}
});

//function to handle user input
$(function(){
	$('#submitBtn').click(function(){
		var userInput = $('address').val();
		
		if (userInput = "")
		{
			alert("Empty textbox!");
		}
		else
		{
			var g = new GoogleGeocode(apiKey);
			var address = userInput;
			
			g.geocode(address, function(data){
				if (data != null)
				{
					olat = data.latitude;
					olng = data.longitude;
					
					mapping(olat, olng);
				}
				else
				{
					alert("Error! Unable to geocode address");
				}
			});
			
			address.replace(" ", "+");
		}
	});
});

//do the geocoding
funmction GoogleGeocode(apiKey){
	this.apiKey = apiKey;
	this.geocode = function(address, callbackFunction){
		$.ajax({
			datatype: 'jsonp',
			url: 'http://maps.google.com/maps/geo?output=json&oe=utf8&sensor=true'
                    + '&key=' + this.apiKey + '&q=' + address,
			cache: false,
			success: function (data){
				if(data.status.code == 200) {
					var result = {};
					result.longitude = data.Placemark[0].Point.coordinates[0];
					result.latitude = data.Placemark[0].Point.coordinates[1];
					callbackFunction(result);
				}
				else {
					callbackFunction(null);
				}
			}
	};
}