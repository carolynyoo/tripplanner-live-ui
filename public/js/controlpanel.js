$(document).ready(function() {
	// add itinerary item 
	// show on map
	var dayDom = {};
	var saveHotelLocations = {}, saveRestaurantLocations = {}, saveThingLocations = {};

	$('.chooses').click(function (event) {
		var $btnObj;
		var $selectName = $(this).parent().find(':selected').text();
		var liHTML = '<li><span>'+$selectName+'<button class="btn btn-xs btn-danger remove btn-circle">x</button></span></li>';
		$id = $(this).attr('id');
		// check if already present in itinerary
		var isPresent = $('.panel-body').find("span:contains("+$selectName+")");
		if (isPresent.length === 0) {
			if ($id === "all_hotels") {
				all_hotels.forEach(function(x) {
					if ((x.name) === $selectName) {
						hotelLocation = x.place[0].location;
						// hotelData.push(x);
						// clear list if hotel already exists to update (only one hotel)
						$('#day-hotel li').remove();
						$('#day-hotel').append(liHTML);
						$btnObj = $('#day-hotel').find('li').last().find('.remove');
					}
				});
			} else if($id === "all_restaurants") {
				all_restaurants.forEach(function(x) {
					if ((x.name) === $selectName) {
						restaurantLocations.push(x.place[0].location);
						$('#day-rest').append(liHTML);
						$btnObj = $('#day-rest').find('li').last().find('.remove');
					}
				});
			} else if($id === "all_things_to_do") {
				all_things_to_do.forEach(function(x) {
					if ((x.name) === $selectName) {
						thingToDoLocations.push(x.place[0].location);
						$('#day-things').append(liHTML);
						$btnObj = $('#day-things').find('li').last().find('.remove');
					}
				});
			} else {
				console.log("MATRIX");
			}
			initialize_gmaps();

			$btnObj.click(function (event) {
			// this is li elem
				var $buttonParent = $(this).parents().eq(1);
				var $itineraryName = $buttonParent.find('button').remove().end().text(); 
				var $itineraryCategory = $buttonParent.parents().eq(1).find('ul').attr('id');
				$buttonParent.remove();

				switch($itineraryCategory) {
					case "day-hotel":
						hotelLocation = [];
						console.log('hi');
						console.log($itineraryName);
						console.log($itineraryCategory);
						break;
					case "day-rest":
						all_restaurants.forEach(function(x) {
							if ((x.name) === $itineraryName) {
								var rIndex = restaurantLocations.indexOf(x.place[0].location);
								restaurantLocations.splice(rIndex, 1);
								console.log(rIndex);
							}
						});
						break;
					case "day-things":
						all_things_to_do.forEach(function(x) {
							if ((x.name) === $itineraryName) {
								var tIndex = thingToDoLocations.indexOf(x.place[0].location);
								thingToDoLocations.splice(tIndex, 1);
								console.log(tIndex);
							}
						});
						break;
				}
				initialize_gmaps();
			});
			// adds marker to map 
		}
	});

	$('#add-day').on('click', function () {
		// add new day button
		var maximumDayCount = getMaximumDayNum();
		removeCurrentDay(saveHotelLocations, saveRestaurantLocations, saveThingLocations, dayDom);
		$('#add-day').before('<button class="btn btn-circle day-btn current-day">'+(maximumDayCount+1)+'</button>');
		adjustCurrentDayTitle();

		// remove markers from map and refresh (no ajax :()
		hotelLocation =restaurantLocations=thingToDoLocations = [];
		initialize_gmaps();
	}); 

	$(".day-buttons").on('click', '.day-btn', function() {
		var clickedDay = parseInt($(this).text());
		if (!isNaN(clickedDay)) {
			removeCurrentDay(saveHotelLocations, saveRestaurantLocations, saveThingLocations, dayDom);
			$(this).addClass('current-day');
			fetchNewDay(saveHotelLocations, saveRestaurantLocations, saveThingLocations, dayDom);
			adjustCurrentDayTitle();
		}
	});

});
