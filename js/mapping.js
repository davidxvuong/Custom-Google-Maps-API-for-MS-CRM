//global variable declarations
var locations = [];
var markers = [];
var map;

//retrieve office location information when the webpage is loaded
window.onload = function load(){
	$.ajax({
		type: "GET",
		url: "officeLocations.xml",
		dataType: "xml",
		success: function(xml){
			console.log("Parsing XML...");
			var i = 0;
			$(xml).find('marker').each(function(){
				var name = $(this).attr('name');
				var lat = $(this).attr('lat');
				var lng = $(this).attr('lng');
				var type = $(this).attr('type');
				var address = $(this).attr('address');
				var address2 = $(this).attr('address2');
				var city = $(this).attr('city');
				var state = $(this).attr('state');
				var postal = $(this).attr('postal');
				locations[i] = new Array(name, lat, lng, address, type, address2, city, state, postal);

				i++;
			});
			
			console.log("Parsing completed. Length of Array: " + locations.length);
			initialize();
		}
	});
}

//set up google maps, updating map with MS Society Office locations
function initialize() {
	var myLatlng = new google.maps.LatLng(53.854234, -97.318359);
	var mapOptions = {
        center:myLatlng,
        zoom:3,
        disableDefaultUI:true,
        mapTypeId:google.maps.MapTypeId.ROADMAP
    }
	
	map = new google.maps.Map(document.getElementById("map"), mapOptions);
	var markerImage = 'images/pinother.png';
	for (var j = 0; j < locations.length; j++){
		markers[j] = markerFactory(locations[j][1], locations[j][2], map, markerImage);
	}
	console.log("MS Office mapping complete. Length of markers array: " + markers.length);
 }

 //A function that creates a marker on the map
 function markerFactory(lat, lng, thisMap, image){
	var latLng = new google.maps.LatLng(lat, lng);
	var marker = new google.maps.Marker({
		position: latLng,
		map: thisMap,
		icon: image,
	});
	
	google.maps.event.addListener(marker, "click", function(){
		thisMap.panTo(marker.getPosition());
	});
	
	return marker;
 }
 
 //CRM inputs address
 function submitAddress() {
	var address = document.getElementById('input').value; //to be replaced by CRM information
	var geocoder = new google.maps.Geocoder();
	
	geocoder.geocode({'address': address}, function(results, status){
		if (status == google.maps.GeocoderStatus.OK) {
			var lat = results[0].geometry.location.k;
			var lng = results[0].geometry.location.B;
			var markerImage = 'images/home.png';
			map.setCenter(new google.maps.LatLng(lat, lng));
			map.setZoom(12);
			markerFactory(lat, lng, map, markerImage);
		}
		else {
			alert("Error: " + status);
		}
	});
 }