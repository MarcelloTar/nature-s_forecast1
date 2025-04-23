const input = document.querySelector('.city');
const button = document.querySelector('.btn')
const width = screen.width;


const myKey = 'dcf35f8f51efe6145edad81342defd59';
function getWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myKey}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        setUI(data)
        setBackgroundColor(data.main.temp - 273.15)
    });
}
button.addEventListener('click', () => {
    let city = input.value;
    console.log(city);
    getWeather(city)

    if (width <= 768) {
        document.querySelector('.wrap').style.height = '1200px'
        
    }
    
})

document.querySelector('.form').innerHTML += `
    <a href="${window.location.origin}/main">gfhfg</a>
` 

function setUI(data){
    let countryBig = data.sys.country;
    let countrysmall = countryBig.toLowerCase();
    console.log(countrysmall);
    
    
    const weatherBox = document.querySelector('.weather')
    weatherBox.innerHTML = `
                <div class="dataSys">
                    <h2 class="cityName">${data.name}</h2>
                    <div class="country_box">
                        <h2 class="country_text">${data.sys.country}</h2>
                        <img src="https://flagcdn.com/w40/${countrysmall}.png" alt="">
                    </div>
                </div>
            <div class="dataTemp">
                <div class="temp">
                    <p>фактична темп.</p>
                    <h2>${Math.round(data.main.temp - 273.15)}</h2>
                </div>
                <div class="tempFeel">
                    <p>Відчувається як</p>
                    <h2>${Math.round(data.main.feels_like - 273.15)}</h2>
                </div>
            </div>
            <div class="dataWeather">
                <img class="icon" src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather icon"
                <h4 class="description">${data.weather[0].description}</h4>
            </div>
            <div class="dataWind">
                <h4 class="windDeg" style="transform: rotate(${data.wind.deg}deg)"> ↓ </h4>
                <h4 class="windSpeed"><span>Швидкість повітря:</span> ${data.wind.speed}</h4>
            </div>
            <div class="advice">
                <h2>порада:</h2>
                <p>${advice(data.weather[0].main, data.main.temp-273.15)}</p>
            </div>
    `
    weatherBox.classList.remove('none')
}
function setBackgroundColor(temp){
    let color = '';
    if(temp <= 0){
       color = 'linear-gradient(138deg, rgba(0,65,255,1) 0%, rgba(32,240,213,1) 93%)';
    } else if(temp > 0 && temp <= 20){
       color = 'linear-gradient(54deg, rgba(0,255,106,1) 0%, rgba(32,240,234,1) 68%';
    } else if(temp > 20){
       color = 'linear-gradient(54deg, rgba(255,205,0,1) 37%, rgba(240,32,32,1) 100%)';
    }
    document.querySelector('.wrap').style.background = color;
}

function advice(weather, temp){
    let textadvice = ''
    let advicemassif = [
        ['Візьми парасольку☂️', 'Сиди вдома🏠', 'Зроби собі чай☕'],
        ['Одягни теплу куртку', 'Надінь капішон щоб не було холодно', 'Надінь тепле взуття щоб не було холодно'],
        ['Не забувай про сонцезахисний крем!🌞', 'Візьми кепку або панамку🧢',  'Надінь сонічні окуляри🕶️']
    ]
    let random = Math.floor(Math.random()*3)
    if (weather == 'Rain') {
        textadvice = advicemassif[0][random];
    } else if(temp <= 0){
        textadvice = advicemassif[1][random];
    }   else if(temp >= 15){
        textadvice = advicemassif[2][random];
    } else if (temp > 0 && 15 > temp){
        textadvice = "Можеш виходити як хочеш😃"
    }
    return textadvice
}





 
 