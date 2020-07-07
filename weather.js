// const API_KEY = '9a8bb38aaa5991effeabca196f6c4ecb';

// const city = document.getElementById('city');
// const submitBtn = document.getElementById('submit');
// const paragraph = document.querySelector('p');
// const table = document.querySelector('table');
// const day = document.getElementById('day');
// const min = document.getElementById('min');
// const max = document.getElementById('max');
// const iconImg = document.getElementById('icon');

// let url = `https://api.openweathermap.org/data/2.5`;

// // Get location
// const getData = async () => {
//     try {
//         const response = await fetch(`${url}/weather?q=${city.value}&appid=${API_KEY}`);
    
//         return response.json();
//     } catch (e) {
//         console.log(e.message);
//     }
// }

// // Get weather data
// const getWeather = async ({coord: { lat, lon }}) => {
//     try {
//         const response = await fetch(`${url}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`);

//         return response.json();
//     } catch (e) {
//         console.log(e.message);
//     }
// } 

// submitBtn.addEventListener('click', async () => {
//    try {
//        const response = await getData();
//        const { list: [one, two, three, four, five, six, seven] } = await getWeather(response);

//         paragraph.classList.add('hidden');
//         table.classList.remove('hidden');

//         day.innerHTML = one.dt_txt;
//         min.innerHTML = one.main.temp_min;
//         max.innerHTML = one.main.temp_max;
//         icon.setAttribute('src', `http://openweathermap.org/img/wn/${one.weather[0].icon}@2x.png`);

//         console.log(`http://openweathermap.org/img/wn/${one.weather[0].icon}@2x.png`);
//        console.log([one, two, three, four, five, six, seven]);
//    } catch (e) {
//        console.log(e.message);
//    }
// })