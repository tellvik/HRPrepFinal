//FROM github README for Wunderground NPM
// var WunderApi = require('./').WunderApi;

// var combined = new WunderApi(e643881199d3aa53, {lang: 'ES'}, 'geolookup', 'forecast');

// combined.query('TX/Austin')
//   .then(function (result) {console.log(result)})
//   .fail(function (err) {console.dir(err)})
//   .done();
  
// wunder-api APIKEY TX/Austin --features forecast,geolookup






//A 2ND attempt to request conditions object from Wunderground API
// not working :(

// var tempF;
// var getTemp = function() {
  var response = $.getJSON('http://api.wunderground.com/api/e643881199d3aa53/geolookup/conditions/q/37.8,-122.4.json');
//   $.then(function(response) {
//     this.tempF = this.current_condition.temp_f;
//   });
//   console.log(this.tempF);
//   return tempF;
// };
// getTemp();


//A 3rd attempt to request conditions object from Wunderground API








