$('document').ready(function () {
    // Stores all amenities, cities and states checked for the search query when the button 'Search' is clicked
      const searchQuery = {
        amenities: jsonToList($('.amenities input[type=checkbox]:checked').map(function (i, v) { return v.dataset.id; })),
        states: jsonToList($('.state_checkbox:checked').map(function (i, v) { return v.dataset.id; })),
        cities: jsonToList($('.city_checkbox:checked').map(function (i, v) { return v.dataset.id; }))
      };
    
      // Update the list of amenities checked, and write on the h4 tag the ones
      // that are checked
      $('.amenities input[type=checkbox]').on('click', function (e) {
        const selectedAmenitiesNames = $('.amenities input[type=checkbox]:checked').map(function (i, v) { return v.dataset.name; });
        const selectedAmenitiesIds = jsonToList($('.amenities input[type=checkbox]:checked').map(function (i, v) { return v.dataset.id; }));
        let names = '';
        for (let i = 0; i < selectedAmenitiesNames.length; i++) {
          let end = ', ';
          if (i === selectedAmenitiesNames.length - 1) {
            end = '';
          }
          names += selectedAmenitiesNames[i] + end;
        }
    
        $('.amenities h4').text(names);
        searchQuery.amenities = selectedAmenitiesIds; // Update the list of amenities selected
        console.log('Selected amenities: ' + selectedAmenitiesIds);
      });
    
      // Update the list of states checked, and write on the h4 tag the ones
      // that are checked
      $('.state_checkbox').click(function (e) {
        setSelectedCitiesAndStatesNames();
        searchQuery.states = jsonToList($('.state_checkbox:checked').map(function (i, v) { return v.dataset.id; }));
        console.log('States selected: ' + searchQuery.states);
      });
    
      // Update the list of cities checked, and write on the h4 tag the ones
      // that are checked
      $('.city_checkbox').click(function (e) {
        setSelectedCitiesAndStatesNames();
        const selectedCitiesIds = $('.city_checkbox:checked').map(function (i, v) { return v.dataset.id; });
        console.log('Cities selected: ' + selectedCitiesIds);
      });
    
      loadPlaces(searchQuery);
    
      $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
        // console.log(data.status);
        if (data.status === 'OK') {
        //   console.log(data.status);
        //   console.log('Updated');
          $('#api_status').addClass('available');
        } else {
          $('#api_status').removeClass('available');
        }
      });
    
      // Filter the amenities displayed
      $('button').click(function () {
        $('section.places').text('');
        // loadPlaces({ amenities: amenitiesList });
        loadPlaces(searchQuery);
      });
    });
    
    // List all places using api instead of Jinja templates
    // searchQuery: JSON to filter search results
    const loadPlaces = (searchQuery) => {
      $.post({
        url: 'http://0.0.0.0:5001/api/v1/places_search',
        data: JSON.stringify(searchQuery),
        contentType: 'application/json'
      }).done(function (data) {
        console.log('Search query: ' + JSON.stringify(searchQuery));
        // console.log('Data is: ' + JSON.stringify(data));
        for (let i = 0; i < data.length; i++) {
          console.log(i);
          const place = data[i];
    
          // Since the user's name isn't provided in the places_search returned
          // data, it has to be requested.
          $.get('http://0.0.0.0:5001/api/v1/users/' + place.user_id).done(function (data) {
            place.user = data;
            // console.log(place.user);
    
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
    };
    
    const setSelectedCitiesAndStatesNames = () => {
      const selectedStatesNames = $('.state_checkbox:checked').map(function (i, v) { return v.dataset.name; });
      const selectedCitiesNames = $('.city_checkbox:checked').map(function (i, v) { return v.dataset.name; });
    
      console.log('States: ' + JSON.stringify(selectedStatesNames));
      console.log('Cities: ' + JSON.stringify(selectedCitiesNames));
      let allNames = '';
    
      for (let i = 0; i < selectedStatesNames.length; i++) {
        let end = ', ';
        if (i === selectedStatesNames.length - 1 && selectedCitiesNames.length === 0) {
          end = '';
        }
        allNames += selectedStatesNames[i] + end;
      }
    
      for (let i = 0; i < selectedCitiesNames.length; i++) {
        let end = ', ';
        if (i === selectedCitiesNames.length - 1) {
          end = '';
        }
        allNames += selectedCitiesNames[i] + end;
      }
    
      console.log('Selected states & cities: ' + allNames);
      $('.locations h4').text(allNames);
    };
    
    // Helper function to get the list of amenities, cities or states from jQuery object
    const jsonToList = (jsonObject) => {
      const jsonList = [];
    
      for (let i = 0; i < jsonObject.length; i++) {
        jsonList.push(jsonObject[i]);
      }
    
      return jsonList;
    };