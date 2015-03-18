$(document).ready(function() {
	$('.chooses').click(function (event) {
		$selectName = $(this).parent().find(':selected').text();
		console.log($(this));
		$id = $(this).attr('id');

		if ($id === "all_hotels") {
			all_hotels.forEach(function(x) {
				if ((x.name) === $selectName) {
					hotelLocation = x.place[0].location;
				}
			});
		} else if($id === "all_restaurants") {
			all_restaurants.forEach(function(x) {
				if ((x.name) === $selectName) {
					restaurantLocations.push(x.place[0].location);
				}
			});
		} else if($id === "all_things_to_do") {
			all_things_to_do.forEach(function(x) {
				if ((x.name) === $selectName) {
					thingToDoLocations.push(x.place[0].location);
				}
			});
		} else {
			console.log("MATRIX");
		}

		console.log(hotelLocation);

		initialize_gmaps();
	})
});
