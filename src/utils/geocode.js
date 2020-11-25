const request = require('request')

const geocode = (address , callback) =>  {
const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURI(address)+'.json?access_token=pk.eyJ1IjoicXdld3EiLCJhIjoiY2toYnRuaXd5MDNhMzJzbWtxZHMwanhkMyJ9.X6CjBvmeRWSlG97b5yCwRw&limit=1'

    request({url, json:true} , (error , response) =>{
        if(error){
            callback('Unable to connect!',undefined)
        }else if(response.body.message){
            callback('Not able to find location!' , undefined)
        }else{
            callback(undefined , { longitude : response.body.features[0].center[0],
            latitude : response.body.features[0].center[1],
            location : response.body.features[0].place_name
        
        })
    }
    })
}

module.exports = geocode