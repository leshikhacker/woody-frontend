function initMap() {
  // The location of Uluru
  // 50.433384, 30.659018
  var coords = {lat: 50.433384, lng: 30.659018};
  // The map, centered at Uluru
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 14, center: coords});
  // The marker, positioned at Uluru
  var marker = new google.maps.Marker({
    position: coords,
    label: 'вулиця Приколійна, 19',
    map: map
  });
}

$(document).ready(function() {
  $('.js-menu-toggle').on('click', function() {
    $($(this).data('toggle-class')).toggleClass('hidden');
  });

  // $('.js-slider').bxSlider({
  //   responsive: true,
  //   touchEnabled: true,
  //   preventDefaultSwipeY: true
  // });
});
