$('#maps').gmap3({
 map:{
    options:{
     center:[19.366596, -99.072358],
     zoom:2,
     mapTypeId: google.maps.MapTypeId.SATELLITE,
     mapTypeControl: true,
     mapTypeControlOptions: {
       style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
     },
     navigationControl: true,
     scrollwheel: true,
     streetViewControl: true
    }
 }});