//global variable declarations
var locations = [];
var markers = [];

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
//sets up map, placing location markers onto the map
function initialize() {
	var myLatlng = new google.maps.LatLng(43.655583, -79.389665);
	var mapOptions = {
        center:myLatlng,
        zoom:15,
        disableDefaultUI:true,
        mapTypeId:google.maps.MapTypeId.ROADMAP
    }
	var map = new google.maps.Map(document.getElementById("map"), mapOptions);
	var markerImage = 'images/workoffice.png';
	
	for (var j = 0; j <= locations.length; j++){
		markerFactory(locations[j], map, markerImage);
	}
 }

 function markerFactory(information, thisMap, image){
	var latLng = new google.maps.LatLng(information[1], information[2]);
	var marker = new google.maps.Marker({
		position: latLng,
		map: thisMap,
		icon: image,
	});
 }
//.maps.event.addDomListener(window, 'load', initialize);


/* function markerFactory(var information, var thisMap, image){
		var latLng = new google.maps.LatLng(information[1], information[2]);
		
		var marker = new google.maps.Marker({
			position: latLng,
			map: thisMap,
			icon: image
		});
}
 */

/*

var location = new google.maps.LatLng(43.656018, -79.389793);
	var mapOptions ={
		center: location,
		zoom: 8,
		disableDefaultUI: true,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	var map = new google.maps.Map(document.getElementById("map"), mapOptions);
	
	var markerImage = 'images/workoffice.png';
	var marker = new google.maps.Marker({
		position: location,
		map: map,
		icon: markerImage
	});
	
*/