window.onload = function load(){
	//retrieve data from xml locations fileCreatedDate
	var locations = [];
	
	$.ajax({
		type: "GET",
		url: "officeLocations.xml",
		dataType: "xml",
		success: function(xml){
			alert("DONE!");
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