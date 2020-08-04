 const temperatureDescription = document.querySelector(".temperature-description")
    const temperatureDegree = document.querySelector(".temperature-degree")
    const locationCity = document.querySelector(".location-city")
    var iconElement = document.getElementById("weather-icon")
    const city1 = document.querySelector(".city_location")
    const form = document.querySelector("form");
    const list2 = document.querySelector(".cities")
    var button = document.querySelector('#deleteBtn');
    const weather = {};
    iconElement={};
    const city = "";
    var txt = "";
    var i = 0;
    var j = 0;
    var mysave,text , obj;
    var myObj = [];
    

    
    text = localStorage.getItem("save");
    console.log(text);
    
     obj = JSON.parse(text);
     
    if(localStorage.getItem("save") != null){
           
    for (var l = 0; l < obj.length; l++) 
    {
      myObj[i] = obj[j];
      const api1 = `https://api.openweathermap.org/data/2.5/weather?q=${obj[j]}&appid=5966596c41ea42398118d177cc3e7df5`;

      fetch(api1)
        .then(response => response.json())
        .then(data => {
          const { main, name, sys, weather } = data;
          const icon = `https://openweathermap.org/img/wn/${
            weather[0]["icon"]
          }@2x.png`;
    
          const li = document.createElement("li");
          li.classList.add("city");
          const markup = `
            <h2 class="city-name" data-name="${name},${sys.country}">
              <span>${name}</span>
              <sup>${sys.country}</sup>
            </h2>
            <div class="city-temp">${parseFloat(main.temp-273.15).toFixed(1)}<sup>°C</sup></div>
            <figure>
              <img class="city-icon" src=${icon} alt=${weather[0]["main"]}>
    
              <figcaption>${weather[0]["description"]}</figcaption>
            </figure>
          `;
          li.innerHTML = markup;
          list2.appendChild(li);
        })
        
    
      
      form.reset();
      city1.focus();
    
      i++;
      j++;
    }
  } 

   
   
    form.addEventListener("submit", e => {
        e.preventDefault();
        const city = city1.value;

        //save history
        myObj[i] = city;
        mysave = JSON.stringify(myObj);
        localStorage.setItem("save", mysave);
        console.log(localStorage.getItem("save"));

        i++;
        
        

        if(city){
                
            const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5966596c41ea42398118d177cc3e7df5`;

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
                
                document.getElementById('weather-icon').src =`Icons/${data.weather[0].icon}.png`;
                console.log(iconElement)
                displayWeather() 

                
            }) 

            fetch(api)
             .then(response => {
                 return response.json();
             })
               
            .then(data => {
              const { main, name, sys, weather } = data;
              const icon = `https://openweathermap.org/img/wn/${
                weather[0]["icon"]
              }@2x.png`;
        
              const li = document.createElement("li");
              li.classList.add("city");
              const markup = `
                <h2 class="city-name" data-name="${name},${sys.country}">
                  <span>${name}</span>
                  <sup>${sys.country}</sup>
                </h2>
                <div class="city-temp">${parseFloat(main.temp-273.15).toFixed(1)}<sup>°C</sup></div>
                <figure>
                  <img class="city-icon" src=${icon} alt=${weather[0]["main"]}>
        
                  <figcaption>${weather[0]["description"]}</figcaption>
                </figure>
              `;
              li.innerHTML = markup;
              list2.appendChild(li);
            })
            
        
         
          form.reset();
          city1.focus();
          
        
    }
      });
      
    

function displayWeather(){
    iconElement.src = `Icons/${weather.iconId}.png`;
console.log(iconElement);
}

button.onclick = function () {
  button.setAttribute('disabled','disabled');
  localStorage.clear("save");
  location.reload(true);
}
 
