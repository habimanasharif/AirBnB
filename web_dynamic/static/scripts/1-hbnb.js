$('document').ready(function () {
    $('.amenities input[type=checkbox]').on('click', function (e) {
      const selectedAmenitiesIds = $('.amenities input[type=checkbox]:checked').map(function (i, v) { return v.dataset.id; });
  
      const selectedAmenitiesNames = $('.amenities input[type=checkbox]:checked').map(function (i, v) {   
        return v.dataset.name});
      let names = '';
      for (let i = 0; i < selectedAmenitiesNames.length; i++) {
        let end = ', ';
        if (i === selectedAmenitiesNames.length - 1) {
          end = '';
        }
        names += selectedAmenitiesNames[i] + end;
      }
      $('.amenities h4').text(names);
    });
  });
