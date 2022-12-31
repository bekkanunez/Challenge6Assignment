let store = localStorage.cities ? JSON.parse(localStorage.cities) : [];
let history = document.getElementById('history');

const handleStorage = () => {
    history.innerHTML = '';

    store.forEach(city => {
        history.innerHTML += `<button class="storedCity('${city}')">${city}<button>`    
    });
};

const storedCity = city => {
    input.value = city;
    getCity();
};

if(store.length) handleStorage();

const getCity = async () => {
    let city = input.value;

    if(!city) return;

    let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;

    let { list } = await (await fetch(url)).json();

    if(list) {
        store.push(city);
        localStorage.cities = JSON.stringify(store);    
        handleStorage();
    };

    let {dt, main:{temp,humidity}, wind:{speed}, weather:[{icon}] } = list[0];

    current.innerHTML = `
        <div>
            <h2>${city} (${new Date(dt*1000).toDateString()}) <img src=" http://openweathermap.org/img/wn/${icon}.png"></h2>
            <h3>Temp: ${temp}° F </h3>
            <h3>Wind: ${speed}MPH</h3>
            <h3>Humidity: ${humidity}%</h3>
        </div>`;


    for (let i = 7; i < list.length; i=i+8) {
        let {dt, main:{temp,humidity}, wind:{speed}, weather:[{icon}] } = list[i];

        forecast.innerHTML += `
            <div class="card">
                <h4>${new Date(dt*1000).toDateString()}</h4>
                <img src=" http://openweathermap.org/img/wn/${icon}.png">
                <h6>Temp: ${temp}° F </h6>
                <h6>Wind: ${speed}MPH</h6>
                <h6>Humidity: ${humidity}%</h6>
            </div>
        `;
    }
};

searchBtn.addEventListener('click', getCity);