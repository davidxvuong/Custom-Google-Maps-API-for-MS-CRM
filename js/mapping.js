$(document).ready(function(){
	var map = new google.maps.Map(document.getElementById('map'));
	var location = new google.maps.LatLng(43.656018, -79.389793);
	map.setCenter(location, 8);
	
	var markers = [];
	
	var point = new google.maps.LatLng(43.703106, -79.290699);
	var marker = new google.maps.Marker(point);
	
	/* var letter = "A";
	var baseIcon = new google.maps.Icon();
	baseIcon.shadow = "http://www.google.com/mapfiles/shadow50.png";
	baseIcon.iconSize = new google.maps.Size(20,34);
	baseIcon.shadowSize = new google.maps.Size(37, 34);
	baseIcon.iconAnchor = new google.maps.Point(9, 34);
	baseIcon.infoWindowAnchor = new google.maps.Point(9, 2);
	baseIcon.infoShadowAnchor = new google.maps.Point(18,25); */
	
	marker.setMap(map);
	markers[i] = marker;
	
	$(markers).each(function(i, marker){
		google.maps.Event.addListener(marker, "click", function(){
			map.panTo(marker.GetLatLng());
		});
	});
});