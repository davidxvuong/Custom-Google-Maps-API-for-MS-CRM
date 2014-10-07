
var locations = [];

window.onload = function load(){
	//retrieve data from xml locations fileCreatedDate
	
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
				
				locations[i] = new Array(name, lat, lng, type, address, address2, city, state, postal);
				alert(name);
				i++;
			});
		}
	});
}


//google.maps.event.addDomListener(window, 'load', initialize);

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