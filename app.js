    const temperatureDescription = document.querySelector(".temperature-description");
    const temperatureDegree = document.querySelector(".temperature-degree");
    const locationCity = document.querySelector(".location-city");
    var iconElement = document.querySelector("weather-icon")
    
    const weather = {};
iconElement={};

window.addEventListener('load', ()=>{
    let long;
    let lat;
   
    
    
   
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;
           
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=5966596c41ea42398118d177cc3e7df5`;

            fetch(api)
             .then(response => {
                 return response.json();
             })
             .then(data => {
                console.log(data);
                const {temp} = data.main;
                const {description} = data.weather[0];
                const name = data.name;
                // Set DOM Elements from API

                temperatureDegree.textContent = parseFloat(temp -273.15).toFixed(1) ;
                temperatureDescription.textContent = description;
                locationCity.textContent = name ;
                weather.iconId = data.weather[0].icon;
                console.log(iconElement)
                

             })  
             .then(function(){
                displayWeather() ;   
             });
        })

        
    }

    
})

function displayWeather(){
    iconElement.innerHTML = `<img src = "Icons/${weather.iconId}.png"/>`;

}

 
    
    
         
            
        