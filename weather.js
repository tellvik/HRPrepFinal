<!DOCTYPE html>
<html>
  <head>
    <title>Geocoding service</title>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
    <meta charset="utf-8">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.5/css/materialize.min.css">
    <link href='https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300,700' rel='stylesheet' type='text/css'>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>

    <style>
      html, body {
        height: 100%;
        margin: 0;
        padding: 0;
      }
      #map {
        height: 100%;
      } 
#floating-panel {
  height: 80%;
  position: absolute;
  bottom: 0px;
  left: 15%;
  width: 450px;
  z-index: 5;
  background-color: #fff;
  padding: 5px;
  /*border: 1px solid #999;*/
  text-align: left;
  font-family: 'Open Sans Condensed', sans-serif;
  line-height: 30px;
  padding-left: 10px;
box-shadow:         1px 1px 11px 0px rgba(50, 50, 50, 0.86);
}

h1 {
  color: #333333;
  font-family: 'Open Sans Condensed', sans-serif;
  font-weight: bold;
  margin-bottom: 0px;
  text-align: center;
  font-size: 40px;
}

.weatherrec {
  font-size: 30px;
  text-align: center;
}

    </style>
  </head>
  <body>

<div id="floating-panel">
<form>
  <h1>What should I bring?</h1><br>
  <span style="margin-right:20px;margin-left:15px; font-size: 18px;">So where you headed?</span>
    <input style="margin-right:20px;" id="address" type="textbox" placeholder="enter a city" autocomplete="off" onkeypress="enterPress(event)">
    <input class="btn waves-effect waves-light" id="submit" type="button" value="Geocode">
</form>  

    <p class="weatherrec"></p>


</div>
    <div id="map"></div>
    <script>

      var city;
      var state;
      var latitude;
      var longitude;
      var temp; 
      
      // LAST DAY, NEED TO SWAP IN LAT/LONG VARIABLES & CONVERT KELVIN
      var getTemp = function(){
         $.ajax({
  url : "http://api.openweathermap.org/data/2.5/weather?lat=37.776289&lon=-122.395234&appid=44db6a862fba0b067b1930da0d769e98",
  dataType : "jsonp",
  success : function(parsed_json) {
  temp = parsed_json['main']['temp'];
   }
  });
      };
      
 


      function initMap() {
                
        var redMapType = new google.maps.StyledMapType([
      {
        stylers: [
          {hue: '#890000'},
          {visibility: 'simplified'},
          {gamma: 0.5},
          {weight: 0.5}
        ]
      },
      {
        elementType: 'labels',
        stylers: [{visibility: 'off'}]
      },
      {
        featureType: 'water',
        stylers: [{color: '#890000'}]
      }
    ], {
      name: 'Custom Style'
  });
  var redMapTypeId = 'custom_style';
  
    var blueMapType = new google.maps.StyledMapType([
      {
        stylers: [
          {hue: '#001d89'},
          {visibility: 'simplified'},
          {gamma: 0.5},
          {weight: 0.5}
        ]
      },
      {
        elementType: 'labels',
        stylers: [{visibility: 'off'}]
      },
      {
        featureType: 'water',
        stylers: [{color: '#001d89'}]
      }
    ], {
      name: 'Custom Style'
  });
  var blueMapTypeId = 'custom_style';

        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 2,
          center: {lat: 23.9096187, lng: -29.6761281},
          mapTypeId: google.maps.MapTypeId.SATELLITE,
          disableDefaultUI: true
        });
        
        var geocoder = new google.maps.Geocoder();

        document.getElementById('submit').addEventListener('click', function() {
          geocodeAddress(geocoder, map);
        if (temp > 80){
            map.mapTypes.set(redMapTypeId, redMapType);
            map.setMapTypeId(redMapTypeId);
           $(".weatherrec").text('Dude, sun\'s out. Get those stunner shades.').css('color', 'red');

          }
          if (temp < 50){
            map.mapTypes.set(blueMapTypeId, blueMapType);
            map.setMapTypeId(blueMapTypeId);
            $(".weatherrec").text('Bro its cold! Seriously get that jumper.').css('color', 'blue');
          }
           
        });
            
      }

          
      
      
      
      function geocodeAddress(geocoder, resultsMap) {
        var address = document.getElementById('address').value;
        geocoder.geocode({'address': address}, function(results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            resultsMap.setCenter(results[0].geometry.location);
            resultsMap.setZoom(15);
          city = results[0].address_components[0].short_name;
          state = results[0].address_components[2].short_name;
          latitude = results[0].geometry.location.lat();
          longitude = results[0].geometry.location.lng();
          getTemp();
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });
      }
        

// if (temp < 50) {
//   $(".weatherrec").text('Bro its cold! Seriously get that jumper.').css('color', 'blue');
// }
// if (temp > 80) {
//   $(".weatherrec").text('Dude, sun\'s out. Get those shades.').css('color', 'red');
// }



// this needs some work. Not functioning. Supposed to allow enter key to submit address.

      function enterPress(e) {
        if (e.keyCode === 13) {
          e.preventDefault();
          geocodeAddress(geocoder, map);
        }
      }

    </script>
    
    
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC8ow_45a6Evhl4PNCyQuNthA0zGrYCn_Y&signed_in=true&callback=initMap"
        async defer></script>
  </body>
</html>











