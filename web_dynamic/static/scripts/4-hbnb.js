$(document).ready(function () {

  let amenity_id = [];
  $('input[type=checkbox]').click(function () {
    const amenity_name = [];
    amenity_id = [];
    $('input[type=checkbox]:checked').each(function () {
      amenity_name.push($(this).attr('data-name'));
      amenity_id.push($(this).attr('data-id'));
    });
    if (amenity_name.length === 0) {
      $('.amenities h4').html('&nbsp;');
    } else {
      $('.amenities h4').text(amenity_name.join(', '));
    }
    console.log(amenity_id);
  });

  $('.filters button').click(function (event) {
    event.preventDefault();

    $('.places').text('');

    const obj = {};
    obj.amenities = myId;
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

function listPlaces (amenities = '{}') {
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    dataType: 'json',
    data: amenities,
    contentType: 'application/json; charset=utf-8',
    success: function (places) {
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
