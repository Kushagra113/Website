
// Requiring Neccessary Modules
const dotenv = require("dotenv");
const fetch = require('node-fetch');
dotenv.config();

async function weather() {
    try {
        const query = "Mumbai";
        const unit = "metric";
        const url =
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            query +
            "&appid=" +
            process.env.weather_api_key +
            "&units="+
            unit

        const response = await fetch(url);
        json_response = await response.json();
        const temp = await json_response.main.temp;
        const description = await json_response.weather[0].description;
        const icon = await json_response.weather[0].icon;
        const iconurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        const weatherd = await "The weather is currently " 
        + description + " The temperature in " + query + " is " + temp 
        return [weatherd,iconurl];
    }
    catch (error) {
        console.log(error);
    }
}


module.exports = weather