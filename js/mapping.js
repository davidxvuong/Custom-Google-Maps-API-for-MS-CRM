$(function(){
	var map = new google.maps.Map2(document.getElementById('map'));
	var location = new google.maps.LatLng(43.656018, -79.389793);
	map.setCenter(location, 8);
	
	alert("test");
	
	var markers = [];
	
/* 	for (var i = 0; i < 10; i++)
	{
 */		var point = new google.maps.LatLng(43.656018, -79.389793); //new GLatLng(southWest.lat() + latSpan * Math.random(), southWest.lng() + lngSpan * Math.random());
		var marker = new google.maps.Marker(point);
		map.addOverlay(marker);
		markers[i] = marker;
	/* } */
	
	$(markers).each(function(i, marker){
		google.maps.Event.addListener(marker, "click", function(){
			map.panTo(marker.GetLatLng());
		});
	});
});