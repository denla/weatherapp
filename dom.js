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




/*function logPerson(name, age) {
    console.log(`Person: ${name}, ${age}`);
}*/
//const person1 = logPerson('Den', 16);
//const person2 = {name: "Дениск", age: 13};

//logPerson('Den', 16);
/*function bind(context, fn) {
    return function
};

bind(person1, logPerson)*/

class Bloger {
    constructor(name, channel) {
        this.name = name;
        this.channel = channel;
    }
    getChannel() {
        let result = `Автор канала: ${this.name}, канал: ${this.channel}`;
        console.log(result);
    }
}

const slivki = new Bloger('Сливки', 'Хомяк и Куки');


//https://oauth.vk.com/authorize?client_id=51451852&display=page&scope=friends&response_type=token&v=5.52

//https://oauth.vk.com/blank.html#access_token=vk1.a.1MPqOKUHjUMlfE_e043HAB_lsZKnpoql0FXUjYhBpp2wyx_4xByv889Jfg9rvbV8UoBd3ZinddWhMxlOnY8AuzrjIaxlTaHnM_rfc58Whlnj1G1Qanod2RYGM2olUhk73rvfVZU08JoEB0YYll6SV9IP4aGf-QyaIykd4Ijh3yNEwO-3zYMrGS6lVKuzthSn&expires_in=86400&user_id=200256792

async function getUser() {
    
    const url_2 = 'https://jsonplaceholder.typicode.com/posts/1';
    let getResponse = await fetch(url_2);
    let userJSON = await getResponse.json();
    console.log(userJSON);

    //https://jsonplaceholder.typicode.com/
}

getUser();
