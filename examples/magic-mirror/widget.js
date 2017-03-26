(function () {
  'use strict ';
    //  var weatherUrl = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22raleigh%2C%20nc%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithke";
    var weatherUrl = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22raleigh%2C%20nc%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys"
  var weatherData = [];
  function getData(weatherUrl, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var data = JSON.parse(xhr.responseText);
        callback(data);
      }
    };
    xhr.open('GET', weatherUrl, true);
    xhr.send();
  }

  getData(weatherUrl, function (data) {
    weatherData.push(data.query.results);
    var location = weatherData[0].channel.location;
    var temperature = weatherData[0].channel.item.condition.temp;
    var condition = weatherData[0].channel.item.condition.text;
    var forecast = weatherData[0].channel.item.forecast;
    var content = '<h3 id="location">'+location.city+','+location.region+'</h3>';
        content+= '<span><h1 id="temp">'+temperature+'&deg'+'</h1><p id="condition">'+condition+'</p></span>';
        content+='<ul class="forecast">';
        content+= '<li class="forecast_section">'+forecast[0].day+'<br>'+forecast[0].high+'&deg'+'/'+forecast[0].low+'&deg'+'</li>';
        /*content+= '<li class="forecast_section">'+forecast[1].day+'<br>'+forecast[1].high+'&deg'+'/'+forecast[1].low+'&deg'+'</li>';
        content+= '<li class="forecast_section">'+forecast[2].day+'<br>'+forecast[2].high+'&deg'+'/'+forecast[2].low+'&deg'+'</li>';
        content+= '<li class="forecast_section">'+forecast[3].day+'<br>'+forecast[3].high+'&deg'+'/'+forecast[3].low+'&deg'+'</li>';
        content+= '<li class="forecast_section" id="last_section">'+forecast[4].day+'<br>'+forecast[4].high+'&deg'+'/'+forecast[4].low+'&deg'+'</li>';*/
        content+='</ul>';
        document.getElementById('widget').innerHTML = content;
  });
})();
