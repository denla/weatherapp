const searchInput = document.querySelector('.searchInput');

let inputCity = searchInput.value;

let CITY_NAME = "Moscow";
const API_KEY = "3b3480ca7a37628268b94953090c4376";
async function getLocation() {
    const weatherDiv = document.querySelector('.weather');
    
    let locationURL = `https://api.openweathermap.org/geo/1.0/direct?q=${CITY_NAME}&limit=5&appid=${API_KEY}`;
    let locationResponse = await fetch(locationURL);
    let locationJSON = await locationResponse.json();
    console.log(locationJSON[0]);

    let city = locationJSON[0].local_names.ru;
    console.log(city);

    let weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${locationJSON[0].lat}&lon=${locationJSON[0].lon}&appid=${API_KEY}`;
    let weatherResponse = await fetch(weatherURL);
    let weatherJSON = await weatherResponse.json();
    console.log(weatherJSON);


    let descr = weatherJSON.weather[0].description;
    let descr_ru = '';
    switch (descr) {
        case 'mist':
            descr_ru = 'Туман';
            break;
        case 'rain':
            descr_ru = 'Дождь';
            break;
        case 'snow':
            descr_ru = 'Снег';
            break;
        case 'scattered clouds':
            descr_ru = 'Рассеянные облака';
            break;
        case 'overcast clouds':
            descr_ru = 'Пасмурно';
            break;
        case 'few clouds':
            descr_ru = 'Малооблачно';
            break;
        case 'clear sky':
            descr_ru = 'Ясно';
            break;
        default:
            descr_ru = `${descr}`;
            break;
    }
    console.log(descr_ru);

    //Get temperature in Celsius 
    let t = Math.round(weatherJSON.main.temp - 273);
    let t_max = Math.round(weatherJSON.main.temp_max - 273);
    let t_min = Math.round(weatherJSON.main.temp_min - 273);
    let feels_like = Math.round(weatherJSON.main.feels_like - 273);

    //Get wind information
    let wind = Math.round(weatherJSON.wind.speed);
    let wind_destination = weatherJSON.wind.deg;

    //Сloudness
    let clouds = weatherJSON.clouds.all;
    let cloudness;
    if(clouds < 10) {
        cloudness = "Ясно";
    } else if(clouds < 30) {
        cloudness = "Незначительная облачность";
    } else if(clouds < 60) {
        cloudness = "Временами облачно";
    } else if(clouds < 90) {
        cloudness = "Облачно с прояснениями";
    } else {
        cloudness = "Облачно";
    }
    console.log(cloudness);



    const result = `<h2>${city}</h2><br><h1>${t}°</h1><br><p>${descr_ru}<p><p>Макс.: ${t_max}°, мин.: ${t_min}<p>`;
    weatherDiv.innerHTML = result;

    const toMaps = document.querySelector('.gotomaps');
    let mapsURL = `https://www.google.com/maps/place/${city}/@${locationJSON[0].lat},${locationJSON[0].lon},12z`;
    toMaps.href = mapsURL;


    const cardsDiv = document.querySelector('.cards');
    const cardDiv_wind = `<div class="card square"><div class="title">Ветер</div><h2>${wind} м/c</h2></div>`
    cardsDiv.insertAdjacentHTML('afterbegin', cardDiv_wind);

    const cardDiv_feels = `<div class="card square"><div class="title">Ощущается как</div><h2>${feels_like}°</h2></div>`
    cardsDiv.insertAdjacentHTML('afterbegin', cardDiv_feels);


}

getLocation();
