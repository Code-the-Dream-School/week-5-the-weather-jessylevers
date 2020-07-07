// API Key for Weather App// 
var apiKey= '7fdfdbfee0947064bd86fca87a52f3f3';

// setting up async function//
async function getData(url){
    try{
      var data = await fetch(url);
      return await data.json();
    }catch(err){
      throw err;
    }
}
// Weather API's for City & Latitude, Longitude//
var button = document.getElementById('search')
            .addEventListener('click',(event)=> {
              var city = document.getElementById('city').value.toLowerCase();
              if (city.length == 0) {
                alert("insert city");
              }else{
                var urlCity= `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
                getCity(urlCity).then(printWeather).catch(notFound);
              }
            });

async function getCity(url){
    var thisCity = await getData(url);
    var url_location = `https://api.openweathermap.org/data/2.5/onecall?lat=${thisCity.coord.lat}&lon=${thisCity.coord.lon}&units=metric&appid=${apiKey}`;
    var infoCity = await getData(url_location);
    return Promise.all([thisCity,infoCity]);
}


// Prints weather table after data is collected from server- response//
function printWeather(data){
  var date = new Date();
  console.log(date.getDay());
  console.log(data);
  var info = document.getElementById('weatherInfo');
  var newHTML = `<div><p><b>This Yo City: </b>${data[0].name}</p>`;
  newHTML += `<p><b>This Yo Country: </b>${data[0].sys.country}</p></div>`;
  newHTML += `<p><b>Here Go Yo Weather Right Now: </b>${data[0].weather[0].description}</p></div>`;
  newHTML += `<table class= "table table-dark table-striped"><thead><tr><th>day</th><th>min</th><th>max</th><th>weather</th></tr></thead>`;
  newHTML +='<tbody>';
  for (var i = 0; i < data[1].daily.length; i++) {
    newHTML +=  `<tr><th>${i}</th><th>${data[1].daily[i].temp.min}</th><th>${data[1].daily[i].temp.max}</th><th><img src="http://openweathermap.org/img/wn/${data[1].daily[i].weather[0].icon}@2x.png"></img></th></tr>`;
    console.log(data[1].daily[i].weather[0].icon);
  }
  newHTML +=`</tbody></table>`;
  info.innerHTML = newHTML;
}

// error response if wrong city//
function notFound(err){
  var info = document.getElementById('weatherInfo');
  // console.log(err);
  var newHTML = `<h1>You know that place isn't real right?</h1> <p>Please enter a legit city like....Luh for example.</p>`;
  info.innerHTML = newHTML;

}
