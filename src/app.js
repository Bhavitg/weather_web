const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// define paths for express config
const publicDirectoryPath = path.join(__dirname , '../public')
const viewsPath = path.join(__dirname , '../templates/views')
const partialsPath = path.join(__dirname , '../templates/partials')

const app = express()

const port = process.env.PORT || 3000

//setup handlebar and views location
app.set('view engine' , 'hbs')
app.set('views' , viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Bhavit'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Bhavit'
    })
})

app.get('/help' , (req,res)=>{
    res.render('help',{
        msg:'404',
        title:'Help',
        name:'Bhavit'
    })
})

app.get('/weather' , (req,res) => {
    if(!req.query.address){
        return res.send({
            error:'Please provide address term'
        })
    }
    geocode(req.query.address, (error,data)=>{
        if(error){
            return res.send({error} )
        }
        forecast(data.longitude , data.latitude , (err , temp=0)=>{
            if(err){
                return res.send({err})
            }
            return res.send({temp,
                location:data.location 
            })
        })
    })
})

app.get('/help/*' , (req,res) => {
    res.render('404',{
        title:'Help',
        name:'Bhavit',
        msg:'Help article not found!'
    })
})

app.get('*' , (req,res) => {
    res.render('404',{
        title:'404',
        name:'Bhavit',
        msg:'Page not found!'
    })
})

app.listen(port , () => {
    console.log("Server Up at 3000")
}) 