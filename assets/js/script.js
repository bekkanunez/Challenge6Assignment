
const getCity = async () => {
    let city = input.value;
    let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;

    let { list } = await (await fetch(url)).json();
    console.log("data: ",list);

    x = list;

    // let { } = list[0];

    current.innerHTML = `
        <div>
            <h2>${city} (${new Date(dt*1000).toDateString()})
        </div>
    `;
};

searchBtn.addEventListener('click', getCity);