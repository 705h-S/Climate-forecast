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

console.log(date)

// -- I'll start with having the user input be locally saved & displayed.

    $(".btn").click(function(){
        // Displays jumbotron and forecast 
        $("div").removeClass("hide")

        // user input
        var userInput = $("#userCity").val()

        // pushes user input to array 
        cityList.push(userInput)

        // $("#").text(cityList).val()

        // Changes main weather card with date.
        $("#cityDate").text(userInput + " (" + date + ")").val()
        console.log(cityList);
        
        addList()

        // City name gets added to list 
        function addList() {
            var li = $("<li>")
   
            $(".list-group").append(li)
            li.text(userInput).addClass("list-group-item");
        }
    })

    