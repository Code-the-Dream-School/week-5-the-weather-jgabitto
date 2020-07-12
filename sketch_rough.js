let rainDrops = [];
let clouds = [];
let numClouds = 0;
let shack;
let canvas;
let weather;
let feelsLike;
let weatherDescription;
let weatherMain;
let hot = false;
let time = 0;
let y = -200;
let started = false;

const container = document.getElementById('info');

function preload() {
    // shack  = loadImage('shack_edited.jpg');
    sun = loadImage("sun.png");

}

function setup() {
    // let elt = document.querySelector('body');

    // console.log(`${elt.style.width}, ${elt.style.height}`);
    console.log(displayWidth)

    canvas = createCanvas(displayWidth, displayHeight + 234.72);
    canvas.parent(container);
    canvas.addClass('hidden');

    canvas.position(0,0);


    // canvas = createCanvas(displayWidth, displayHeight);
    // canvas.style('z-index', '-1')

    // const h2 = createElement('h2', 'im an h2 p5.element!');
    // h2.center("horizontal");


    // tint(50, 100, 300); // Tint blue

    for (let i = 0; i < 1000; i++) {
        rainDrops[i] = new Rain();
    }

    for (let i = 0; i < 15; i++) {
        clouds[i] = new Cloud();
    }

    // for (let i = 0; i < numClouds; i++) {
    //     clouds[i] = new Cloud();
    // }

    // button = createButton('submit');
    // button.mousePressed(submitForm);
    
}
  
function draw() {
    clear();
    // image(shack);
    // background(shack);
    background(240);

    // if (started) {
    //     rainShower();
    // }

    switch (weather) {
        case 'rain':
            if (time !== 100) {
                time += 1;
            } else {
                canvas.removeClass('hidden');
                rainShower();
            } 
            break;
        case 'sun':
            if (time !== 100) {
                time += 1;
            } else {
                canvas.removeClass('hidden');
                sunshine();
                drawClouds();
            } 
            break;
        default:
            break;
    }
    
}

// function windowResized() {
//     resizeCanvas(1264, 939);
// }

function sunshine() {
    image(sun,0,y,200,200);

    if (y !== -50) {
        y += .5;
    }

    if (hot) {
        ellipseMode(RADIUS);
        fill(255,245,125,10); 
        noStroke()
        ellipse(0, y, 80, 80);
        fill(255,245,125,20); 
        ellipse(0, y, 100, 100)
        noStroke();
        fill(200, 130, 10, 20);
        ellipse(100, y+100, (frameCount % 500)*2, (frameCount % 500)*2);
        ellipse(100, y+100, (frameCount % 500)*4, (frameCount % 500)*4);
        ellipse(100, y+100, (frameCount % 500)*8, (frameCount % 500)*8);
        ellipse(100, y+100, (frameCount % 500)*16, (frameCount % 500)*16);
        ellipse(100, y+100, (frameCount % 500)*24, (frameCount % 500)*24);
    }
}

function rainShower() {
    for (let i = 0; i < rainDrops.length; i++) {
        rainDrops[i].show();
        rainDrops[i].fall();
        // rainDrops[i].edges();
    }
}

class Rain {
    constructor() {
        // x and y coordinates of drop
        this.x = random(width);
        this.y = random(-500, -10);

        this.z = random(0, 10);
        this.size = map(this.z, 0, 20, 5, 20);
        this.yspeed = map(this.z, 0, 20, 3, 10);
        this.grav = map(this.z, 0, 20, 0.025, 0.2);
    }

    // edges() {
    //     if (this.x == 500 && this.y == 500) {
    //         this.yspeed = -this.yspeed;
    //     }
    // }
    
    fall() {
        this.y = this.y + this.yspeed;
        this.speed = this.speed + this.grav

        if (this.y > height) {
            this.y = random(-50, -10);
            this.speed = map(this.z, 0, 20, 4, 10);
        }
    }

