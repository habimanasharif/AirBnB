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

    $.get('http://0.0.0.0:5001/api/v1/status/',function(data){
        if(data.status == 'OK'){
        $('#api_status').addClass('available')
    }
    else{
        $('#api_status').removeClass('available')
    }
    })
    $.post({
        url: 'http://0.0.0.0:5001/api/v1/places_search',
        data: JSON.stringify({}),
        contentType: 'application/json; charset=utf-8'
      }).done(function (data) {
        for (let i = 0; i < data.length; i++) {
          const place = data[i];
    
          // Since the user's name isn't provided in the places_search returned
          // data, it has to be requested.
          $.get('http://0.0.0.0:5001/api/v1/users/' + place.user_id).done(function (data) {
            place.user = data
    
            const article = '<article>' +
          '<div class="title_box">' +
          '<h2>' + place.name + '</h2>' +
          '<div class="price_by_night">$' + place.price_by_night + '</div>' +
          '</div>' +
          '<div class="information">' +
    
          '<div class="max_guest">' + place.max_guest + ' Guest' + (place.max_guest !== 1 ? 's' : '') + '</div>' +
                '<div class="number_rooms">' + place.number_rooms + ' Bedroom' + (place.number_rooms !== 1 ? 's' : '') + '</div>' +
                '<div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : '') + '</div>' +
          '</div>' +
          '<div class="user">' + '<b>Owner: </b>' + place.user.first_name + ' ' + place.user.last_name + '</div>' +
          '<div class="description">' + (place.description || '') + '</div>' +
          '</article>';
            $('section.places').append(article);
          });
        }
      });
      $('button').click(function(){
        const selectedAmenitiesIdsJSON = $('.amenities input[type=checkbox]:checked').map(function (i, v) { return v.dataset.id; });
        const amenitiesList=[]
        for(let i = 0; i<selectedAmenitiesIdsJSON.length;i++){
            amenitiesList.push (selectedAmenitiesIdsJSON[i])
        }
        $('section.places').text = ''
        console.log(amenitiesList)
        loadPlaces({amenities:amenitiesList})
     });

    });

    const loadPlaces = (searchQuery)=>{
        $.post({
            url: 'http://0.0.0.0:5001/api/v1/places_search',
            data: JSON.stringify(searchQuery),
            contentType: 'application/json; charset=utf-8'
          }).done(function (data) {
            for (let i = 0; i < data.length; i++) {
              const place = data[i];
          console.log(data)
              // Since the user's name isn't provided in the places_search returned
              // data, it has to be requested.
              $.get('http://0.0.0.0:5001/api/v1/users/' + place.user_id).done(function (data) {
                place.user = data
        
                const article = '<article>' +
              '<div class="title_box">' +
              '<h2>' + place.name + '</h2>' +
              '<div class="price_by_night">$' + place.price_by_night + '</div>' +
              '</div>' +
              '<div class="information">' +
        
              '<div class="max_guest">' + place.max_guest + ' Guest' + (place.max_guest !== 1 ? 's' : '') + '</div>' +
                    '<div class="number_rooms">' + place.number_rooms + ' Bedroom' + (place.number_rooms !== 1 ? 's' : '') + '</div>' +
                    '<div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : '') + '</div>' +
              '</div>' +
              '<div class="user">' + '<b>Owner: </b>' + place.user.first_name + ' ' + place.user.last_name + '</div>' +
              '<div class="description">' + (place.description || '') + '</div>' +
              '</article>';
                $('section.places').append(article);
              });
            }
          });
    }