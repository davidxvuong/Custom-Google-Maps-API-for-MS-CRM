//global variable declarations
var information = new google.maps.InfoWindow();		//pop-up box in Google Maps to display location information
var locations = [];									//2D array used to store MS Society office locations
var userLocation;									//to store user input location
var markers = [];									//an array to store pins used to display the MS Society office locations
var map;

//This function retrieves office location information from an xml file when the webpage is loaded using jQuery
window.onload = function load(){
	$.ajax({
		type: "GET",
		url: "officeLocations.xml",
		dataType: "xml",
		success: function(xml){
			var i = 0;
			
			//loop through the xml file, parsing the data into the 'locations' array
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
				
				//Storing office information. Each row consists of office information. Each column is a different office
				locations[i] = new Array(name, lat, lng, address, type, address2, city, state, postal);

				i++;
			});
			
			initialize();

		}
	});
}

//This function sets up the google map, updating map with MS Society Office locations using the latitude and longitude information
function initialize() {
	var myLatlng = new google.maps.LatLng(53.854234, -97.318359);
	var mapOptions = {
        center:myLatlng,
        zoom:3,
        disableDefaultUI:true,
        mapTypeId:google.maps.MapTypeId.ROADMAP
    }
	
	//initializing map
	map = new google.maps.Map(document.getElementById("map"), mapOptions);
	var markerImage = 'images/pinother.png';
	
	//passing each office information through the marker factory, returning the marker and storing it into an array
	for (var j = 0; j < locations.length; j++)
		markers[j] = markerFactory(locations[j], map, markerImage, true);
	
	
google.maps.event.addDomListener(window, 'load', initialize);
}

 //This function takes the office information and returns a google map marker. In the process, it will place the marker onto the map.
 function markerFactory(info, thisMap, image, isXml){
	var latLng = new google.maps.LatLng(info[1], info[2]);
	var marker = new google.maps.Marker({
		position: latLng,
		map: thisMap,
		icon: image,
		title: info[0],
	});
	
	//This event listener displays the proper office information or client's address when the marker is clicked
	google.maps.event.addListener(marker, "click", function(){		
		var locationInfo;
		map.panTo(marker.getPosition());
		
		var data = info[0].split(",");
		
		locationInfo = (isXml === true) ? ("<div><h3>" + info[0] + "</h3><p>" + info[3] + ", " + info[5] + "<br>" + info[6] + ", " + info[7] + "<br>" + info[8] + "</p></div>") : 
			"<div><h3>" + data[0] + "</h3><p>" + data[1] + ", " + data[2] + "<br>" + data[3] + "</div>";
		console.log(data);
		information.setContent(locationInfo);
		information.open(map, marker);
	});
	
	return marker;
 }
  
//This function fetches the address information of the client from the CRM, then uses the Geocoder to determine
//the longitude and latitude information, then places a marker on the google map.
 function submitAddress() {
	var address = document.getElementById('input').value; //to be replaced with CRM information. Must contain address, city, and province
	var geocoder = new google.maps.Geocoder();
	
	//converts address to latitude and longitude
	geocoder.geocode({'address': address, componentRestrictions: {country: 'Canada'}}, function(results, status){
		if (status == google.maps.GeocoderStatus.OK) {
			var name = results[0].formatted_address;
			var lat = results[0].geometry.location.A;
			var lng = results[0].geometry.location.F;
			var markerImage = 'images/home.png';
			
			var passOver = [name, lat, lng];
			map.setCenter(new google.maps.LatLng(lat, lng));
			map.setZoom(12);
			userLocation = markerFactory(passOver, map, markerImage, false);
		}
		else {
			alert("Error: " + status);
		}
	});
 }