    show() {
        stroke(175, 195, 204);
        line(this.x, this.y, this.x, this.y + this.size);
    }
}

function drawClouds() {
    for (let i = 0; i < clouds.length; i++) {
        clouds[i].move();
        clouds[i].display();
    }
}

class Cloud {
    constructor() {
      this.x = random(-1000, -100);
      this.y = random(2, 150);
    }
  
    display() {
      push();
      stroke(255);
      strokeWeight(1);
      fill(255);
      ellipse(this.x, this.y, 24, 24);
      ellipse(this.x + 10, this.y + 10, 24, 24);
      ellipse(this.x + 30, this.y + 10, 24, 24);
      ellipse(this.x + 30, this.y - 10, 24, 24);
      ellipse(this.x + 20, this.y - 10, 24, 24);
      ellipse(this.x + 40, this.y, 24, 24);
      pop();
    }
  
    move() {
      this.x = this.x + .3;
      this.y = this.y + random(-0.5, 0.5);
  
      if (this.x >= width) {
        this.x = 0;
      }
    }
  }

const API_KEY = '9a8bb38aaa5991effeabca196f6c4ecb';

const cityInput = document.getElementById('city');
const submitBtn = document.getElementById('submit');
const paragraph = document.querySelector('p');
const table = document.querySelector('table');
const day = document.getElementById('day');
const min = document.getElementById('min');
const max = document.getElementById('max');
const iconImg = document.getElementById('icon');

let url = `https://api.openweathermap.org/data/2.5`;
/* 
https://api.openweathermap.org/data/2.5/onecall?lat=29.749907&lon=-95.358421&exclude=current,minutely,hourly&appid=9a8bb38aaa5991effeabca196f6c4ecb&units=imperial
*/

// Get location
const getData = async () => {
    try {
        if (cityInput.value) {
            const response = await fetch(`${url}/weather?q=${cityInput.value}&appid=${API_KEY}`);

            if (response.status === 404) {
                paragraph.innerHTML = 'City does not exist! Please enter the city again.';
            }
    
            return response.json();
        } else {
            paragraph.innerHTML = "Please enter the name of a city!";
        }
    } catch (e) {
        console.log(e.message);
    }
}

// Get weather data
const getWeather = async ({coord: { lat, lon }}) => {
    try {
        const response = await fetch(`${url}/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&appid=${API_KEY}&units=imperial`);

        return response.json();
    } catch (e) {
        console.log(e.message);
    }
} 

// function generateTable(table, array) {
//     for (let item of array) {
//         console.log(item);
//         let row = table.insertRow();
//         for (key in item) {
//             console.log(key);
//             console.log(item[key]);
//           let cell = row.insertCell();
//           if (key == 'icon') {
//               let img = document.createElement('IMG');
//               img.setAttribute('src', `http://openweathermap.org/img/wn/${one.weather[0].icon}@2x.png`);
//               cell.appendChild(img);

//           } else {
//             let text = document.createTextNode(item[key]);
//             cell.appendChild(text);
//           }
          
//         }
//       }
//   }

function timeConverter(timestamp) {
    var formattedTime = moment.unix(timestamp);

    return formattedTime.format('MMMM Do YYYY, h:mm:ss a');
}

submitBtn.addEventListener('click', submitInput);
cityInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        submitInput();
    }
})

