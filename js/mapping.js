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
			//var distance = GeoCodeCalc.CalcDistance(
			
			locationset[i] = new Array (distance, name, lat, lng, address, address2, city, state, postal);
 
			i++;
		});