//global variable declarations
var information = new google.maps.InfoWindow();
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
		markers[j] = markerFactory(locations[j], map, markerImage);
	}
}

 //A function that creates a marker on the map
 function markerFactory(info, thisMap, image){
	var latLng = new google.maps.LatLng(info[1], info[2]);
	var marker = new google.maps.Marker({
		position: latLng,
		map: thisMap,
		icon: image,
		title: info[0],
	});
	
	google.maps.event.addListener(marker, "click", function(){		
		var locationInfo;
		map.panTo(marker.getPosition());
		
		locationInfo = "<div><h3>" + info[0] + "</h3><p>" + info[3] + ", " + info[5] + "<br>" + info[6] + ", " + info[7] + "<br>" + info[8] + "</p></div>";
		information.setContent(locationInfo);
		information.open(map, marker);
	});
	
	return marker;
 }
  
 //CRM inputs address
 function submitAddress() {
	var address = document.getElementById('input').value; //to be replaced by CRM information
	var geocoder = new google.maps.Geocoder();

	geocoder.geocode({'address': address}, function(results, status){
		if (status == google.maps.GeocoderStatus.OK) {
			var name = results[0].address_components[0].long_name + " " + results[0].address_components[1].long_name;
			var lat = results[0].geometry.location.k;
			var lng = results[0].geometry.location.B;
			var type = "Client Location";
			var city = results[0].address_components[2].long_name;
			var state = results[0].address_components[4].long_name;
			var postal = results[0].address_components[6].long_name;
			var markerImage = 'images/home.png';
			
			var passOver = [name, lat, lng, name, type, "", city, state, postal];
			map.setCenter(new google.maps.LatLng(lat, lng));
			map.setZoom(12);
			markerFactory(passOver, map, markerImage);
			console.log(results);
		}
		else {
			alert("Error: " + status);
		}
	});
 }