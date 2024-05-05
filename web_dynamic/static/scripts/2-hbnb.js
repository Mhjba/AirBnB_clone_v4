$(document).ready(function () {

  $('input[type=checkbox]').click(function () {
    const amenity_name = [];
    const amenity_id = [];
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
});

$.ajax({
  url: 'http://0.0.0.0:5001/api/v1/status/',
  type: 'GET',
  dataType: 'json',
  success: function (json) {
    $('#api_status').addClass('available');
  },

  error: function (xhr, status) {
    console.log('error ' + status);
  }

});
