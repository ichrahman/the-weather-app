const condition = document.querySelector('.condition');
const location_ = document.querySelector('.location');
const temperature = document.querySelector('.temperature');
const feelsLike = document.querySelector('.feels-like');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const search = document.querySelector('.search');
const searchCity = document.querySelector('#search-city')

async function fetchData(url) {
    try {
        const response = await fetch(url, { mode: 'cors' });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} = ${response.statusText}`);
        }

        const data = await response.json();

        return data;

    } catch (error) {
        console.error('Fetch error: ', error);

        throw error;
    }
}



async function getWeatherData(city) {
    const url = `http://api.weatherapi.com/v1/current.json?key=30fc69f760b7441d9f801756242205&q=${city}`;

    try {
        const data = await fetchData(url);
        console.log('Fetched data: ', data);
        condition.innerHTML = `<span>${data.current.condition.text}</span>`
        location_.innerHTML = `<span>${data.location.name}</span>, <span>${data.location.country}</span>`;
        temperature.innerHTML = `<span>${data.current.temp_c} &deg;C</span>`;
        feelsLike.innerHTML = `<p>FEELS LIKE: ${data.current.feelslike_c} &deg;C</p>`;
        wind.innerHTML = `<p>WIND: ${data.current.wind_mph} MPH</p>`;
        humidity.innerHTML = `<p>HUMIDITY: ${data.current.humidity}%</p>`



    } catch (error) {
        console.error('Error fetching example data: ', error);
    }
}

search.addEventListener('click', () => {
    const city = searchCity.value;
    getWeatherData(city);
    searchCity.value = '';
})

