// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// --- 
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
// API key = d4e6d157f40579742be0d18404711934

var date = moment().format("M/D/YYYY");

// making an empty array to have the city names be displayed 
var cityList = [];



// api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}

console.log(date)


// -- I'll start with having the user input be locally saved & displayed.

    $(".btn").click(function(event){
      event.preventDefault();
        // Displays jumbotron and forecast 
        $("div").removeClass("hide")

        // user input
        var userInput = $("#userCity").val()


        if (userInput === " "){
        alert("enter a City Name");
        }


        var url5day = "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&appid=d4e6d157f40579742be0d18404711934&units=imperial"

        // pushes user input to array 
        cityList.push(userInput)

    
        // Changes main weather card with date.
        $("#cityDate").text(userInput + " (" + date + ")").val()
        console.log(cityList);
        
        //  Saves city names at an array 
        localStorage.setItem("city", JSON.stringify(cityList));
        var cityArr = JSON.parse(localStorage.getItem("city"));
       

        // City name gets added to list 
        addList()
        function addList() {
            var li = $("<li>")
    
            $(".list-group").append(li)
            li.text(userInput).addClass("list-group-item");

            
        }
        
        //   main temp
        $.ajax({
            url: url5day,
            method: "GET"
          }).then(function(data) {
            console.log(data);
            var lat = (data.coord.lat)
            var lon = (data.coord.lon)
            $("#mainTemp").text("Temprature: " + data.main.temp + "°F")
            $("#mainHum").text("Humidity: " + data.main.humidity + "%")

             $.ajax({
              url: "https://api.openweathermap.org/data/2.5/onecall?lat="+ lat +"&lon="+ lon +"&exclude=hourly,minutely,alerts&appid=d4e6d157f40579742be0d18404711934&units=imperial"
          }).then(function(response) {
            console.log(response)
            $("#mainUVI").text("UV index: " + response.current.uvi)
              // When UV Index is good, shows green, when ok shows yellow, when bad shows red
              if (response.current.uvi < 5 ) {
                $("span").addClass("rounded-pill bg-success");
            }
            else if (response.current.uvi < 9) {
                $("span").addClass("badge rounded-pill bg-warning text-dark");
            }
            else {
                $("span").addClass("rounded-pill bg-danger");
            }
            $("#mainWind").text("Wind Speed " + response.current.wind_speed + " MPH")
            // 5 day forecast
            $("#oneTemp").text("Temp: " + response.daily[0].temp.day + "°F")
            $("#oneHum").text("Humidity: " + response.daily[0].humidity + "%")
            $("#twoTemp").text("Temp: " + response.daily[1].temp.day + "°F")
            $("#twoHum").text("Humidity: " + response.daily[1].humidity + "%")
            $("#3Temp").text("Temp: " + response.daily[2].temp.day + "°F")
            $("#3Hum").text("Humidity: " + response.daily[2].humidity + "%")
            $("#4Temp").text("Temp: " + response.daily[3].temp.day + "°F")
            $("#4Hum").text("Humidity: " + response.daily[3].humidity + "%")
            $("#5Temp").text("Temp: " + response.daily[4].temp.day + "°F")
            $("#5Hum").text("Humidity: " + response.daily[4].humidity + "%")

          });
        });

          fiveDayFC()
    })

    // displays 5 days in advanced. 
     function fiveDayFC (){

        $("#plus1").text(moment().add(1,'d').format("M/D/YYYY"))
        $("#plus2").text(moment().add(2,'d').format("M/D/YYYY"))
        $("#plus3").text(moment().add(3,'d').format("M/D/YYYY"))
        $("#plus4").text(moment().add(4,'d').format("M/D/YYYY"))
        $("#plus5").text(moment().add(5,'d').format("M/D/YYYY"))
     }
   
   