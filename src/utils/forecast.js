const request = require('request');

const forecast = (lon , lat , callback) =>{

    const url = 'https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&units=metric&appid=2a354c2db858a8f976534251aa315845'
    request({url},(error , response) => {
        if(error){
            callback('Unable to connect',undefined)
        }else if (JSON.parse(response.body).message) {
            callback('Unable to find location:- ' + JSON.parse(response.body).message,undefined)
        }else{
        const data = JSON.parse(response.body)
        callback(undefined, data.main.temp)
        }
    })
}

module.exports = forecast 