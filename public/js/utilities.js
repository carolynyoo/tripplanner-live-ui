function getCurrentDayNum() {
	return parseInt($('.day-buttons').find('.current-day').text());
}

function getMaximumDayNum() {
	return $('.day-btn').length - 1;
}

function adjustCurrentDayTitle() {
	var $dayTitle = $('#day-title').find('span').html('Day ' + getCurrentDayNum());
}

function removeCurrentDay(saveHotelLocations, saveRestaurantLocations, saveThingLocations, dayDom) {
	var dayNum = getCurrentDayNum();
	$('.current-day').removeClass('current-day');
	// scrape and save previous current day's data
	dayDom[dayNum] = $('#itinerary-panel').html();
	$('#itinerary-panel').find('li').remove();

	// save map markers
	saveHotelLocations[dayNum] = hotelLocation; 
	saveRestaurantLocations[dayNum] = restaurantLocations;
	saveThingLocations[dayNum] = thingToDoLocations;

}

function fetchNewDay(saveHotelLocations, saveRestaurantLocations, saveThingLocations, dayDom) {
	var currentDay = getCurrentDayNum();

	hotelLocation = saveHotelLocations[currentDay];
	restaurantLocations = saveRestaurantLocations[currentDay];
	thingToDoLocations = saveThingLocations[currentDay];

	$('#itinerary-panel').html(dayDom[currentDay]);

	initialize_gmaps();
}
