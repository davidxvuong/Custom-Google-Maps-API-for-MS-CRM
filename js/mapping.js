$(document).ready(function(){
	var map = new google.maps.Map(document.getElementById('map'));
	var location = new google.maps.LatLng(43.656018, -79.389793);
	map.setCenter(location, 8);
	
	var markers = [];
	
	var point = new google.maps.LatLng(43.703106, -79.290699);
	var marker = new google.maps.Marker(point);
	
	marker.setMap(map);
	markers[i] = marker;
	
	$(markers).each(function(i, marker){
		google.maps.Event.addListener(marker, "click", function(){
			map.panTo(marker.GetLatLng());
		});
	});
});