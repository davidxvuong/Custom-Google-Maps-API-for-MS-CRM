$(document).ready(function(){
	var map = new GMap2(document.getElementById('map'));
	var location = new GLatLng(43.655005, -79.389665);
	map.setCenter(location, 8);
});