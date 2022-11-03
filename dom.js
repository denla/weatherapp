//Обращение к HTML
const searchInput = document.querySelector('.searchInput');
const searchResults = document.querySelector('.searchResults');
const activeSearch = document.querySelector('.activeSearch');
const cardsDiv = document.querySelector('.cards');


//Получение координат текущей геолокации через браузер
/*function success(pos) {
    var crd = pos.coords;
    console.log('Ваше текущее местоположение:');
    console.log(`Широта: ${crd.latitude}`);
    console.log(`Долгота: ${crd.longitude}`);
    console.log(`Плюс-минус ${crd.accuracy} метров.`);
};
function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
};
navigator.geolocation.getCurrentPosition(success, error);*/

//Дефолтный город
let CITY_NAME = "Москва";



//ПОИСК
const state = {
    newCity: {
        name: '',
    },
}
let inputCity = searchInput.value;

//Парсим поисковые подсказки под полем поиска
let cities_array = ["Москва", "Санкт-Петербург", "Химки", "Сочи", "Нижний Новгород", "Екатеринбург", "Владивосток", "Сидней", "Тула", "Нью-Йорк", "Иркутск", "Казань", "Лондон", "Париж"]; //
let cities_sorted = cities_array.sort();
function searchCities () {
    for(i=0; i < cities_sorted.length; i++) {
        let cityItem = `<div class="cityItem">${cities_sorted[i]}</div>`
        searchResults.insertAdjacentHTML('beforeend', cityItem);
    }
}
searchCities();

//Отображаем поисковые подсказки под полем поиска при focus
searchInput.addEventListener('focus', () => {
    searchResults.classList.add("activeSearch");
})

//
searchInput.addEventListener('input', e => {
    state.newCity.name = e.target.value;
    console.log(state.newCity.name);
    let citiesArrNew = cities_array.filter(cityItem => cityItem.toLowerCase().indexOf(state.newCity.name.toLowerCase()) > -1).sort();
    searchResults.innerHTML = '';
    console.log(citiesArrNew);
    if(citiesArrNew.length != 0) {
        for(i=0; i < citiesArrNew.length; i++) {
            let cityItem = `<div class="cityItem">${citiesArrNew[i]}</div>`
            searchResults.insertAdjacentHTML('beforeend', cityItem);
        }
        makeClickedSearchItems();
    } else {
        const notFound = '<p class="secondaryText">Такого города нет в нашей базе данных</p>'
        searchResults.insertAdjacentHTML('beforeend', notFound);
    }
});


/*searchInput.addEventListener('blur', () => {
    searchResults.classList.remove("activeSearch");
})*/

//Меняем CITY при нажатии на Enter в input
searchInput.addEventListener('keyup', e => {
    if(e.keyCode == 13) {
        CITY_NAME = e.target.value; 
        cardsDiv.innerHTML = '';
        getLocation();
        searchResults.classList.remove("activeSearch");
    }
});
//Меняем CITY при клике на поисковую подсказку
function makeClickedSearchItems() {
    const searchItems = document.querySelectorAll(".cityItem");
    searchItems.forEach(item => item.addEventListener('click', e => {
        e.target.value = item.textContent; 
        CITY_NAME = e.target.value;
        searchInput.value = e.target.value;
        searchResults.classList.remove("activeSearch");
        cardsDiv.innerHTML = '';
        getLocation();
    }));
}
makeClickedSearchItems();



const API_KEY = "3b3480ca7a37628268b94953090c4376";
async function getLocation() {
    const weatherDiv = document.querySelector('.weather');
    console.log('оу это идет в апи' + CITY_NAME);
    let locationURL = `http://api.openweathermap.org/geo/1.0/direct?q=${CITY_NAME}&limit=5&appid=${API_KEY}`;
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

    const cardDiv_wind = `<div class="card square"><div class="title">Ветер</div><h2>${wind} м/c</h2></div>`
    cardsDiv.insertAdjacentHTML('afterbegin', cardDiv_wind);

    const cardDiv_feels = `<div class="card square"><div class="title">Ощущается как</div><h2>${feels_like}°</h2></div>`
    cardsDiv.insertAdjacentHTML('afterbegin', cardDiv_feels);


}

getLocation(CITY_NAME);