async function submitInput() {
    try {
        let array = [];
        
        const response = await getData();

        if (!response) {
            return;
        }
 
        const { daily } = await getWeather(response);
 
         for (let i = 0; i < 7; i++) {
             array.push({ 'Day': timeConverter(daily[i].dt), 'Temp/Humidity': `${daily[i].temp.min}\u00B0/ ${daily[i].temp.max}\u00B0/ ${daily[i].humidity}%`, 'Feels Like': `${daily[i].feels_like.day}\u00B0`,'Weather': `${daily[i].weather[0].icon} ${daily[i].weather[0].description}`});
         }
 
         if (table.tBodies.length !== 0) {
             table.removeChild(table.getElementsByTagName("tbody")[0]);
         }
 
         paragraph.classList.add('hidden');
         table.classList.remove('hidden');
         let tbody = table.createTBody();
 
         for (let item of array) {
             let row = tbody.insertRow();
             for (key in item) {
                 let cell = row.insertCell();
                 if (key == 'Weather') {
                     let icon = item[key].substr(0,item[key].indexOf(' '));
                     let weatherDesc = item[key].substr(item[key].indexOf(' ')+1);
                     let img = document.createElement('IMG');
                     img.setAttribute('src', `http://openweathermap.org/img/wn/${icon}@2x.png`);
                     let text = document.createTextNode(weatherDesc);
 
                     cell.appendChild(img);
                     cell.appendChild(text);
                 } else {
                     let text = document.createTextNode(item[key]);
                     cell.appendChild(text);
                 }
             }
         }
 
         feelsLike = daily[0].feels_like.day;
         weatherDescription = daily[0].weather[0].description;
         weatherMain = daily[0].weather[0].main;
 
         switch (weatherDescription) {
             case 'clear sky':
                 numClouds = 100;
                 break;
             case 'few clouds':
                 numClouds = 5;
                 break;
             case 'scattered clouds':
                 numClouds = 10;
                 break;
             case 'broken clouds':
                 numClouds = 15;
                 break;
             case 'overcast clouds':
                 numClouds = 20;
                 break;
         }

         switch (weatherMain) {
            case 'Thunderstorm':
                weather = 'rain';
                break;
            case 'Drizzle':
                weather = 'rain';
                break;
            case 'Rain':
                weather = 'rain';
                break;
         }
 
         if (feelsLike >= 90) {
             weather = 'sun';
             hot = true;
         } else {
             weather = 'sun';
         }
 
 
     } catch (e) {
         console.log(e.message);
     }
}

// async function submitForm() {
//     try {
//         let array = [];
 
//         const response = await getData();
//      //    const { list: [one, two, three, four, five, six, seven] } = await getWeather(response);
//      //    const {list: [one, two, three, four, five, six, seven] } = await getWeather(response);
//      //    let { dt_txt, main: {temp_min, temp_max}, weather } = one;
//      //    let array = [{day: dt_txt, min: temp_min, max: temp_max, icon: weather[0].icon}]
 
//      const { list } = await getWeather(response);
 
 
 
//      for (let i = 0; i < 7; i++) {
//          array.push({ day: list[i].dt_txt, min: list[i].main.temp_min, max: list[i].main.temp_max, icon: list[i].weather[0].icon});
//      }
 
//      if (table.tBodies.length !== 0) {
//          table.removeChild(table.getElementsByTagName("tbody")[0]);
//      }
 
//      paragraph.classList.add('hidden');
//      table.classList.remove('hidden');
//      let tbody = table.createTBody();
 
//      // day.innerHTML = one.dt_txt;
//      // min.innerHTML = one.main.temp_min;
//      // max.innerHTML = one.main.temp_max;
//      // icon.setAttribute('src', `http://openweathermap.org/img/wn/${one.weather[0].icon}@2x.png`);
 
//      for (let item of array) {
//          let row = tbody.insertRow();
//          for (key in item) {
//              let cell = row.insertCell();
//              if (key == 'icon') {
//                  let img = document.createElement('IMG');
//                  img.setAttribute('src', `http://openweathermap.org/img/wn/${item[key]}@2x.png`);
//                  cell.appendChild(img);
//              } else {
//                  let text = document.createTextNode(item[key]);
//                  cell.appendChild(text);
//              }
//          }
//      }

//      started = true;
 
//          // generateTable(table, array);
//     } catch (e) {
//         console.log(e.message);
//     }
// }