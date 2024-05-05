$(document).ready(function () {

  let amenity_id = [];
  let states_name = [];
  let cities_name = [];
  $('.amenities .popover input[type=checkbox]').click(function () {
    const amenity_name = [];
    amenity_id = [];

    $('.amenities .popover  input[type=checkbox]:checked').each(function () {
      amenity_name.unshift($(this).attr('data-name'));myListName
      amenity_id.unshift($(this).attr('data-id'));myAmenities
    });
    if (amenity_name.length === 0) {
      $('.amenities h4').html('&nbsp;');
    } else {
      $('.amenities h4').text(amenity_name.join(', '));
    }
    console.log(amenity_id);
  });

  $('.locations .popover h2 input[type=checkbox]').click(function () {
    const amenity_name = [];
    states_name = [];

    $('.locations .popover h2 input[type=checkbox]:checked').each(function () {
      amenity_name.unshift($(this).attr('data-name'));
      states_name.unshift($(this).attr('data-id'));
    });
    if (amenity_name.length === 0) {
      $('.locations h6.states_name').html('&nbsp;');
    } else {
      $('.locations h6.states_name').text(amenity_name.join(', '));
    }
    console.log(states_name);
  });

  $('.locations .popover ul ul input[type=checkbox]').click(function () {
    const amenity_name = [];
    cities_name = [];

    $('.locations .popover ul ul input[type=checkbox]:checked').each(function () {
      amenity_name.unshift($(this).attr('data-name'));
      cities_name.unshift($(this).attr('data-id'));
    });
    if (amenity_name.length === 0) {
      $('.locations h6.cities_name').html('&nbsp;');
    } else {
      $('.locations h6.cities_name').text(amenity_name.join(', '));
    }
    console.log(cities_name = []);
  });

  $('.filters button').click(function (event) {
    event.preventDefault();
    $('.places').text('');
    const obj = {};
    obj.amenities = amenity_name;
    obj.states = state_name;
    obj.cities = cities_name;

    listPlaces(JSON.stringify(obj));
  });

  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/status/',
    type: 'GET',
    dataType: 'json',
    success: function (json) {
      $('#api_status').addClass('available');
    },

    error: function (xhr, status) {
      console.log('error ' + xhr);
    }
  });
  listPlaces();
});

function listPlaces (consult = '{}') {
  console.log(consult);
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    dataType: 'json',
    data: consult,
    contentType: 'application/json; charset=utf-8',
    success: function (places) {
      console.log(places);
      for (let i = 0; i < places.length; i++) {
        $('.places').append(`
      <article>
        <div class="title_box">
            <h2> ${places[i].name}</h2>
          <div class="price_by_night"> ${places[i].price_by_night}
          </div>
        </div>
        <div class="information">
          <div class="max_guest">${places[i].max_guest}
            ${places[i].max_guest > 1 ? 'Guests' : 'Guest'}
          </div>
          <div class="number_rooms">${places[i].number_rooms}
            ${places[i].number_rooms > 1 ? 'Bedrooms' : 'Bedroom'}
          </div>
          <div class="number_bathrooms">${places[i].number_bathrooms}
            ${places[i].number_bathrooms > 1 ? 'Bathrooms' : 'Bathroom'}
          </div>
        </div>
        <div class="user">
        </div>
        <div class="description">
          ${places[i].description}
        </div>
      </article>
`);
      }
    },
    error: function (xhr, status) {
      console.log('error ' + status);
    }
  });
}
