function initMap() {
  // The location of Uluru
  // 50.433384, 30.659018
  var coords = {lat: 50.433384, lng: 30.659018};
  // The map, centered at Uluru
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 13, center: coords});
  // The marker, positioned at Uluru
  var marker = new google.maps.Marker({
    position: coords,
    labelOrigin: new google.maps.Point(40,33),
    label: {
      text: 'вулиця Приколійна, 19',
      color: '#c02618'
    },
    map: map
  });
}

var sliders = [];

$(document).ready(function() {
  $('.js-menu-toggle').on('click', function() {
    $($(this).data('toggle-class')).toggleClass('hidden');
  });

  $('.js-slider').each(function(i,item){
    var slider;
    slider = $(this).bxSlider();
    sliders[i] = slider;
  });

  $('.js-slide-to-block').on('click', function(e) {
    e.preventDefault();
    var elementId = $(this).attr('href');
    $('html, body').animate({
        scrollTop: $(elementId).offset().top
    }, 1000);
  });

  $(window).resize(function() {
    var width = $(this).width();
    if(width > 640) {
      $(sliders).each(function(){
        this.reloadSlider();
      });
    }
  })
});
